import React from 'react';
import playersList from '../playerData.js';

export default function Manager(props) {

  const [budget, setBudget] = React.useState(
    function() {
      let starting = props.isHeader === "true" ? "Budget" : 300
      return starting
    }
  )
  function buyPlayer() {
    setBudget(budget-playersList.data.players[props.currentPlayerRef].price)
    props.handle()
  }

  return (
    <div className="record">
      <div>{props.name}</div>
      <div>{budget}</div>
      <div>{props.buyed}</div>
      {props.isHeader == "false" && <div onClick={buyPlayer}><div className="buy-trigger">+</div></div>}
    </div>
  )
}
