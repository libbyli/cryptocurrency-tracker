import React from 'react';

const CurrencyListEntry = ({ entry }) => (
  <tr>
    <td>{entry.name}</td>
    <td>{entry.price}</td>
  </tr>
);


export default CurrencyListEntry;
