import React, { Component } from 'react';

class CurrencySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toSearch: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      toSearch: event.target.value,
    });
    console.log('searching :', this.state.toSearch)
  }

  handleSubmit = () => {
    if (this.props.allCurrency.includes(this.state.toSearch)) {
      console.log(this.state.toSearch)
    }
  }

  render() {
    return (
      <div className="container">
        <input
          className="input"
          onChange={event => this.handleChange(event)}
          type="text"
        />
        <button
          className="button"
          onClick={this.handleSubmit}
          type="submit"
        >
          Add to List
        </button>
      </div>
    );
  }
}

export default CurrencySearch;
