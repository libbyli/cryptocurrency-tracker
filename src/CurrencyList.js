import React from 'react';
import CurrencyListEntry from './CurrencyListEntry';

const CurrencyList = ({ currency }) => (
  <div className="container">
    <table className="table">
      <thead>
        <tr>
          <th>Currency</th>
          <th>Current Price (in USD)</th>
        </tr>
      </thead>
      <tbody>
        {currency.map(entry =>
        <CurrencyListEntry entry={entry} key={entry} />
        )}
      </tbody>
    </table>
  </div>
)

export default CurrencyList;
