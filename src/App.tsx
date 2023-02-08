import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Background from './components/Background/Background';
import { Provider } from 'react-redux';
import store from './store';
import Router from './components/Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Background>
          <Router />
        </Background>
        <ToastContainer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
