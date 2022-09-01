import React from 'react';
import config from '../config.js'

export default function Buyer(props) {
  const [currentBid, setCurrentBid] = React.useState(props.currentPlayer.prezzo_base)
  const [currentManager, setCurrentManager] = React.useState(props.managers[0].id)
  React.useEffect(() => {
    setCurrentBid(props.currentPlayer.prezzo_base);
  }, [props.currentPlayer.prezzo_base])

  function handlePriceChange(event) {
    if(event.target.value >= props.currentPlayer.prezzo_base)
      setCurrentBid(event.target.value)
    else
      setCurrentBid(props.currentPlayer.prezzo_base)  
  }

  function handleManagerChange(event) {
      setCurrentManager(event.target.value)  
  }

  function handleSubmit(event) {
    event.preventDefault()

    fetch(`${config.apiBase}buy_player?
               token=${config.apiToken}&internal_id=${props.currentPlayer.id}
               &manager_id=${currentManager}&payed=${currentBid}`)
          .then(res => res.json())
          .then(function(data) {
              props.handleBuy()
          })
  }
  return(
    <form onSubmit={handleSubmit}>
        <input type="number"
               name="currentBid"
               value={currentBid}
               onChange={handlePriceChange}

        />
        <select name="currentManager"
                value={currentManager}
                onChange={handleManagerChange}
                >
            {
              props.managers.map(
                (manager) => <option key={manager.id} value={manager.id}>{manager.nome}</option>
              )
            }
        </select>
        <input type="submit"
               name="submit"
        />       
    </form>
  )
}