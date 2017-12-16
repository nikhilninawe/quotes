import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Header, ShareComponent } from './common/index';
import GoogleAd from './GoogleAd';
import SnapCarousel from './SnapCarousel';

class Main extends Component {
    render() {
        return (
            <View style={{ flex: 1, paddingTop: 20, justifyContent: 'space-between' }} >
                <Header headerText="Inspirational Quotes" />
                <SnapCarousel />         
                <ShareComponent {...this.props} />
                <GoogleAd />
            </View>
        );
    }

}

const mapStateToProps = (state) => {
    return {
      quote: state.quote.currentQuote,
     };
  };
  
export default connect(mapStateToProps, { })(Main);
  
