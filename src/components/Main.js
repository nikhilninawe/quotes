import React, { Component } from 'react';
import { View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { Header, Spinner, Button, CardSection } from './common/index';
import GoogleAd from './GoogleAd';
import QuoteComponent from './QuoteComponent';
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
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', paddingTop: 20 }}>
                <Header headerText="Inspirational Quotes" />
                <ScrollView> 
                    <TouchableWithoutFeedback>
                        <QuoteComponent {...this.props} />
                    </TouchableWithoutFeedback>
                </ScrollView>
                <CardSection>
                    {this.renderButton()}
                 </CardSection>
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
  
