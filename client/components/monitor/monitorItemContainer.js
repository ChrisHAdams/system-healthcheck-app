import React, { Component } from 'react';
import MonitorItem from './monitorItem';

//function ListItem(props) {
  // Correct! There is no need to specify the key here:
//  return <li>{props.item.name} - {props.item.description}</li>;
//}


function MonitorItemContainer(props) {
console.log(props.monitorItems);
  const listItems = props.monitorItems.map((item) =>
    // Correct! Key should be specified inside the array.

    <MonitorItem key={item.key}
                 item={item} />

  );

  return (
    <div>

      {listItems}

    </div>
  );
}

export default MonitorItemContainer;