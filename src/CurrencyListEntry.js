import React from 'react';

const CurrencyListEntry = ({ entry, handleDelete }) => (
  <tr>
    <td>{entry.name}</td>
    <td>{entry.price}</td>
    <td><a className="delete is-small" onClick={() => handleDelete(entry.name)}> </a></td>
  </tr>
);


export default CurrencyListEntry;
