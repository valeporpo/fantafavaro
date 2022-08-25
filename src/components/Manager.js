import React from 'react';
import playersList from '../playerData.js';
import Form from './Form';

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
      <div>
      {props.isHeader == "true" && "Compra"}
      {props.isHeader == "false" && <Form
                                        submit={buyPlayer}
                                        managerName={props.name}
                                        playerId={props.currentPlayerRef}
                                        startingPrice={playersList.data.players[props.currentPlayerRef].price}
                                    />
      }
      </div>
      
    </div>
  )
}
