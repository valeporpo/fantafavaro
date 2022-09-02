import React from 'react'
import Player from './Player'
import CustomSelector from './CustomSelector'
import config from '../config.js'

export default function MainContent() {

    const [player, setPlayer] = React.useState({})
    const [players, setPlayers] = React.useState({})
    const [managers, setManagers] = React.useState([{}])
    const [status, setStatus] = React.useState('begin')

    React.useEffect(retrievePlayer, [0])
    React.useEffect(retrievePlayers, [0])
    React.useEffect(retrieveManagers, [0])

    // Recupera il giocatore corrente
    function retrievePlayer() {
        fetch(`${config.apiBase}retrieve_player?token=${config.apiToken}`)
          .then(res => res.json())
          .then(function(data) {
             switch(data.status) {
               case 'something went wrong':
                  setStatus(data.error)
                  break;
               case 'success':
                  setStatus(data.position)
                  switch(data.position) {
                     case 'begin':
                        setPlayer({})
                        break;
                     default:
                        setPlayer(data.data)
                  }
                  break;
               default:
                  setStatus('error')
             }
          })
    }

    function retrievePlayers() {
      fetch(`${config.apiBase}get_players?token=${config.apiToken}&mode=all`)
        .then(res => res.json())
        .then(function(data) {
           if(data.status == 'success') {
              setPlayers(data.data)
           }
        })
  }

    // Recupera tutti gli allenatori
    function retrieveManagers() {
        fetch(`${config.apiBase}retrieve_managers?token=${config.apiToken}`)
          .then(res => res.json())
          .then(function(data) {
             setManagers(data.data)
          })
    }

    // Torna indietro
    function extractPlayer() {
        let ordineEstrazione = status == 'begin' ? 0 : player.ordine_estrazione
        fetch(`${config.apiBase}extract_player?
               token=${config.apiToken}&order_position=${ordineEstrazione}`)
          .then(res => res.json())
          .then(function(data) {
             switch(data.status) {
               case 'something went wrong':
                  setStatus(data.error)
                  break;
               case 'success':
                  setStatus(data.position)
                  switch(data.position) {
                     case 'begin':
                        setPlayer({})
                        break;
                     default:
                        setPlayer(data.data)
                  }
                  break;
               default:
                  setStatus('error')
             }
          })
    }

    // Estrai o vai avanti
    function unextractPlayer() {
        fetch(`${config.apiBase}unextract_player?token=${config.apiToken}&order_position=${player.ordine_estrazione}`)
          .then(res => res.json())
          .then(function(data) {
            switch(data.status) {
              case 'something went wrong':
                 setStatus(data.error)
                 break;
              case 'success':
                 setStatus(data.position)
                 switch(data.position) {
                    case 'begin':
                       setPlayer({})
                       break;
                    default:
                       setPlayer(data.data)
                 }
                 break;
              default:
                 setStatus('error')
            }
           })
    }

    function handleBuy(ordineEstrazione) {
        ordineEstrazione = ordineEstrazione-1
        retrieveManagers()
        fetch(`${config.apiBase}extract_player?
               token=${config.apiToken}&order_position=${ordineEstrazione}`)
          .then(res => res.json())
          .then(function(data) {
             switch(data.status) {
               case 'something went wrong':
                  setStatus(data.error)
                  break;
               case 'success':
                  setStatus(data.position)
                  switch(data.position) {
                     case 'begin':
                        setPlayer({})
                        break;
                     default:
                        setPlayer(data.data)
                  }
                  break;
               default:
                  setStatus('error')
             }
          })
    }

    return (
        <div className="main">
            <Player currentPlayer={player}
                    status={status}
                    handleForward={extractPlayer}
                    handleBackward={unextractPlayer}
                    handleBegin={extractPlayer}
                    handleBuy={handleBuy}
                    managers={managers}
            />
            <CustomSelector players={players}
                            managers={managers}
            />            
        </div>
    )
}
