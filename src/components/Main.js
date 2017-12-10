import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Header, Spinner, Button, ShareComponent } from './common/index';
import GoogleAd from './GoogleAd';
import SwipeQuoteComponent from './SwipeQuoteComponent';
import { getQuote } from '../actions';


class Main extends Component {

    componentWillMount() {
        this.props.getQuote();
      }
  
    onButtonPress() {
        this.props.getQuote();
    }

    renderButton() {
        if (this.props.loading) {
            return (<Spinner size="large" />);
        }
        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Next
            </Button>
        );
    }

    render() {
        return (
            <View style={{ flex: 1, paddingTop: 20 }}>
                <Header headerText="Inspirational Quotes" />
                <SwipeQuoteComponent />         
                <ShareComponent {...this.props} />
                <GoogleAd />
            </View>
        );
    }

}

const mapStateToProps = (state) => {
    return {
      text: state.quote.text,
      author: state.quote.author,
      loading: state.quote.loading
     };
  };
  
export default connect(mapStateToProps, { getQuote })(Main);
  
