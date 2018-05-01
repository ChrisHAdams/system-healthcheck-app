import React, { Component } from 'react';
import { Link} from 'react-router-dom';


class NavBar extends Component {
  render() {
    return(
      <div id="menuContainer" className="container">
        <nav className="pt-navbar">
          <div className="pt-navbar-group pt-align-left">
            <div className="pt-navbar-heading"><a href="/">Application Healthcheck Monitor</a></div>
          </div>
          <div className="pt-navbar-group pt-align-right">
            <button className="pt-button pt-minimal pt-icon-home"><Link to="/list">List Items</Link></button>
            <button className="pt-button pt-minimal pt-icon-document"><Link to="/history">History</Link></button>
            <span className="pt-navbar-divider"></span>
            <button className="pt-button pt-minimal pt-icon-user"></button>
            <button className="pt-button pt-minimal pt-icon-notifications"></button>
            <button className="pt-button pt-minimal pt-icon-cog"></button>
          </div>
        </nav>
      </div>

    );
  }
}

export default NavBar;