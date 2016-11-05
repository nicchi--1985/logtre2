import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { commonStyle } from '../../config';
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
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.chartData.term != nextProps.chartData.term) {
            this.props.chartActions.getChartData(
                this.props.params.broker, 
                this.props.params.product_no, 
                nextProps.chartData.term);
            this.props.resourceActions.getProductSummary(
                this.props.params.broker, 
                this.props.params.product_no, 
                nextProps.chartData.term);
        }
    }

    render() {
        const chart_term = `${this.props.chartData.term_end} - ${this.props.chartData.term_start}`
        return (
            <div>
                <div style={commonStyle.heading}><p style={{"margin":"5px 0"}}>あなたの投資履歴</p></div>
                <button type="button" onClick={this.props.chartActions.countupChartDataTerm}>＜＜</button>
                <p style={{'display': 'inline-block'}}>{chart_term}</p>
                <button type="button" onClick={this.props.chartActions.countdownChartDataTerm} disabled={this.props.chartData.term <= 1}>＞＞</button>
                <ChartCanvas chartData={this.props.chartData} />
                <PerformanceSummary summary={this.props.performanceSummary}/>
            </div>
        )
    }
}

function mapStateToPorps(state) {
    return {
        chartData: state.chart.chartData,
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
