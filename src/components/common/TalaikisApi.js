import RestClient from 'react-native-rest-client';

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
}
