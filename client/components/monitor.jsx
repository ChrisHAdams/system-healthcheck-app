import React, { Component } from 'react';
import MonitorItemContainer from './monitor/monitorItemContainer';
import {runMonitor} from './common/serviceCalls.js';

class Monitor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {monitorItems: []};
  }

  componentDidMount() {

    runMonitor()
      .then(result => this.setState({monitorItems:result}));

  }

  render() {
    return(
      <div>
        <h2>Monitor Component</h2>
        <br />
        <MonitorItemContainer monitorItems={this.state.monitorItems}/>
      </div>
    );
  }
}

export default Monitor;