import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/actions';
import ChartCanvas from '../../components/ChartCanvas'
import PerformanceSummary from '../../components/PerformanceSummary'

class ChartPage extends Component {
    componentWillMount() {
        this.props.actions.getChartData(this.props.params.broker, this.props.params.product_no);
    }

    render() {
        console.log("CHARTDATA!!!!!")
        console.log(this.props.chartData)
        return (
            <div>
                <h4>here's your Chart!</h4>
                <ChartCanvas chartData={this.props.chartData} />
                <PerformanceSummary />
            </div>
        )
    }
}

function mapStateToPorps(state) {
    return {
        chartData: state.chartData
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
