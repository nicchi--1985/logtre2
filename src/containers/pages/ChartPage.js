import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { commonStyle } from '../../config';
import * as Actions from '../../actions/actions';
import ChartCanvas from '../../components/ChartCanvas'
import PerformanceSummary from '../../components/PerformanceSummary'

class ChartPage extends Component {
    componentWillMount() {
        this.props.actions.getChartData(this.props.params.broker, this.props.params.product_no, this.props.chartData.term);
        this.props.actions.getProductSummary(this.props.params.broker, this.props.params.product_no);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.chartData.term != nextProps.chartData.term) {
            this.props.actions.getChartData(this.props.params.broker, this.props.params.product_no, nextProps.chartData.term);
        }
    }

    render() {
        const chart_term = `${this.props.chartData.term_end} - ${this.props.chartData.term_start}`
        return (
            <div>
                <div style={commonStyle.heading}><p style={{"margin":"5px 0"}}>あなたの投資履歴</p></div>
                <button type="button" onClick={this.props.actions.countupChartDataTerm}>＜＜</button>
                <p style={{'display': 'inline-block'}}>{chart_term}</p>
                <button type="button" onClick={this.props.actions.countdownChartDataTerm} disabled={this.props.chartData.term <= 1}>＞＞</button>
                <ChartCanvas chartData={this.props.chartData} />
                <PerformanceSummary summary={this.props.performanceSummary}/>
            </div>
        )
    }
}

function mapStateToPorps(state) {
    return {
        chartData: state.chartData,
        performanceSummary: state.performanceSummary
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

export default connect(
  mapStateToPorps,
  mapDispatchToProps
)(ChartPage)
