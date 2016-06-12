import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import TopPage from './containers/pages/TopPage'
import ChartListPage from './containers/pages/ChartListPage'
import ChartPage from './containers/pages/ChartPage'
import AnalyticsPage from './containers/pages/AnalyticsPage'
import TradesPage from './containers/pages/TradesPage'

export default ( 
  <Route path="/" component={App}>
    <IndexRoute component={TopPage} />
    <Route path="charts" component={ChartListPage} />
    <Route path="chart/:product_id" component={ChartPage} />
    <Route path="analytics" component={AnalyticsPage} />
    <Route path="dev/trades" component={TradesPage} />
  </Route>
)