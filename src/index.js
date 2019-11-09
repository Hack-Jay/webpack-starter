import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import defaultImg from './assets/img/default.png'
import './index.css'
import './index.less'

const App = () => {
  const [count , setCount] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setCount(count => count + 1)
    }, 3000)
  }, [])
  return (
    <div>
      <h1 className='header-h1 less-h1'>Hello React and Webpack (HMR)...{count}
        <img src={ defaultImg } />
      </h1>
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
