import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as resourceActions from '../../redux/modules/resource';
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
        performanceSummary: state.resource.performanceSummary,
        brokers: state.resource.brokers
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(resourceActions, dispatch)
    }
}

export default connect(
  mapStateToPorps,
  mapDispatchToProps
)(TopPage)