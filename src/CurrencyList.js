import React from 'react';
import CurrencyListEntry from './CurrencyListEntry';

const CurrencyList = ({ currency, handleDelete, newDisplay }) => (
  <div className="container">
    <table className="table">
      <thead>
        <tr>
          <th>Currency</th>
          <th>Current Price (in {newDisplay})</th>
        </tr>
      </thead>
      <tbody>
        {currency.map(entry =>
          <CurrencyListEntry
            entry={entry}
            handleDelete={handleDelete}
            key={entry.name}
          />
        )}
      </tbody>
    </table>
  </div>
);

export default CurrencyList;
