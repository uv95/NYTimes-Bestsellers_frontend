import React from 'react';
import Background from './components/Background/Background';
import Shelf from './components/Shelf/Shelf';
import Book from './components/Book/Book';
function App() {
  return (
    <Background>
      <Shelf>
        <Book />
      </Shelf>
    </Background>
  );
}

export default App;
