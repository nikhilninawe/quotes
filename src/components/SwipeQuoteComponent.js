import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
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
            <ScrollView> 
                 <TouchableWithoutFeedback>
                    <View style={styles.card}>
                         <Text style={styles.text}>{quote.quote}</Text>
                         <Text style={styles.author}>-{quote.author}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        ); 
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Swiper
                    cards={this.props.quotes}
                    renderCard={this.renderCard.bind(this)}
                    onSwiped={this.onSwipe.bind(this)}                    
                    onSwipedAll={() => { console.log('onSwipedAll'); }}
                    cardIndex={0}
                    backgroundColor={'white'}
                    showSecondCard={false}
                    disableTopSwipe
                    disableBottomSwipe
                    cardVerticalMargin={50}
                    cardHorizontalMargin={10}
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
        backgroundColor: '#F5FCFF',
        // alignItems: 'center'
        // height: 1000
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
        quotes: [{ quote: '', author: '' }],
        loading: state.quote.loading
    };
};

export default connect(mapStateToProps, { getQuote, pullQuotes })(SwipeQuoteCompenent);

