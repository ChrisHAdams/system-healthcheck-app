import React from "react";
import ReactDOM from "react-dom";
import { Link, Route, Switch } from 'react-router-dom';
import Menu from "./components/common/menu.jsx"
import Monitor from "./components/monitor.jsx";
import List from  "./components/list.jsx";
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import './monitor-styles.css';


const History = () => (
  <div>
    <h2>History</h2>
    <br/>
    <h4>Check the history of an item being monitored.</h4>
  </div>
)

const App = () => {
  return (
    <div className="wrapper">
      <div className="header">
      <Menu />
      <br />
      </div>
      <div className="content">
        <div className="columns">
          <div className="main">
            <Route exact={true} path="/" component={Monitor}/>
            <Route exact={true} path="/list" component={List}/>
            <Route exact={true} path="/history" component={History}/>
          </div>

          <div className="aside aside-1">

          </div>
          <div className="aside aside-2">

          </div>
        </div>
      </div>
    </div>
  );

};

export default App;
