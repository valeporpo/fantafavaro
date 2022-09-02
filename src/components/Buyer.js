import React from 'react';
import config from '../config.js'

export default function Buyer(props) {
  const [currentBid, setCurrentBid] = React.useState('')
  const [currentManager, setCurrentManager] = React.useState('')
  React.useEffect(() => {
    setCurrentBid(props.currentPlayer.prezzo_base);
  }, [props.currentPlayer.prezzo_base])

  React.useEffect(() => {
    setCurrentManager(props.managers[0].id);
  }, [props.managers[0].id])

  function handlePriceChange(event) {
      setCurrentBid(event.target.value)
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
              console.log(data)
              props.handleBuy(data.data.extracted)
              props.refresh()
          })
  }
  return(
    <form onSubmit={handleSubmit}>
        <div className='form-data-handlers'>
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
                  (manager) => <option key={manager.id} value={manager.id}>
                                {manager.nome}
                              </option>
                )
              }
          </select>
        </div>
        <div className='form-data-submit'>
          <input type="submit"
                name="submit"
                value="Compra"
          /> 
        </div>    
    </form>
  )
}