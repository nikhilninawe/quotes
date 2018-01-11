import { combineReducers } from 'redux';
import QuoteReducer from './QuoteReducer';
import NotificationReducer from './NotificationReducer';

export default combineReducers({
  quote: QuoteReducer,
  notification: NotificationReducer
});
