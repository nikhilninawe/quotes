import { combineReducers } from 'redux';
import QuoteReducer from './QuoteReducer';
import HamburgerState from './HamburgerState';

export default combineReducers({
  quote: QuoteReducer,
  hamburger: HamburgerState
});
