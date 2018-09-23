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
    axios.get(`/users/${this.state.userId}`)
      .then((response) => {
        console.log(response.data);
        if (response.data.currency) {
          let additionalCurrency = Object.values(response.data.currency).join(',');
          this.setState({
            currencyToSearch: `,${additionalCurrency}`,
          }) 
        }

        axios.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH${this.state.currencyToSearch}&tsyms=USD`)
          .then((response) => {
            console.log(response.data);
            let currencies = Object.keys(response.data);
            console.log(currencies)
            let currencyArray = [];
            currencies.forEach((currency) => {
              let currencyObj = {};
              currencyObj.name = currency;
              currencyObj.price = response.data[currency].USD;
              currencyArray.push(currencyObj);
            });
            console.log(currencyArray)
            this.setState({
              currency: currencyArray,
            });
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
          <CurrencyList currency={this.state.currency} />
        </div>
      </section>
    );
  }
}

export default App;
