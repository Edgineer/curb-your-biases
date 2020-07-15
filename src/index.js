import React from "react";
import ReactDOM from "react-dom";
import Session from "./session.js";

class App extends React.Component {
  render() {
    return (
      <Session />
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
