import React, { Component } from 'react';
import monkey from './monkey.png';
import './App.css';
import NameForm from './NameForm';




class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={monkey} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to FakeOddsMonkey</h1>
        </header>
      <NameForm/>



      </div>
    );
  }
}

export default App;
