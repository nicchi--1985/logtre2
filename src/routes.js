import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import TopPage from './containers/pages/TopPage'
import ChartListPage from './containers/pages/ChartListPage'
import ChartPage from './containers/pages/ChartPage'
import AnalyticsPage from './containers/pages/AnalyticsPage'
import SettingPage from './containers/pages/SettingPage'
import TradesPage from './containers/pages/TradesPage'
import LoginPage from './containers/pages/LoginPage'
import UserOnly from './containers/UserOnly'
import GuestOnly from './containers/GuestOnly'

export default (
  <Route>
    <Route component={UserOnly}>
      <Route path="/top" component={App}>
        <IndexRoute component={TopPage} />
        <Route path="/charts/:broker" component={ChartListPage} />
        <Route path="/chart/:broker/:product_no" component={ChartPage} />
        <Route path="/analytics" component={AnalyticsPage} />
        <Route path="/setting" component={SettingPage} />
        <Route path="/dev/trades" component={TradesPage} />
      </Route>
     </Route>
    <Route component={GuestOnly}>
      <Route path="/login" component={LoginPage} />
    </Route>
  </Route>
)