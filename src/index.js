import React from "react";
import ReactDOM from "react-dom";
import './index.css'
import './index.less'

const App = () => {
  return (
    <div>
      <h1 className='header-h1 less-h1'>Hello React and Webpack (HMR)...</h1>{" "}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
if (module.hot) {
  module.hot.accept(err => {
    if (err) {
      console.error("Cannot apply HMR update.", err);
    }
  });
}
