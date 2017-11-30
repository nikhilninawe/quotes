import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Spinner } from './common';
import { getQuote } from '../actions';

class QuoteComponent extends Component {

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
      const { text, author } = this.props;
      return (
        <Card style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
        <CardSection
          style={{ borderBottomWidth: 0, flexDirection: 'row', minHeight: 200 }}
        >
              <Text style={style.textStyle}> {text} </Text>
          </CardSection>
          <CardSection style={{ borderBottomWidth: 0, justifyContent: 'flex-end' }}>
              <Text style={style.authorStyle}> -{author} </Text>
          </CardSection>
          <CardSection>
            {this.renderButton()}
          </CardSection>
        </Card>
      );
    }
}

const style = {
  textStyle: {
    fontSize: 32,
    fontStyle: 'italic',
    flexWrap: 'wrap',
    fontWeight: 'bold',
  },
  authorStyle: {
      fontSize: 20
  }
};

const mapStateToProps = (state) => {
  return {
    text: state.quote.text,
    author: state.quote.author,
    loading: state.quote.loading
   };
};


export default connect(mapStateToProps, { getQuote })(QuoteComponent);
