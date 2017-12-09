
import { FETCH_QUOTE, FETCH_START, FETCH_BULK_QUOTES } from '../actions/types';

const INITIAL_STATE = { text: '', author: '', loading: false, count: 0 };
let THRESHOLD = 5;
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_START:
      return { ...state, loading: true };
    case FETCH_QUOTE: {
      let count = state.count;
      if (count === THRESHOLD) {
        count = 0;
        THRESHOLD = 10;
      }
      count++;
      return { ...state,
            text: action.payload.quoteText,
            author: action.payload.quoteAuthor,
            obj: action.payload,
            loading: false,
            count
          };
    }
    case FETCH_BULK_QUOTES: {
      return {
          ...state,
          bulk_quotes: action.payload
      };
    }
    default:
        return state;
  }
};
