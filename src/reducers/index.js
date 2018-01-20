import { combineReducers } from 'redux';
import QuoteReducer from './QuoteReducer';
import NotificationReducer from './NotificationReducer';
import UserActionReducer from './UserActionReducer';
import PopupReducer from './PopupReducer';

export default combineReducers({
  quote: QuoteReducer,
  notification: NotificationReducer,
  action: UserActionReducer,
  popup: PopupReducer
});
