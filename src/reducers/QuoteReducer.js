
import { FETCH_QUOTE, FETCH_START } from '../actions/types';

const INITIAL_STATE = { text: '', author: '', loading: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_START:
      return { ...state, loading: true };
    case FETCH_QUOTE:
      return { ...state,
            text: action.payload.quoteText,
            author: action.payload.quoteAuthor,
            loading: false
          };
    default:
        return state;
  }
};
