import React from 'react';
import config from '../config.js'

export default function CustomPlayer(props) {

  let record = props.player
  const [selectedManager, setSelectedManager] = React.useState('')
  const [selectedBet, setSelectedBet] = React.useState('')

  let startingPrice = ''
  if(Object.keys(record).length !== 0) {
    startingPrice = record.prezzo_base;
  }
  
  React.useEffect(() => {
      if(Object.keys(record).length !== 0) {
        setSelectedBet(startingPrice);
      }
  }, [startingPrice])
  

  React.useEffect(() => {
    setSelectedManager(props.managers[0].id);
  }, [props.managers[0].id])

  function handleBet(event) {
    console.log(event.target.value)
    setSelectedBet(event.target.value)
  }

  function handleManager(event) {
    console.log(event.target.value)
    setSelectedManager(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    if(!props.player.buyed) {
      fetch(`${config.apiBase}buy_player?
            token=${config.apiToken}&internal_id=${record.id}
            &manager_id=${selectedManager}&payed=${selectedBet}`)
      .then(res => res.json())
      .then(function(data) {
          console.log(data)
          props.refresh()
      })
    } else {
      fetch(`${config.apiBase}rollback_player?
            token=${config.apiToken}&internal_id=${record.id}`)
      .then(res => res.json())
      .then(function(data) {
          console.log(data)
          props.refresh()
      })
    }
    

  }

  let playerManager
  playerManager = props.managers.filter(function(manager) {
        console.log(manager.id)
        return record.manager == manager.id
  })
  console.log(playerManager)

  return(<div className={'custom-selected-player ' + (record.payed ? 'custom-selected-player-buyed' : 'custom-selected-player-unbuyed')}>
            <div className="custom-selected-player-name">
              {record.nome}
            </div>
            <div className="custom-selected-player-team">
              {record.squadra}
            </div>
            {record.buyed ?
              <div className="custom-selected-player-manager">
                {playerManager[0].nome + ' (' + record.payed + ') '}
              </div>
              : ''
            }
            <div className="custom-selected-player-action">
               <form onSubmit={handleSubmit}>
                 {!record.buyed ?
                    <select name="selectedManager"
                            value={selectedManager}
                            onChange={handleManager}
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
                           type="number"
                           value={selectedBet}
                           onChange={handleBet}
                    />  
                  : '' }
                  <button>
                    {record.buyed ? <span>&#10008;</span> : <span>&#10003;</span>}
                  </button>
               </form>
            </div>
         </div>
  )
}