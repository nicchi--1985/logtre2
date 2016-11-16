import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { commonStyle, getTimeChartData, getTimeChartOptions } from '../../config';
import * as chartActions from '../../redux/modules/chart'
import * as resourceActions from '../../redux/modules/resource';
import ChartCanvas from '../../components/ChartCanvas'
import PerformanceSummary from '../../components/PerformanceSummary'

class ChartPage extends Component {
    componentWillMount() {
        this.props.chartActions.getChartData(
            this.props.params.broker, 
            this.props.params.product_no, 
            this.props.chartData.term);
        this.props.resourceActions.getProductSummary(
            this.props.params.broker, 
            this.props.params.product_no, 
            this.props.chartData.term);
        if (this.props.chartData.term_start != "") {
            this.props.chartActions.getNikkeiData(
                this.props.chartData.term_start,
                this.props.chartData.term_end
            );
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("willreceiveprops")
        console.log(this.props.chartData)
        console.log(nextProps.chartData)
        console.log(this.props.chartData.term)
        console.log(nextProps.chartData.term)
        if (this.props.chartData.term_start != nextProps.chartData.term_start
        || this.props.chartData.term != nextProps.chartData.term) {
            this.props.chartActions.getChartData(
                this.props.params.broker, 
                this.props.params.product_no, 
                nextProps.chartData.term);
            this.props.resourceActions.getProductSummary(
                this.props.params.broker, 
                this.props.params.product_no, 
                nextProps.chartData.term);
            console.log("next is comming")
            console.log(nextProps.chartData.term_start)
            if (nextProps.chartData.term_start != "") {
            this.props.chartActions.getNikkeiData(
                nextProps.chartData.term_start,
                nextProps.chartData.term_end
            );
        }
        }
    }

    render() {
        const chart_term = `${this.props.chartData.term_end} - ${this.props.chartData.term_start}`
        let { data, time_unit } = this.props.chartData
        let { data_n, time_unit_n } = this.props.nikkeiData
        const chart_data = getTimeChartData(data, data_n)
        const chart_time_unit = getTimeChartOptions(time_unit)
        // const nikkei_data = getTimeChartData(data_n)
        // const nikkei_time_unit = getTimeChartOptions(time_unit_n)
        // nikkei_time_unit.scales.yAxes[0].ticks.beginAtZero = false
        // nikkei_time_unit.layout.padding = {left: 100}
        return (
            <div>
                <div style={commonStyle.heading}><p style={{"margin":"5px 0"}}>あなたの投資履歴</p></div>
                <button type="button" onClick={this.props.chartActions.countupChartDataTerm}>＜＜</button>
                <p style={{'display': 'inline-block'}}>{chart_term}</p>
                <button type="button" onClick={this.props.chartActions.countdownChartDataTerm} disabled={this.props.chartData.term <= 1}>＞＞</button>
                <ChartCanvas chartData={chart_data} options={chart_time_unit} />
                <PerformanceSummary summary={this.props.performanceSummary}/>
            </div>
        )
    }
}

function mapStateToPorps(state) {
    return {
        chartData: state.chart.chartData,
        nikkeiData: state.chart.nikkeiData,
        performanceSummary: state.resource.performanceSummary
    }
}

function mapDispatchToProps(dispatch) {
    return {
        chartActions: bindActionCreators(chartActions, dispatch),
        resourceActions: bindActionCreators(resourceActions, dispatch)
    }
}

export default connect(
  mapStateToPorps,
  mapDispatchToProps
)(ChartPage)
