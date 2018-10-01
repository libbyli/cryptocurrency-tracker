import React, { Component } from 'react';

class CurrencySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      toSearch: '',
    };
  }

  handleCurrencyChange = (event) => {
    this.setState({
      toSearch: event.target.value.toUpperCase(),
    });
  }

  handleOnFocus = () => {
    this.setState({
      isFocused: true,
    });
  }

  handleOnBlur = () => {
    this.setState({
      isFocused: false,
    })
  }

  render() {
    return (
      <div className="container">
        <input
          className="input"
          onBlur={this.handleOnBlur}
          onChange={event => this.handleCurrencyChange(event)}
          onFocus={this.handleOnFocus}
          type="text"
        />
        {this.state.isFocused && <div className="search">
          {this.props.allCurrency.map(currency => {
            return <div key={currency} onClick={() => this.props.handleCurrencySearch(currency)}>{currency}</div>
          })}
        </div>}
        <button
          className="button"
          onClick={() => this.props.handleCurrencySearch(this.state.toSearch)}
          type="submit"
        >
          Add to List
        </button>
      </div>
    );
  }
}

export default CurrencySearch;
