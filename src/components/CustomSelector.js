import React from 'react';
import CustomPlayer from './CustomPlayer'

export default function CustomSelector(props) {
  
  const [selection, setSelection] = React.useState('')  
  console.log(props)
  function handleChange(event) {
    let string = event.target.value
    let newFilter = ""
    for(let i=0; i < string.split("").length; i++) {
        if(i == 0 || string.split("")[i-1] == " ") {
            newFilter += string.split("")[i].toUpperCase()
        } else {
            newFilter += string.split("")[i]
        }
    }
    setSelection(newFilter)
}

  let playersToDisplay 
  if(Object.keys(props.players).length !== 0) {
    playersToDisplay = props.players.filter(
        function(player) {
            
            let isPlayerNameBegin = player.nome.substr(0, selection.length) == selection
            let isTeamNameBegin = player.squadra.substr(0, selection.length) == selection
            let isExtracted = player.ordine_estrazione != 0
            return (isPlayerNameBegin || isTeamNameBegin) && selection.length > 2 && isExtracted 
        }
    )
  } else {
    playersToDisplay = []
  }

  console.log(playersToDisplay)

  return(
    <div className="custom-selector">
        <p>Vuoi cercare un giocatore già estratto?</p>
        <form >
            <input type="text"
                   name="playerName"
                   onChange={handleChange}

            />   
        </form>
        {playersToDisplay.map(
            (player) => <CustomPlayer player={player}
                                      managers={props.managers}
                                      refresh={props.refresh}
            />
        )}
    </div>
    
  )
}