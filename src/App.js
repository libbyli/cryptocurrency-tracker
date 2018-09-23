import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import './App.css';
import CurrencyList from './CurrencyList';
import CurrencySearch from './CurrencySearch';

const axios = require('axios');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCurrency: [],
      currencyToSearch: '',
      currency: [],
      userId: 1,
    };
  }

  componentDidMount() {
    axios.get(`/users/${this.state.userId}`)
      .then((response) => {
        if (response.data.currency) {
          const additionalCurrency = Object.values(response.data.currency).join(',');
          this.setState({
            currencyToSearch: `,${additionalCurrency}`,
          });
        }

        axios.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH${this.state.currencyToSearch}&tsyms=USD`)
          .then((response) => {
            const currencies = Object.keys(response.data);
            const currencyArray = [];
            currencies.forEach((currency) => {
              const currencyObj = {};
              currencyObj.name = currency;
              currencyObj.price = response.data[currency].USD;
              currencyArray.push(currencyObj);
            });
            this.setState({
              currency: currencyArray,
            });
          })
          .catch(error => console.log('Error in retrieving API data: ', error));
      })
      .catch(error => console.log('Error in retreiving user data upon loading: ', error));

    axios.get('https://min-api.cryptocompare.com/data/all/coinlist')
      .then((response) => {
        let coinSymbols = Object.keys(response.data.Data);
        this.setState({
          allCurrency: coinSymbols,
        });
      })
      .catch(error => console.log('Error in retrieving coin list: ', error));
  }

  render() {
    return (
      <section className="container">
        <section className="section">
          <div className="container">
            <h1 className="title">Cryptotracker</h1>
          </div>
        </section>
        <section className="section">
          <CurrencySearch allCurrency={this.state.allCurrency} />
        </section>
        <section className="section">
          <CurrencyList currency={this.state.currency} />
        </section>
      </section>
    );
  }
}

export default App;
