import React, { Component } from 'react';
import { View, Text,
     ScrollView, TouchableWithoutFeedback, Dimensions, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import { Spinner } from './common';
import { getQuote, getSingleQuote, switchState, updateCurrentQuote } from '../actions/QuoteActions';

function wp(percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const slideHeight = viewportHeight * 0.4;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);
const sliderWidth = viewportWidth;
const itemWidth = (slideWidth + (itemHorizontalMargin * 2)) + 40;
const images = [require('../assets/leather.jpg'), require('../assets/beige.jpg'), require('../assets/polyester.jpeg'), require('../assets/stock.jpg')];

class SnapCarousel extends Component {
  
    componentWillMount() {
        this.props.getQuote();        
    }

    onSnapToItem(slideIndex) {
        this.props.getSingleQuote();
        this.props.updateCurrentQuote(this.props.quotes[slideIndex]);
        if (slideIndex === this.props.quotes.length - 1) {
            this.props.switchState();
        }
    }

    renderCard({ item }) {
        const background = images[item.imageIndex];        
        return (
            <ScrollView> 
                <TouchableWithoutFeedback>
                <ImageBackground
                    source={background}
                    style={{ width: itemWidth }}          
                >
                    <Text style={styles.text}>{item.quote}</Text>
                    <Text style={styles.author}>-{item.author}</Text>
                 </ImageBackground>
             </TouchableWithoutFeedback>
         </ScrollView>
        ); 
    }

    render() {       
        if (this.props.loading || this.props.quotes.length === 0) {
            return (<Spinner size="large" />);
        }
        return (
            <View style={{ flex: 1, justifyContent: 'center', paddingTop: 40, maxHeight: 400 }}>
                <Carousel 
                    data={this.props.quotes}
                    renderItem={this.renderCard.bind(this)}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    loop={false}
                    loopClonesPerSide={0}
                    inactiveSlideScale={0.94}
                    inactiveSlideOpacity={0.7}
                    enableMomentum={false}
                    activeSlideAlignment={'center'}
                    onSnapToItem={this.onSnapToItem.bind(this)}
                    firstItem={0}
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
        width: itemWidth
      }

};

const mapStateToProps = state => {
    const quotes = state.quote.current;
    if (quotes) {
        return ({
            quotes,
            loading: state.quote.loading,
            index: state.quote.index
        }
        );
    }   
    return {
        quotes: [],
        loading: state.quote.loading,
        index: state.quote.index
    };
};

export default
 connect(mapStateToProps, 
    { getQuote, switchState, getSingleQuote, updateCurrentQuote })(SnapCarousel);

