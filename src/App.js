import React, { Component } from 'react';
import './App.css';
import Payment from './Payment';

class App extends Component {
  render() {
    return (
      <div className='main'>
        <div className='header'>
          <img alt="shark not found" height='300px' src="./shark.jpg" />
          <h1>Индивидуальный предприниматель Алиса банк</h1>
          <div>
            +79193977777
            <a href='/'>www.alysa.com</a>
            <a href='/'>alysa@hukopo.com</a>
            <div>
              <a href='/'>информация о компании</a>
            </div>
            <div>
              <a href='/'>показать реквизиты</a>
            </div>
          </div>
        </div>
        <div>
          <body>
            <Payment/>
          </body>
        </div>
      </div>
    );
  }
}

export default App;
