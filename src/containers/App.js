import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

export default class App extends Component {
  render() {
    console.log("rendering App");
    // pass this.props to children
    return(
      <div className="contents">
        <li><Link to="/top">TOP</Link></li>
        <li><Link to="/charts">CHARTS</Link></li>
        <li><Link to="/chart/1">CHART</Link></li>
        <li><Link to="/analytics">ANALYTICS</Link></li>
        <li><Link to="/setting">SETTING</Link></li>
        <li><Link to="/dev/trades">TRADES(DEV)</Link></li>
        {this.props.children}
      </div>
    )
  }
}
