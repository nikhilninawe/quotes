import React, { Component } from 'react';
import firebase from 'firebase';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './src/reducers';
import RouterComponent from './src/components/RouterComponent';

console.ignoredYellowBox = ['Remote debugger'];

class App extends Component {

    componentWillMount() {
      const config = {
        apiKey: 'AIzaSyCtwgohUcHfx0pvQcYf5TtwViAXKrGs-Ng',
        authDomain: 'quotes-df7ec.firebaseapp.com',
        databaseURL: 'https://quotes-df7ec.firebaseio.com',
        projectId: 'quotes-df7ec',
        storageBucket: 'quotes-df7ec.appspot.com',
        messagingSenderId: '126068011748'
      };
      
      if (!firebase.apps.length) {
        firebase.initializeApp(config);
      }
    }

    render() {
      return (
        <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
          <RouterComponent />
        </Provider>
    );
    }
}

export default App;
