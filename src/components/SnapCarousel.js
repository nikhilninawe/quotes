import React, { Component } from 'react';
import { View, Text,
     ScrollView,
  TouchableWithoutFeedback, Dimensions, ImageBackground, AsyncStorage, Image } from 'react-native';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Spinner } from './common';
import { getQuotes,
  getSingleQuote,
  switchState, updateCurrentQuote, languageChange, updateCurrentIndex } from '../actions/index';

function wp(percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}
const { width: viewportWidth } = Dimensions.get('window');
const slideWidth = wp(81);
const itemHorizontalMargin = wp(2);
const sliderWidth = viewportWidth;
const itemWidth = (slideWidth + (itemHorizontalMargin * 2)) + 40;
const images = ['https://s3.ap-south-1.amazonaws.com/quotes2.4/leather.jpg',
'https://s3.ap-south-1.amazonaws.com/quotes2.4/beige.jpg',
'https://s3.ap-south-1.amazonaws.com/quotes2.4/polyester.jpeg',
'https://s3.ap-south-1.amazonaws.com/quotes2.4/stock.jpg'];

class SnapCarousel extends Component {
    componentWillMount() {
        if (this.props.reload === undefined
           || this.props.reload
           || this.props.quotes.length === 0) {
          this.getCache('language');
        }
    }

    onSnapToItem(slideIndex) {
        this.props.updateCurrentIndex(this.carousel.currentIndex);
        this.props.getSingleQuote(this.props.language);
        this.props.updateCurrentQuote(this.props.quotes[slideIndex]);
        if (slideIndex === this.props.quotes.length - 1) {
            this.props.switchState();
        }
    }

    async getCache(key) {
      const value = await AsyncStorage.getItem(key);
      let lang = 'en';
      if (value) {
        lang = JSON.parse(value).value;
      }
      console.log(`Language: ${lang}`);
      this.props.getQuotes(lang);
      this.props.languageChange({ value: lang });
    }

    renderCard({ item }) {
        if (item.type && item.type === 'image') {
          return (
            <ScrollView ref="view">
              <TouchableWithoutFeedback>
                <Image
                  style={{ width: itemWidth, height: 400 }}
                  resizeMode={'contain'}
                  source={{ uri: item.quoteUrl }}
                />
              </TouchableWithoutFeedback>
            </ScrollView>
          );
        }
      const background = images[item.imageIndex];
      return (
            <ScrollView ref="view">
                <TouchableWithoutFeedback>
                    <ImageBackground
                        source={{ uri: background }}
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
            <View
              style={{
                flex: 1, justifyContent: 'flex-start', maxHeight: 420, alignItems: 'center' }}
            >
                <Carousel
                    ref={(c) => { this.carousel = c; }}
                    data={this.props.quotes}
                    renderItem={this.renderCard.bind(this)}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    autoplay={this.props.autoplayEnabled}
                    autoplayInterval={this.props.autoplayInterval * 1000}
                    autoplayDelay={0}
                    lockScrollWhileSnapping
                    loopClonesPerSide={0}
                    inactiveSlideScale={0.94}
                    inactiveSlideOpacity={0.0}
                    enableMomentum={false}
                    activeSlideAlignment={'center'}
                    onSnapToItem={this.onSnapToItem.bind(this)}
                    firstItem={this.props.index}
                    // hasParallaxImages
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
        fontSize: 26,
        fontStyle: 'italic',
        fontWeight: 'bold',
      },

      author: {
        textAlign: 'right',
        fontSize: 18,
        backgroundColor: 'transparent',
        paddingTop: 20,
        paddingBottom: 10,
        paddingRight: 10
      },
      card: {
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#E8E8E8',
        width: itemWidth
      }

};

const mapStateToProps = state => {
    return ({
      quotes: state.quote.current,
      loading: state.quote.loading,
      index: state.quote.index,
      autoplayEnabled: state.notification.autoplayEnabled,
      autoplayInterval: state.notification.autoplayInterval,
      language: state.quote.language
    });
};

export default
 connect(mapStateToProps,
    { getQuotes,
      switchState,
      getSingleQuote,
      updateCurrentQuote,
      languageChange,
      updateCurrentIndex })(SnapCarousel);
