import React, { Component } from 'react'
import StockCompanyList from '../../components/StockCompanyList'
import PerformanceSummary from '../../components/PerformanceSummary'

export default class TopPage extends Component {
    render() {
        return (
            <div>
                <h4>Welcome to Logtre!!</h4>
                <StockCompanyList />
                <PerformanceSummary />
            </div>
        )
    }
}