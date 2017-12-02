import React, { Component } from 'react';
import { View } from 'react-native';
// import codePush from 'react-native-code-push';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Header } from './src/components/common';
import reducers from './src/reducers';
import GoogleAd from './src/components/GoogleAd';
import QuoteComponent from './src/components/QuoteComponent';

console.ignoredYellowBox = ['Remote debugger'];

class App extends Component {
    render() {
      return (
        <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
          <View style={{ paddingTop: 20 }}>
            <Header headerText="Inspirational Quotes" />
            <QuoteComponent />
            <GoogleAd />
          </View>
        </Provider>
    );
    }
}

// App = codePush(App);
export default App;
