import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './src/reducers';
import RouterComponent from './src/components/RouterComponent';

console.ignoredYellowBox = ['Remote debugger'];

class App extends Component {

    render() {
      return (
        <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
          <RouterComponent />
        </Provider>
    );
    }
}

export default App;
