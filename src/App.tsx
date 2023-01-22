import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Background from './components/Background/Background';
import { Provider } from 'react-redux';
import store from './store';
import Router from './components/Router';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Background>
          <Router />
        </Background>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
