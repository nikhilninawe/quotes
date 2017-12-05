import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Swiper from 'react-native-deck-swiper';
import { Card } from './common';
import { getQuote } from '../actions/QuoteActions';

class SwipeQuoteCompenent extends Component {

    componentWillMount() {
        this.props.getQuote();        
    }

    componentWillReceiveProps(props) {
        this.swiper.card = [props];
    }

    onSwipe = () => {
        this.props.getQuote();
    }

    renderCard = quote => {
        return (
            <View style={styles.card}>
              <Text style={styles.text}>{quote.quote}</Text>
              <Text style={styles.text}>{quote.author}</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={{ flexGrow: 1 }}>
                <Swiper
                    ref={swiper => {
                        this.swiper = swiper;
                    }}
                    renderCard={this.renderCard}
                    // onSwiped={this.jumpTo}                    
                    onSwiped={this.getQuote}
                    onSwipedAll={() => { console.log('onSwipedAll'); }}
                    cardIndex={0}
                    backgroundColor={'white'}
                />
             </View>
        );
    }
}

const styles = {
    text: {
        textAlign: 'center',
        fontSize: 50,
        backgroundColor: 'transparent'
      },
      card: {
        // flex: 1,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#E8E8E8',
        justifyContent: 'center',
        backgroundColor: 'white',
      }

};

const mapStateToProps = state => {
    return {
        text: state.quote.text,
        author: state.quote.author,
        loading: state.quote.loading
    };
};

export default connect(mapStateToProps, { getQuote })(SwipeQuoteCompenent);

