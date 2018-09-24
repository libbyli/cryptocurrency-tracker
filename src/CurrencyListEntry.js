import React from 'react';

const CurrencyListEntry = ({ entry, handleDelete }) => (
  <tr>
    <td>{entry.name}</td>
    <td>
      <div className="columns">
        <div className="column">
          {entry.price}
        </div>
        <div className="column" align="right">
          {entry.name === 'BTC' || entry.name === 'ETH'
            ? null 
            : <a className="delete is-small" onClick={() => handleDelete(entry.name)}> </a>}
        </div>
      </div>
    </td>
  </tr>
);


export default CurrencyListEntry;
