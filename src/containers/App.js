import React, { Component } from 'react'
import { Link } from 'react-router'

export default class App extends Component {
  render() {
    // pass this.props to children
    return(
      <div className="headers">
        {this.props.children}
      </div>
    )
  }
}
