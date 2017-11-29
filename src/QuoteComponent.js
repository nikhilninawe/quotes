import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { getQuote } from './actions';

class QuoteComponent extends Component {

    componentWillMount() {
      this.props.getQuote();
    }

    componentWillReceiveProps(nextProps) {
      // console.log(nextProps);
    }

    onButtonPress(){
      this.props.getQuote();
    }

    render() {
      const { text, author } = this.props;
      return (
        <View>
          <CardSection style={{ height: 200, borderBottomWidth:0}}>
            <Text style={style.textStyle}> {text} </Text>
          </CardSection>
          <CardSection style={{ height: 60, borderBottomWidth:0, alignSelf: 'flex-end'}}>
            <View>
              <Text style={style.authorStyle}> -{author} </Text>
            </View>
          </CardSection>
          <CardSection>
            <Button onPress={this.onButtonPress.bind(this)}>
                Next
            </Button>
          </CardSection>
        </View>
      );
    }
}

const style = {
  textStyle: {
    fontSize : 30,
    fontStyle: 'italic'
  },
  authorStyle:{
      fontSize: 20
  }
}

const mapStateToProps = (state) => {
  return {
    text: state.quote.text,
    author: state.quote.author
   };
};


export default connect(mapStateToProps, {getQuote})(QuoteComponent);
