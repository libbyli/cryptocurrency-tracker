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
      notFound: false,
      userId: 1,
    };
  }

  handleSubmit = (item) => {
    if (this.state.allCurrency.includes(item)) {
      axios.put(`/users/${this.state.userId}/currency`, {
        currency: item
      })
      .then(() => {
        axios.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${item}&tsyms=USD`)
          .then((response) => {
            const currencyToAdd = Object.keys(response.data);
            console.log(currencyToAdd)
            const currencyObj = {
              name: currencyToAdd,
              price: response.data[currencyToAdd].USD,
            }
            let newCurrencyArray = this.state.currency;
            newCurrencyArray.push(currencyObj);
            this.setState({
              currency: newCurrencyArray,
              notFound: false,
            });
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
    } else {
      this.setState({
        notFound: true,
      });
    }
  }

  handleDelete = (item) => {
    axios.delete(`/users/${this.state.userId}/currency/${item}`)
      .then(() => {
        let newCurrencyList = this.state.currency.filter(currency => currency.name !== item);
        this.setState({
          currency: newCurrencyList,
        });
      })
      .catch(error => console.log(error));
  }

  refreshData = () => {
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
  }

  componentDidMount() {
    this.refreshData();
    axios.get('https://min-api.cryptocompare.com/data/all/coinlist')
      .then((response) => {
        const coinSymbols = Object.keys(response.data.Data);
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
          <div className="content">
            <p>Add a cryptocurrency to track by typing in its symbol below.</p>
            <p>{this.state.notFound ? 'Sorry, no currency by that symbol was found.' : null }</p>
          </div>
          <CurrencySearch handleSubmit={this.handleSubmit} />
        </section>
        <section className="section">
          <button
            className="button"
            onClick={this.refreshData}
            type="submit"
          >
            Refresh Data
          </button>
          <CurrencyList currency={this.state.currency} handleDelete={this.handleDelete} />
        </section>
      </section>
    );
  }
}

export default App;
