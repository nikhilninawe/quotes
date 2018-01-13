import { combineReducers } from 'redux';
import QuoteReducer from './QuoteReducer';
import NotificationReducer from './NotificationReducer';
import UserActionReducer from './UserActionReducer';
import GestureVisibilityReducer from './GestureVisibilityReducer';

export default combineReducers({
  quote: QuoteReducer,
  notification: NotificationReducer,
  action: UserActionReducer,
  gesture: GestureVisibilityReducer

});
