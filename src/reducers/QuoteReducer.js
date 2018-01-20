
import {
  FETCH_QUOTE,
  FETCH_START,
  FETCH_SINGLE_QUOTE,
  SWITCH_STATE,
  CURRENT_QUOTE,
  LANGUAGE_CHANGE } from '../actions/types';

const INITIAL_STATE = {
  current: [],
  next: [],
  loading: false,
  count: 0,
  currentQuote: null,
  language: 'en'
};
let THRESHOLD = 5;
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
      };
    }
    case FETCH_SINGLE_QUOTE: {
      let count = state.count;
      if (count === THRESHOLD) {
        count = 0;
        THRESHOLD = 10;
      }
      count++;
      let newNext = Array.from(state.next);
      newNext = newNext.length !== 0 && action.payload.author === newNext[newNext.length - 1].author ? 
                newNext : newNext.concat([action.payload]);
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
    default:
        return state;
  }
};
