import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Background from './components/Background/Background';
import { Provider } from 'react-redux';
import store from './store';
import RouterComponent from './components/RouterComponent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Background>
          <RouterComponent />
        </Background>
        <ToastContainer />
      </Router>
    </Provider>
  );
}

export default App;
