import QuoteApi from '../components/common/QuoteApi';
import TalaikisApi from '../components/common/TalaikisApi';
import { 
  FETCH_QUOTE, 
  FETCH_START, 
  FETCH_SINGLE_QUOTE,
  SWITCH_STATE,
  CURRENT_QUOTE } from './types';
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
            type: FETCH_SINGLE_QUOTE,
            payload: {
              quote: response.quoteText,
              author: response.quoteAuthor
            }
          });
     })
     .catch(error => {
       console.log(error);
       const randomQuote = Math.floor((Math.random() * staticQuotes.quotes.length) - 1);
       const quote = staticQuotes.quotes[randomQuote];
       dispatch({
         type: FETCH_SINGLE_QUOTE,
         payload: {
                    quote: quote.quote,
                    author: quote.author
                  }
       });
     });
};

const prodQuoteV2 = (dispatch) => {
  const randomQuote = Math.floor((Math.random() * staticQuotes.quotes.length) - 1);
  const quote = staticQuotes.quotes[randomQuote];
  api.getQuote()
     .then(response => {
          dispatch({
            type: FETCH_QUOTE,
            payload: [{ quote: response.quoteText, author: response.quoteAuthor },
                      { quote: quote.quote, author: quote.author }]
          });
     })
     .catch(error => {
       console.log(error);  
       dispatch({
         type: FETCH_QUOTE,
         payload: [{
                    quote: quote.quote,
                    author: quote.author
                  }]
       });
     });
};

const talaikisQuotes = (dispatch) => {
  const randomQuote = Math.floor((Math.random() * 90) - 1);  
  tApi.getQuote()
      .then(response => {
        dispatch({
          type: FETCH_QUOTE,
          payload: response.splice(randomQuote, 10)
        });
      })
      .catch(error => {
        console.log(error);
        const quote = staticQuotes.quotes.splice(randomQuote, 10);
        dispatch({
          type: FETCH_QUOTE,
          payload: quote
        });
      });
};

export const getQuote = () => {
  return (dispatch) => {
      dispatch({ type: FETCH_START });
      // testQuote(dispatch);
      talaikisQuotes(dispatch);
  };
};

export const getSingleQuote = () => {
  return (dispatch) => {
    prodQuote(dispatch);
  };
};

export const pullQuotes = () => {
  return (dispatch) => {
    talaikisQuotes(dispatch);
  };
};

export const switchState = () => {
  return {
    type: SWITCH_STATE
  };
};

export const updateCurrentQuote = (quote) => {
  return {
    type: CURRENT_QUOTE,
    payload: quote
  };
};
