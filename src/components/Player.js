import React from 'react';
import playersList from '../playerData.js';

export default function Player(props) {
    /*const [roleClass, setRoleClass] = React.useState("player-role-forward")
    const [player, setPlayer] = React.useState(
      {
        "name" : playersList.data.players[0].name,
        "price" : playersList.data.players[0].price,
        "role" : playersList.data.players[0].role,
        "team" : playersList.data.players[0].team,
      }
    )

    function getRoleClass(role) {

      if(role == "P") {
        return "player-role-goalkeeper"
      } else if(role == "DC" || role == "TS" || role == "TD") {
        return "player-role-defender"
      } else if(role == "M" || role == "CC" || role == "E") {
        return "player-role-midfielder"
      } else if(role == "T" || role == "W") {
        return "player-role-wing"
      } else {
        return "player-role-forward"
      }
    }
    function changePlayer() {
      let randomInt = Math.floor(Math.random() * (playersList.data.players.length))
      let selectedPlayer = playersList.data.players[randomInt]
      let classToRender = getRoleClass(selectedPlayer.role)

      setPlayer(
        {
        "name" : selectedPlayer.name,
        "price" : selectedPlayer.price,
        "role" : selectedPlayer.role,
        "team" : selectedPlayer.team,
      })
      setRoleClass(classToRender)

    }*/
    /*return (
        <div className="player-card" onMouseOver={props.handle}>
            <div className="player-name">
                {player.name}{props.test}
            </div>
            <div className="player-team">
                <img src={`loghi/${player.team}.png`} className="team-logo"/>
                <br />
                <span className='player-price'>{player.price}</span>M, <div className={`player-role ${roleClass}`}>{player.role}</div>
            </div>
            <div className="extractor">
                <div className="extractor-backward">
                  <span>Torna indietro</span>
                </div>
                <div className="extractor-forward" onClick={changePlayer}>
                  <span>Estrai</span>
                </div>
            </div>
        </div>
    )*/
    function setRoleClass(role) {

      if(role == "P") {
        return "player-role-goalkeeper"
      } else if(role == "DC" || role == "TS" || role == "TD") {
        return "player-role-defender"
      } else if(role == "M" || role == "CC" || role == "E") {
        return "player-role-midfielder"
      } else if(role == "T" || role == "W") {
        return "player-role-wing"
      } else {
        return "player-role-forward"
      }
    }
    return (
      <div className={`player-card ${props.status}`}>
          <div className="player-name">
              {playersList.data.players[props.currentPlayerRef].name}
          </div>
          <div className="player-team">
              <img src={`loghi/${playersList.data.players[props.currentPlayerRef].team}.png`} className="team-logo"/>
              <br />
              <span className='player-price'>
                {playersList.data.players[props.currentPlayerRef].price}
              </span>
              M,
              <div className={`player-role ${setRoleClass(playersList.data.players[props.currentPlayerRef].role)}`}>
                {playersList.data.players[props.currentPlayerRef].role}
              </div>
          </div>
          <div className="extractor">
              <div className="extractor-backward">
                <span>Torna indietro</span>
              </div>
              <div className="extractor-forward" onClick={props.handle}>
                <span>Estrai</span>
              </div>
          </div>
      </div>
  )
}
