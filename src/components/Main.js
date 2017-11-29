import React, { Component } from 'react';
import { Card } from './common';
import GoogleAd from './GoogleAd';
import QuoteComponent from './QuoteComponent';

class Main extends Component {
   render() {
      return (
        <Card>
          <QuoteComponent />
          <GoogleAd />
      </Card>
    );
    }
}

export default Main;
