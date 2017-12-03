
import { FETCH_QUOTE, FETCH_START } from '../actions/types';

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
            loading: false,
            count
          };
    }
    default:
        return state;
  }
};
