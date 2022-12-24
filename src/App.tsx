import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Background from './components/Background/Background';
import Shelf from './components/Shelf/Shelf';
import Book from './components/Book/Book';

function App() {
  return (
    <BrowserRouter>
      <Background>
        <Shelf>{/* <Book /> */}</Shelf>
      </Background>
    </BrowserRouter>
  );
}

export default App;
