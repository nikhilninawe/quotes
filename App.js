import React, { Component } from 'react';
import { View } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Header } from './src/components/common';
import Main from './src/components/Main';
import reducers from './src/reducers';

console.ignoredYellowBox = ['Remote debugger'];

export default class App extends Component {
    render() {
      return (
        <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
          <View style={{ paddingTop: 20 }}>
            <Header headerText="Inspirational Quotes" />
            <Main />
          </View>
        </Provider>
    );
    }
}
