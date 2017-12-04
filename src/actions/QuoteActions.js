import QuoteApi from '../components/common/QuoteApi';
import { FETCH_QUOTE, FETCH_START } from './types';
import staticQuotes from './quotes.json';

const api = new QuoteApi();

const testQuote = (dispatch) => {
  dispatch({
    type: FETCH_QUOTE,
    payload: {
               quoteText: staticQuotes.quotes[13].quote + staticQuotes.quotes[13].quote,
               quoteAuthor: staticQuotes.quotes[13].author
             }
  });
};

const prodQuote = (dispatch) => {
  api.getQuote()
     .then(response => {
          dispatch({
            type: FETCH_QUOTE,
            payload: response
          });
     })
     .catch(error => {
       console.log(error);
       const randomQuote = Math.floor((Math.random() * staticQuotes.quotes.length) - 1);
       const quote = staticQuotes.quotes[randomQuote];
       dispatch({
         type: FETCH_QUOTE,
         payload: {
                    quoteText: quote.quote,
                    quoteAuthor: quote.author
                  }
       });
     });
};

export const getQuote = () => {
  return (dispatch) => {
      dispatch({ type: FETCH_START });
      // testQuote(dispatch);
      prodQuote(dispatch);
  };
};
