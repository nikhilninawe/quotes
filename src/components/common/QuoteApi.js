import RestClient from 'react-native-rest-client';

export default class QuoteApi extends RestClient {
  constructor() {
    super('http://api.forismatic.com/api/1.0');
  }

  getQuote() {
    return this.GET('/getQuote?method=getQuote&format=json&key=&lang=en');
  }
}
