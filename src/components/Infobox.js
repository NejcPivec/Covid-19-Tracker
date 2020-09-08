import React from "react";
import "../style/Infobox.css";

import { Card, CardContent } from "@material-ui/core";

const Infobox = ({
  title,
  cases,
  total,
  icon,
  active,
  isRed,
  isGreen,
  ...props
}) => {
  return (
    <Card
      onClick={props.onClick}
      className={`infobox ${active && "infobox-selected"} ${
        isRed && "infobox-red"
      } ${isGreen && "infobox-green"}`}
    >
      <CardContent>
        <h3 className={`infobox-title`}>{title}</h3>

        <span className="today">Today cases:</span>
        <h2
          className={`infobox-cases ${isRed && "infobox-cases-red"} ${
            isGreen && "infobox-cases-green"
          }`}
        >
          + {cases}
        </h2>

        <span className="total-cases">Total cases:</span>
        <p className={`infobox-total`}>+ {total}</p>
      </CardContent>
      <div className="right">
        <i className={icon}></i>
      </div>
    </Card>
  );
};

export default Infobox;
