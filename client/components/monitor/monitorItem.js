import React, { Component } from 'react';

const MonitorItem = (props) => (

  <div className="monitor-item pt-callout pt-intent-primary">
    <h3 className="pt-callout-title">{props.item.name}</h3>
    <h5>{props.item.description}</h5>
    <p>Check Type: {props.item.checkType}</p>
    <p>Expected Status : {props.item.expectedResults.expectedStatusCode}</p>
    <p>Max Response Time (ms) : {props.item.expectedResults.expectedResponseTime}</p>
  </div>

)

//<p>Expected Status : {props.item.expectedResults.expectedStatusCode}</p>
//<p>Expected Max response time: {props.item.expectedResults.expectedResponseTime}</p>
export default MonitorItem