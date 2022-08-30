import React from 'react'
import Player from './Player'
import Log from './Log'
import Buyer from './Buyer'
import config from '../config.js'

export default function MainContent() {

    const [player, setPlayer] = React.useState({})
    const [managers, setManagers] = React.useState([{}])
    const [isLast, setIsLast] = React.useState(true)

    React.useEffect(retrievePlayer, [0])
    React.useEffect(retrieveManagers, [0])

    function retrievePlayer() {
        fetch("https://fantafavaro-api.herokuapp.com/index.php/retrieve_player?token=p6h72m0zd3j38uqer")
          .then(res => res.json())
          .then(function(data) {
            console.log(data)
             if(data.is_beginning) {
                setPlayer({})
             } else {
                setPlayer(data.data)
             }
          })
    }

    function retrieveManagers() {
        fetch("https://fantafavaro-api.herokuapp.com/index.php/retrieve_managers?token=p6h72m0zd3j38uqer")
          .then(res => res.json())
          .then(function(data) {
             setManagers(data.data)
          })
    }

    function extractPlayer() {
        let ordineEstrazione = typeof(player.ordine_estrazione) == 'undefined' ? 0 : player.ordine_estrazione
        fetch(`${config.apiBase}extract_player?
               token=${config.apiToken}&order_position=${ordineEstrazione}`)
          .then(res => res.json())
          .then(function(data) {
             console.log(data)
             setPlayer(data.data)
             setIsLast(data.is_last)
             retrieveManagers()
          })
    }

    function unextractPlayer() {
        fetch("https://fantafavaro-api.herokuapp.com/index.php/unextract_player?token=p6h72m0zd3j38uqer&order_position="+player.ordine_estrazione)
          .then(res => res.json())
          .then(function(data) {
            if(data.data == 'no records available') {
              setPlayer({})
            } else {
              setPlayer(data.data) 
              setIsLast(false)
              retrieveManagers()
            }
           })
    }

    function handleBuy() {
        retrieveManagers()
        retrievePlayer()

    }

    return (
        <div className="main">
            <Player currentPlayer={player}
                    isLast={isLast}
                    handleForward={extractPlayer}
                    handleBackward={unextractPlayer}
                    handleBegin={extractPlayer}
                    
                    
            />
            {Object.keys(player).length ? <Buyer currentPlayer={player}
                   handleBuy={handleBuy}
                   managers={managers}
            /> : ''}
            
        </div>
    )
}
