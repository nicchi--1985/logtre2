import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/actions';
import ChartCanvas from '../../components/ChartCanvas'
import PerformanceSummary from '../../components/PerformanceSummary'

class ChartPage extends Component {
    componentWillMount() {
        this.props.actions.getChartData(this.props.params.broker, this.props.params.product_no);
        this.props.actions.getSummary();
    }

    render() {
        console.log("CHARTDATA!!!!!")
        console.log(this.props.chartData)
        return (
            <div>
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
