import React from "react";
import "../style/Table.css";
import { numberConfig } from "../util";

const Table = ({ tableData }) => {
  return (
    <div className="table">
      {tableData.map((singleCountry, index) => (
        <tr key={index}>
          <td>{singleCountry.country}</td>
          <td>
            <strong>{numberConfig(singleCountry.cases)}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
};

export default Table;
