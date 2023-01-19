import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Background from './components/Background/Background';
import Shelf from './components/Shelf/Shelf';
import AboveShelf from './components/AboveShelf/AboveShelf';
import Slider from './components/Slider/Slider';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Background>
          <AboveShelf />
          <Shelf />
          <Slider />
        </Background>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
