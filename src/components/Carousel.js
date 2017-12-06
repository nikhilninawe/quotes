import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import staticQuotes from '../actions/quotes.json';

class Carousel extends Component {

    constructor() {
        super();
        this.state = { quote: staticQuotes.quotes[0].quote };
    }

    onPress() {
        this.setState({ quote: staticQuotes.quotes[2].quote });
    }

    render() {
        if (staticQuotes) {
          return (
            <View
              style={{ minHeight: 200 }}
            >
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
              >
                <TouchableOpacity
                    // style={styles.button}
                    onPress={this.onPress}
                >
                    <Text> {this.state.quote}</Text>
                 </TouchableOpacity>
              </ScrollView>
            </View>
          );
        }
        console.log('Please provide images');
        return null;    
      }
}


export default Carousel;
