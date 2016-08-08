import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/actions';
import TraderAnalytics from '../../components/TraderAnalytics'

class AnalyticsPage extends Component {
    componentWillMount() {
        this.props.actions.getRadarData();
    }

    render() {
        return (
            <div>
                <h4>投資行動分析</h4>
                <TraderAnalytics radarData={this.props.radarData} />
            </div>
        )
    }
}

function mapStateToPorps(state) {
    return {
        radarData: state.radarData
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
)(AnalyticsPage)