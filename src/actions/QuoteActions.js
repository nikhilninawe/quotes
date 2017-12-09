import QuoteApi from '../components/common/QuoteApi';
import TalaikisApi from '../components/common/TalaikisApi';
import { FETCH_QUOTE, FETCH_START, FETCH_BULK_QUOTES } from './types';
import staticQuotes from './quotes.json';

const api = new QuoteApi();
const tApi = new TalaikisApi();

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

const talaikisQuotes = (dispatch) => {
  tApi.getQuote()
      .then(response => {
        dispatch({
          type: FETCH_BULK_QUOTES,
          payload: response
        });
      })
      .catch(error => {
      console.log(error);
      const randomQuote = Math.floor((Math.random() * staticQuotes.quotes.length) - 1);
      const quote = staticQuotes.quotes[randomQuote];
      dispatch({
        type: FETCH_QUOTE,
        payload: [{
                  quoteText: quote.quote,
                  quoteAuthor: quote.author
                }]
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

export const pullQuotes = () => {
  return (dispatch) => {
    talaikisQuotes(dispatch);
  };
};
