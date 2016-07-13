import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/actions';
import ChartList from '../../components/ChartList'

class ChartListPage extends Component {
    componentWillMount() {
        this.props.actions.getProducts(this.props.params.broker);
    }

    render() {
        return (
            <div>
                <ChartList broker={this.props.params.broker} products={this.props.products} />
            </div>
        )
    }
}

function mapStateToPorps(state) {
    return {
        products: state.products
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
)(ChartListPage)
