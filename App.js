import React, { Component } from 'react';
import { Text, View } from 'react-native';
import ReduxThunk from 'redux-thunk';
import { Card, CardSection, Input, Button, Spinner, Header } from './src/components/common';
import { AppRegistry, Image } from 'react-native';
import Main from './src/components/Main';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './src/reducers';
console.ignoredYellowBox = ['Remote debugger'];

export default class App extends Component {
    render() {
      return(
        <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
          <View style={{ paddingTop: 20 }}>
            <Header headerText="Inspirational Quotes"/>
            <Main />
          </View>
        </Provider>
    );
    }
}
