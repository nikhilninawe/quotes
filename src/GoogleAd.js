
import React, { Component } from 'react';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob'

class GoogleAd extends Component {
  render(){
    return(// Display a banner
    <AdMobBanner
      adSize="fullBanner"
      adUnitID="ca-app-pub-7330930382531571/5339560084"
      testDevices={[AdMobBanner.simulatorId]}
      onAdFailedToLoad={error => console.error(error)}
      />
    );
  }
}

export default GoogleAd;
