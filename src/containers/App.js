import React, { Component } from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions/actions'

class App extends Component {
  render() {
    console.log("App")
    console.log(this.props.actions)
    console.log(this.props.trades)
    const childrenWithProps = React.cloneElement(this.props.children, {...this.props})
    return(
      <div className="contents">
        <li><Link to="/">TOP</Link></li>
        <li><Link to="/charts">CHARTS</Link></li>
        <li><Link to="/chart/1">CHART</Link></li>
        <li><Link to="/analytics">ANALYTICS</Link></li>
        <li><Link to="/dev/trades">TRADES(DEV)</Link></li>
        {childrenWithProps}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    trades: state.trades
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
