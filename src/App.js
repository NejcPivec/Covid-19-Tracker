import React, { useState, useEffect } from "react";
import "./App.css";
import { numberConfig, sortData } from "./util";

import Infobox from "./components/Infobox";
import Table from "./components/Table";
import Graph from "./components/Graph";

import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";

function App() {
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [table, setTable] = useState([]);

  // Worldwide data
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((res) => res.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  // Get countries information - Samo da lahko dropDown nardimo
  useEffect(() => {
    const getCountryInformation = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const countires = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          const sortedData = sortData(data);

          setTable(sortedData);
          setCountries(countires);
        });
    };
    getCountryInformation();
  }, []);

  // Changing countri from dropdown
  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
      });
  };

  return (
    <div className="app">
      <div className="app-left">
        {/* Navbar */}
        <div className="navbar">
          <h1>Covid-19 Tracker</h1>
          <FormControl variant="outlined" className="app-dropdown">
            <Select value={country} onChange={onCountryChange}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country, index) => (
                <MenuItem key={index} value={country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="infobox-stats">
          <Infobox
            isRed
            active={casesType === "cases"}
            onClick={(e) => setCasesType("cases")}
            title="Covid-19 Cases"
            cases={numberConfig(countryInfo.todayCases)}
            total={numberConfig(countryInfo.cases)}
            icon="fas fa-viruses"
          />
          <Infobox
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={numberConfig(countryInfo.todayDeaths)}
            total={numberConfig(countryInfo.deaths)}
            icon="fas fa-skull-crossbones"
          />
          <Infobox
            isGreen
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={numberConfig(countryInfo.todayRecovered)}
            total={numberConfig(countryInfo.recovered)}
            icon="fas fa-heartbeat"
          />
        </div>

        <div className="graph">
          <h2 className="graph-title">Worldwide new {casesType}</h2>
          <Graph className="graph-line" casesType={casesType} />
        </div>
      </div>

      <Card className="app-right">
        <CardContent>
          <h2 className="table-name">Live Cases by Country</h2>
          <Table tableData={table} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
