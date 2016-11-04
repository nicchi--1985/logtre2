import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/actions';
import StockCompanyList from '../../components/StockCompanyList'
import PerformanceSummary from '../../components/PerformanceSummary'

class TopPage extends Component {
    componentWillMount() {
        this.props.actions.getBrokers();
        this.props.actions.getSummary();
    }
    
    render() {
        console.log(this.props.brokers);
        console.log(this.props.performanceSummary)
        return (
            <div>
                <StockCompanyList brokers={this.props.brokers}/>
                <PerformanceSummary summary={this.props.performanceSummary}/>
            </div>
        )
    }
}

function mapStateToPorps(state) {
    return {
        performanceSummary: state.performanceSummary,
        brokers: state.brokers
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
)(TopPage)