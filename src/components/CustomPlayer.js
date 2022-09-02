import React from 'react';
import config from '../config.js'

export default function CustomPlayer(props) {

  let record = props.player
  const [selectedManager, setSelectedManager] = React.useState('')
  const [selectedBet, setSelectedBet] = React.useState('')
  /*const [currentBid, setCurrentBid] = React.useState('')
  const [currentManager, setCurrentManager] = React.useState('')
  React.useEffect(() => {
    setCurrentBid(props.currentPlayer.prezzo_base);
  }, [props.currentPlayer.prezzo_base])

  React.useEffect(() => {
    setCurrentManager(props.managers[0].id);
  }, [props.managers[0].id])

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
              console.log(data)
              props.handleBuy(data.data.extracted)
          })
  }*/
  let playerManager
  playerManager = props.managers.filter(function(manager) {
        return record.manager === manager.id
  })
  playerManager = playerManager[0]
  console.log(playerManager)
  return(<div className="custom-selected-player">
            <div className="custom-selected-player-name">
              {record.nome}
            </div>
            <div className="custom-selected-player-team">
              {record.squadra}
            </div>
            {record.buyed ?
              <div className="custom-selected-player-manager">
                {playerManager.nome + ' (' + record.payed + ') '}
              </div>
              : ''
            }
            <div className="custom-selected-player-action">
               <form>
                 {!record.buyed ?
                    <select name="selectedManager"
                            value={selectedManager}
                    >
                      {props.managers.map(
                        (manager) => <option key={manager.id} value={manager.id}>
                                        {manager.nome}
                                     </option>
                      )}
                    </select>   
                  : '' }
                  {!record.buyed ?
                    <input name="selectedBet"
                           type="tel"
                           value={selectedBet}
                    />  
                  : '' }
                  <input type="submit"
                         value={record.buyed ? 'Svincola' : 'Acquista'}
                  />
               </form>
            </div>
         </div>
  )
}