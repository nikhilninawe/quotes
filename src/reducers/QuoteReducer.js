
import { FETCH_QUOTE, FETCH_START, FETCH_SINGLE_QUOTE, SWITCH_STATE } from '../actions/types';

const INITIAL_STATE = { current: [], next: [], loading: false, count: 0, index: 0 };
let THRESHOLD = 5;
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_START:
      return { ...state, loading: true };
    case FETCH_QUOTE: {
      return { 
            ...state,
            current: action.payload,
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
      return {
        ...state,
        count,
        next: state.next.concat(action.payload)
      };
    }
    case SWITCH_STATE:
      return {
        ...state,
        current: state.current.concat(state.next),
        next: []
      };
    default:
        return state;
  }
};
