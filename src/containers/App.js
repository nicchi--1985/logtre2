import React, { Component } from 'react'
import { Link } from 'react-router'

export default class App extends Component {
  render() {
    return(
      <div className="contents">
        <li><Link to="/">TOP</Link></li>
        <li><Link to="/charts">CHARTS</Link></li>
        <li><Link to="/chart/1">CHART</Link></li>
        <li><Link to="/analytics">ANALYTICS</Link></li>
        {this.props.children}
      </div>
    )
  }
}
