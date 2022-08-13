import React from 'react';
import Player from './Player';
import Log from './Log';
import playersList from '../playerData.js';

export default function MainContent() {

    const [id, setId] = React.useState(
        function() {
            let randomInt = Math.floor(Math.random() * (Object.keys(playersList.data.players).length))
            return randomInt
        }
    )
    const [playerStatus, setPlayerStatus] = React.useState('available')

    function changeTest() {
       let randomInt = Math.floor(Math.random() * (Object.keys(playersList.data.players).length))
       setId(randomInt)
       markAsAvailable()
    }

    function markAsBuyed() {
        setPlayerStatus('buyed')
    }

    function markAsAvailable() {
        setPlayerStatus('available')
    }

    return (
        <div className="main">
            <Player status={playerStatus} currentPlayerRef={id} sold="true" handle={changeTest}/>
            <Log status={playerStatus} currentPlayerRef={id} handle={markAsBuyed}/>
        </div>
    )
}
