import QuoteApi from '../components/common/QuoteApi';
import { FETCH_QUOTE, FETCH_START } from './types';
import staticQuotes from './quotes.json';

const api = new QuoteApi();

// const testQuote = (dispatch) => {
//   dispatch({
//     type: FETCH_QUOTE,
//     payload: {
//                quoteText: staticQuotes.quotes[13].quote,
//                quoteAuthor: staticQuotes.quotes[10].author
//              }
//   });
// };

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
       const randomQuote = Math.floor(Math.random() * staticQuotes.quotes.length);
       dispatch({
         type: FETCH_QUOTE,
         payload: {
                    quoteText: staticQuotes.quotes[randomQuote].quote,
                    quoteAuthor: staticQuotes.quotes[randomQuote].author
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
