import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './src/reducers';
import Main from './src/components/Main';

console.ignoredYellowBox = ['Remote debugger'];

class App extends Component {
    render() {
      return (
        <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
          <Main />
        </Provider>
    );
    }
}

export default App;
