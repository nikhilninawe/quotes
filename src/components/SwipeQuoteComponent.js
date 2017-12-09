import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Swiper from 'react-native-deck-swiper';
import { Spinner } from './common';
import { getQuote, pullQuotes } from '../actions/QuoteActions';

class SwipeQuoteCompenent extends Component {

    componentWillMount() {
        this.props.getQuote();        
    }

    onSwipe = () => {
        this.props.getQuote();
    }

    renderCard = quote => {
        if (this.props.loading) {
            return (<Spinner size="large" />);
        }
        return (
            <View style={styles.card}>
                    <Text style={styles.text}>{quote.quote}</Text>
                <Text style={styles.author}>-{quote.author}</Text>
            </View>
        ); 
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Swiper
                    cards={this.props.quotes}
                    renderCard={this.renderCard.bind(this)}
                    onSwiped={this.onSwipe.bind(this)}                    
                    onSwipedAll={() => { console.log('onSwipedAll'); }}
                    cardIndex={0}
                    backgroundColor={'white'}
                    showSecondCard={false}
                />
             </View>
        );
    }
}

const styles = {
    text: {
        textAlign: 'center',
        backgroundColor: 'transparent',
        minHeight: 100,
        fontSize: 32,
        fontStyle: 'italic',
        fontWeight: 'bold',
      },

      author: {
        textAlign: 'right',
        fontSize: 20,
        backgroundColor: 'transparent'
      },
      card: {
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#E8E8E8',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
      }

};

const mapStateToProps = state => {
    const quotes = state.quote.obj;
    if (quotes) {
        return ({
            quotes: [{ quote: quotes.quoteText, author: quotes.quoteAuthor }],
            loading: state.quote.loading
        }
        );
    }   
    return {
        quotes: [],
        loading: state.quote.loading
    };
};

export default connect(mapStateToProps, { getQuote, pullQuotes })(SwipeQuoteCompenent);

