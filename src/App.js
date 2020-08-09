import React from 'react';
import Frequent from './frequency.jsx'
import logo from './logo.svg';
import './App.css';


const request=require('request');

var url="http://terriblytinytales.com/test.txt";
var words=[];
var freq=[];


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          The Terribly Tiny Assignment <href>  </href> .
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          A Tale to get the most frequently occuring words.
        </a>
      </header>
      < Frequent />

    </div>
  );
}



export default App;
