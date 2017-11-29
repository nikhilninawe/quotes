import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import GoogleAd from './GoogleAd';
import QuoteComponent from './QuoteComponent';

 class Main extends Component {

   render() {
      return(
        <Card>
          <QuoteComponent />
          <CardSection style={{height: 60}}>
            <GoogleAd />
          </CardSection>
      </Card>
    );
    }
};

export default Main;
