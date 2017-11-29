import QuoteApi from '../common/QuoteApi';
import { FETCH_QUOTE } from './types';

const api = new QuoteApi();

export const getQuote = () => {
  return (dispatch) => {
      api.getQuote()
         .then(response => {
              dispatch({
                type: FETCH_QUOTE,
                payload: response
              });
         });
  };
};
