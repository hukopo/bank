import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Bank from "./Bank.js";
import AdminPanel from "./Admin/AdminPanel.js";

class App extends Component {
  
  render() {
    return (
      <div>
        <Route exact path="/home" component={Bank} />
        <Route exact path="/admin" component={AdminPanel} />
      </div >
    );
  }
}

export default App;
