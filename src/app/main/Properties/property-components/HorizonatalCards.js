import React from "react";
import "./ShowMore.css";
import { Paper } from "@mui/material";
import map from "lodash/map";
import range from "lodash/range";

const HorizonatalCards = () => {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <div style={{ width: "1%", overflow: "auto", display: "flex" }}>
        {map(range(10), _ => (
          <Container />
        ))}
      </div>
    </div>
  )
}

const Container = () => {
    return (
      <div style={{ height: "2300px", width: "514px", margin: "16px" }}>
        <Paper style={{ height: "100%", width: "514px" }}>Hello</Paper>
      </div>
    );
  };

export default HorizonatalCards