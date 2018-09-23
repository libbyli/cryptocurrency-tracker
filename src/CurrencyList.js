import React from 'react';

const CurrencyList = ({ currency }) => {
  return (
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
}

export default CurrencyList;
