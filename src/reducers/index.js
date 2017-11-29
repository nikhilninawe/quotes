import { combineReducers } from 'redux';
import QuoteReducer from './QuoteReducer';

export default combineReducers({
  quote: QuoteReducer,
});
