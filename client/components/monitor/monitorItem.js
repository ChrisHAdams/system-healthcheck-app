import React, { Component } from 'react';

//const MonitorItem = (props) => (

//  <div className="monitor-item pt-callout pt-intent-primary">
//    <h3 className="pt-callout-title">{props.item.name}</h3>
//    <h5>{props.item.description}</h5>
//    <p>Check Type: {props.item.checkType}</p>
//    <p>Expected Status : {props.item.expectedResults.expectedStatusCode}</p>
//    <p>Max Response Time (ms) : {props.item.expectedResults.expectedResponseTime}</p>
//  </div>
//
//)



function MonitorItem (props) {

  let style = "monitor-item pt-callout ";
  let actualStatus = "";
  let actualResponseTime = "";
  let statusCheck = "";
  let overallResult = "";
  let intent = " pt-intent-primary";
  let responseTimeCheck = "";

  if(props.item.responseDetails){
    actualStatus = "Actual Status : " + props.item.responseDetails.responseCode;
    statusCheck = "Status Check Result : " + props.item.responseDetails.responseCodeCheck.toUpperCase();
    actualResponseTime = "Actual Response Time (ms) : " + props.item.responseDetails.responseTime;
    responseTimeCheck = "Response Time Check : " + props.item.responseDetails.responseTimeCheck.toUpperCase();

    if (props.item.responseDetails.responseCodeCheck === 'Pass' &&
      (props.item.responseDetails.responseTimeCheck === 'Pass')){
        intent = " pt-intent-success";

    } else if(props.item.responseDetails.responseTimeCheck === 'Fail'){
      intent = " pt-intent-warning";

    } else if (props.item.responseDetails.responseCodeCheck === 'Fail'){
      intent = " pt-intent-danger";

    }
  }

  style += intent;

  return(
    <div className={style}>
      <h3 className="pt-callout-title">{props.item.name}</h3>
      <h5>{props.item.description}</h5>
      <p>Check Type: {props.item.checkType}</p>
      <table style={{ width: '100%' }}>
        <tbody>
          <tr>
            <td style={{width: '33.33%'}}><p>Expected Status : {props.item.expectedResults.expectedStatusCode}</p></td>
            <td style={{width: '33.33%'}}><p>{actualStatus}</p></td>
            <td style={{width: '33.33%'}}><p>{statusCheck}</p></td>
          </tr>
          <tr>
            <td><p>Max Response Time (ms) : {props.item.expectedResults.expectedResponseTime}</p></td>
            <td><p>{actualResponseTime}</p></td>
            <td><p>{responseTimeCheck}</p></td>
          </tr>
        </tbody>
      </table>
    </div>
  );

}

export default MonitorItem