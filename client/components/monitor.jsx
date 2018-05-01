import React, { Component } from 'react';
import MonitorItemContainer from './monitor/monitorItemContainer';

class Monitor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {monitorItems: []};
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