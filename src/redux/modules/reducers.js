import { combineReducers } from 'redux';
import auth from './auth';
import resource from './resource';
import chart from './chart';
import import_trades from './import_trades';

export default combineReducers({
    auth,
    resource,
    chart,
    import_trades
})