import RestClient from 'react-native-rest-client';
import quotesQuery from './ApolloQuery';
import client from '../ApolloClient';

export default class TalaikisApi extends RestClient {
  constructor() {
    super('https://talaikis.com/api');
  }

  getQuote() {
    return this.GET('/quotes/');
  }

  getSingleQuote() {
    return this.GET('/quotes/random/');
  }

  getGQLQuote(language = 'en', limit = 1) {
    return client.query({
      query: quotesQuery,
      variables: {
        lang: language,
        limit
      }
    });
  }
}
