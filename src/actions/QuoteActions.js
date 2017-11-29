import QuoteApi from '../components/common/QuoteApi';
import { FETCH_QUOTE, FETCH_START } from './types';
import staticQuotes from './quotes.json';
const api = new QuoteApi();

export const getQuote = () => {
  return (dispatch) => {
      dispatch({ type: FETCH_START })
      api.getQuote()
         .then(response => {
              dispatch({
                type: FETCH_QUOTE,
                payload: response
              });
         })
         .catch(err => {
           randomQuote = Math.floor(Math.random() * staticQuotes.quotes.length);
           dispatch({
             type: FETCH_QUOTE,
             payload: {
                        "quoteText" : staticQuotes.quotes[randomQuote].quote,
                        "quoteAuthor": staticQuotes.quotes[randomQuote].author
                      }
           })
         });
  };
};
