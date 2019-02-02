import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import openSocket from 'socket.io-client';
import autoBind from 'react-autobind';
class App extends Component {

  constructor(props){
    super()
    autoBind(this)
   this.state = {
      resultOne: 1,
      resultTwo: 1
    }
  }


  componentDidMount() {
    let socket = openSocket('localhost:5000');
    socket.on('myEventOne', data => {
      this.setState({resultOne: this.state.resultOne + 1});
    }); 
    socket.on('myEventTwo', data => {
      this.setState({resultTwo: this.state.resultTwo + 1});
    }); 
  }

  renderComponentOne(data){
    return(<div>{this.state.resultOne}</div>)
  }
  renderComponentTwo(data){
    return(<div>{this.state.resultTwo}</div>)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          {this.renderComponentOne()}
          {this.renderComponentTwo()}
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
