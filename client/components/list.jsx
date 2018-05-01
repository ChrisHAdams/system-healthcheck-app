import React, { Component } from 'react';
import MonitorItemContainer from './monitor/monitorItemContainer';
import {loadMonitorItems} from './common/serviceCalls.js';

class List extends React.Component {

  constructor(props) {
    super(props);
    this.state = {monitorItems: []};
  }


  componentDidMount() {

    loadMonitorItems()
      .then(result => this.setState({monitorItems:result}));
    //this.setState({monitorItems:loadMonitorItems()});
    //console.log(items);
    //this.setState({monitorItems:items});
  }

  render() {
    return(
      <div>
        <h2>Monitor List</h2>
        <br />
        <h4>List of items being monitored</h4>
        <br />
        <MonitorItemContainer monitorItems={this.state.monitorItems}/>
      </div>
    );
  }
}

export default List;