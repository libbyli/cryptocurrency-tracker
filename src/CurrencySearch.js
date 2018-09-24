import React, { Component } from 'react';

class CurrencySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toSearch: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      toSearch: event.target.value.toUpperCase(),
    });
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
          onClick={() => this.props.handleSubmit(this.state.toSearch)}
          type="submit"
        >
          Add to List
        </button>
      </div>
    );
  }
}

export default CurrencySearch;
