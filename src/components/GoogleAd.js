
import React, { Component } from 'react';
import {
  AdMobBanner,
  // AdMobInterstitial,
  // PublisherBanner,
  // AdMobRewarded,
} from 'react-native-admob';
import { CardSection } from './common';

class GoogleAd extends Component {
  render() {
    return (
    <CardSection style={{ height: 60 }}>
      <AdMobBanner
        adSize="fullBanner"
        adUnitID="ca-app-pub-7330930382531571/5339560084"
        testDevices={[AdMobBanner.simulatorId]}
        onAdFailedToLoad={error => console.error(error)}
      />
    </CardSection>
    );
  }
}

export default GoogleAd;
