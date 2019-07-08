import React, { Component } from "react";
import {   BrowserRouter     } from 'react-router-dom'
import Routes from './routes';
export class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
