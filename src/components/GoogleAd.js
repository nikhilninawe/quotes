
import React, { Component } from 'react';
import {
  AdMobBanner,
  AdMobInterstitial
  // PublisherBanner,
  // AdMobRewarded,
} from 'react-native-admob';
import { connect } from 'react-redux';
import { CardSection } from './common';

AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
AdMobInterstitial.setAdUnitID('ca-app-pub-7330930382531571/2161219633');

class GoogleAd extends Component {

  showInterstitial() {
    AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
  }

  renderAds() {
    if (this.props.count === 4) {
      this.showInterstitial();
    }
    return (
          <AdMobBanner
            adSize="smartBannerLandscape"
            adUnitID="ca-app-pub-7330930382531571/5339560084"
            testDevices={[AdMobBanner.simulatorId]}
            onAdFailedToLoad={error => console.error(error)}
          />
    );
  }

  render() {
    return (
        <CardSection>
          { this.renderAds() }
        </CardSection>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.quote.count
  };
};

export default connect(mapStateToProps, {})(GoogleAd);
