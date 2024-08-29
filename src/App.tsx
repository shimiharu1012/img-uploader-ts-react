import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ImageComponent } from './components/ImageComponent';
import { SingleImageComponent } from './components/SingleImageInputComponent';

function App() {
  return (
    <div className="App">
      {/* <h2>ImageComponent</h2>
      <ImageComponent/> */}
      <h2>SingleImageComponent</h2>
      <SingleImageComponent/>
    </div>
  );
}

export default App;
