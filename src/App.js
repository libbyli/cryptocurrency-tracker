import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import './App.css';
import CurrencyList from './CurrencyList';

const axios = require('axios');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 1,
      currencyToSearch: '',
      currency: [],
    };
  }

  componentDidMount() {
    axios.get(`/${this.state.userId}`)
      .then((response) => {
        console.log(response.data);
        if (response.data.currency) {
          let additionalCurrency = Object.keys(response.data);
          this.setState({
            currencyToSearch: additionalCurrency,
          })
        }
        axios.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD`)
          .then((response) => {
            console.log(response.data);
          })
          .catch(error => console.log('Error in retrieving API data: ', error));
      })
      .catch(error => console.log('Error in retreiving user data upon loading: ', error));
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">Cryptotracker</h1>
          <CurrencyList currency={this.state.currency}/>
        </div>
      </section>
    );
  }
}

export default App;
