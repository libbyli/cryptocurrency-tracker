import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import './App.css';

const axios = require('axios');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 1,
      currency: [],
    };
  }

  componentDidMount() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD')
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => console.log('Error in retrieving API data: ', error));
  }
  
  render() {
    return (
      <div>
      <h1>Cryptotracker</h1>
        hello world
      </div>
    );
  }
}

export default App;
