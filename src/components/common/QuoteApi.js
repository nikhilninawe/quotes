import RestClient from 'react-native-rest-client';

export default class QuoteApi extends RestClient {
  constructor() {
    // Initialize with your base URL
    super('http://api.forismatic.com/api/1.0');
  }

  getQuote() {
    return this.GET('/getQuote?method=getQuote&format=json&key=&lang=en');
  }
}
