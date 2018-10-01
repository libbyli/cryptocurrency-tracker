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
      allPrices: 'USD,JPY,EUR',
      currencyToSearch: '',
      currency: [],
      notFound: false,
      priceDisplayCurrency: 'USD',
      newDisplay: 'price',
      sortedAscending: false,
      userId: 1,
    };
  }

  handleCurrencySearch = (item) => {
    if (this.state.allCurrency.includes(item)) {
      axios.put(`/users/${this.state.userId}/currency`, {
        currency: item
      })
      .then(() => {
        axios.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${item}&tsyms=${this.state.priceDisplayCurrency}`)
          .then((response) => {
            const currencyToAdd = Object.keys(response.data);
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

  sortCurrency = (array) => {
    if (this.state.sortedAscending) {
      let sortedDescending = this.state.currency.sort((a, b) => {
        if (b.name < a.name) {
          return -1;
        }
        if (b.name > a.name) {
          return 1;
        }
        return 0;
      });
      this.setState({
        currency: sortedDescending,
        sortedAscending: false,
      });
    } else {
      let sortedCurrency = this.state.currency.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      this.setState({
        currency: sortedCurrency,
        sortedAscending: true,
      });
    }
  }

  changePriceDisplay = (name) => {
    this.setState({
      newDisplay: name,
    })
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

  handlePriceDisplayChange = (event) => {
    this.setState({
      priceDisplayCurrency: event.target.value.toUpperCase(),
    })
  }

  handlePriceDisplaySubmit = (currency) => {
    this.setState({
      newDisplay: currency,
    })
    this.refreshData();
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

        axios.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH${this.state.currencyToSearch}&tsyms=${this.state.allPrices}`)
          .then((response) => {
            const currencies = Object.keys(response.data);
            const currencyArray = [];
            currencies.forEach((currency) => {
              const currencyObj = {};
              currencyObj.name = currency;
              currencyObj.price = response.data[currency][this.state.priceDisplayCurrency];
              currencyObj.priceJPY = response.data[currency]['JPY'];
              currencyObj.priceEUR = response.data[currency]['EUR'];
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
          <CurrencySearch
            allCurrency={this.state.allCurrency}
            handleCurrencySearch={this.handleCurrencySearch} />
          <br />
          <div className="content">
            <p>Display the current price in:
              <input
                className="input price"
                onChange={event => this.handlePriceDisplayChange(event)}
                placeholder="currency name (e.g. EUR)"
                type="text"
              />
              <button
                className="button"
                onClick={() => this.handlePriceDisplaySubmit(this.state.priceDisplayCurrency)}
                type="submit"
              >
              Update
              </button>
            </p>
          </div>
        </section>
        <section className="section">
          <button
            className="button"
            onClick={this.refreshData}
            type="submit"
          >
            Refresh Data
          </button>
          <button
            className="button"
            onClick={() => this.changePriceDisplay('price')}
            type="submit"
          >
            Display in USD
          </button>
          <button
            className="button"
            onClick={() => this.changePriceDisplay('priceJPY')}
            type="submit"
          >
            Display in JPY
          </button>
          <button
            className="button"
            onClick={() => this.changePriceDisplay('priceEUR')}
            type="submit"
          >
            Display in EUR
          </button>
          <CurrencyList
            currency={this.state.currency}
            handleDelete={this.handleDelete}
            newDisplay={this.state.newDisplay}
            sortCurrency={this.sortCurrency}
          />
        </section>
      </section>
    );
  }
}

export default App;
