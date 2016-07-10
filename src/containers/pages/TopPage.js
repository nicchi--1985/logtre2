import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/actions';
import StockCompanyList from '../../components/StockCompanyList'
import PerformanceSummary from '../../components/PerformanceSummary'

class TopPage extends Component {
    componentWillMount() {
        this.props.actions.getSummary();
    }
    
    render() {
        return (
            <div>
                <h4>Welcome to Logtre!!</h4>
                <StockCompanyList />
                <PerformanceSummary summary={this.props.performanceSummary}/>
            </div>
        )
    }
}

function mapStateToPorps(state) {
    return {
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
)(TopPage)