import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { getQuote } from '../actions';

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

    renderButton(){
      if(this.props.loading){
        return (<Spinner size="large" />);
      }
      return (
        <Button onPress={this.onButtonPress.bind(this)}>
          Next
      </Button>
    );
    }

    render() {
      const { text, author } = this.props;
      return (
        <View style={{flexDirection: 'column'}}>
          <CardSection style={{ borderBottomWidth:0, flexDirection:'row', minHeight: 200}}>
            <Text style={style.textStyle}> {text} </Text>
          </CardSection>
          <CardSection style={{  borderBottomWidth:0, justifyContent:'flex-end'}}>
              <Text style={style.authorStyle}> -{author} </Text>
          </CardSection>
          <CardSection>
            {this.renderButton()}
          </CardSection>
        </View>
      );
    }
}

const style = {
  textStyle: {
    fontSize : 30,
    fontStyle: 'italic',
    flexWrap:'wrap'
  },
  authorStyle:{
      fontSize: 20
  }
}

const mapStateToProps = (state) => {
  return {
    text: state.quote.text,
    author: state.quote.author,
    loading: state.quote.loading
   };
};


export default connect(mapStateToProps, {getQuote})(QuoteComponent);
