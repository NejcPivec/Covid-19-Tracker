import numeral from "numeral";

// Format numbers
const numberConfig = (num) => (num ? `${numeral(num).format("0.0a")}` : "0");

// Sort from biggest to smallest
const sortData = (data) => {
  return [...data].sort((a, b) => b.cases - a.cases);
};

// Sort from smallest to biggest
/* const sortData = (data) => {
  return [...data].sort((a, b) => a.cases - b.cases);
}; */

export { numberConfig, sortData };
