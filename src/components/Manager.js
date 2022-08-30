import React from 'react';
import Form from './Form';

export default function Manager(props) {

  return (
    <div className="record">
      <div>{props.isHeader === "true" ? "Nome" : (props.data.nome)}</div>
      <div>{props.isHeader === "true" ? "Budget" : (400 - props.data.spesa)}</div>
      <div>{props.isHeader === "true" ? "Giocatori" : props.data.giocatori}</div>
      <div>
      {props.isHeader == "true" && "Compra"}
      {props.isHeader == "false" && <Form
                                        manager={props.data}
                                        player={props.currentPlayer}
                                        handleBuy={props.handleBuy}
                                    />
      }
      </div>
      
    </div>
  )
}
