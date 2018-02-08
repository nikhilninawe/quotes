
import {
  FETCH_QUOTE,
  FETCH_START,
  FETCH_SINGLE_QUOTE,
  SWITCH_STATE,
  CURRENT_QUOTE,
  LANGUAGE_CHANGE,
  CURRENT_INDEX } from '../actions/types';

const INITIAL_STATE = {
  current: [],
  next: [],
  loading: false,
  count: 0,
  currentQuote: null,
  language: 'en',
  index: 0
};
const THRESHOLD = 20;
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_START:
      return { ...state, loading: true };
    case FETCH_QUOTE: {
      return { 
        ...state,
        current: action.payload,
        currentQuote: action.payload[0],
        loading: false,
        next: [],
        index: 0

      };
    }
    case FETCH_SINGLE_QUOTE: {
      let count = state.count;
      if (count === THRESHOLD) {
        count = 0;
      }
      count++;
      let newNext = Array.from(state.next);
      if (newNext.length !== 0
          && action.payload.quote
          && action.payload.quote === newNext[newNext.length - 1].quote) {
          console.log(action.payload);
      } else {
        newNext = newNext.concat([action.payload]);
      }
      return {
        ...state,
        count,
        next: newNext
      };
    }
    case SWITCH_STATE:
      return {
        ...state,
        current: state.current.concat(state.next),
        next: []
     };
    case CURRENT_QUOTE:
      return {
        ...state,
        currentQuote: action.payload
      };
    case LANGUAGE_CHANGE:
      return {
        ...state,
        language: action.payload.value
      };
    case CURRENT_INDEX:
      return {
        ...state,
        index: action.payload
      };
    default:
        return state;
  }
};
