import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Background from './components/Background/Background';
import Shelf from './components/Shelf/Shelf';
import AboveShelf from './components/AboveShelf/AboveShelf';
import UnderShelf from './components/UnderShelf/UnderShelf';

function App() {
  return (
    <BrowserRouter>
      <Background>
        <AboveShelf />
        {/* <Shelf></Shelf> */}
        <Shelf />
        <UnderShelf />
      </Background>
    </BrowserRouter>
  );
}

export default App;
