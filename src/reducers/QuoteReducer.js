
import { FETCH_QUOTE } from '../actions/types';

const INITIAL_STATE = { text: '', author: '' }

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_QUOTE:
      return { ...state, text: action.payload.quoteText, author: action.payload.quoteAuthor };
    default:
        return state;
  }
};
