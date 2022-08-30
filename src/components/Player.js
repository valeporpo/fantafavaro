import React from 'react';

export default function Player(props) {

    function setRoleClass(role) {

      if(role == "Por") {
        return "player-role-goalkeeper"
      } else if(role == "Dc" || role == "Dd" || role == "Ds") {
        return "player-role-defender"
      } else if(role == "M" || role == "C" || role == "E") {
        return "player-role-midfielder"
      } else if(role == "T" || role == "W") {
        return "player-role-wing"
      } else if(role == "A" || role == "Pc") {
        return "player-role-forward"
      }
    }

    let anonimousPlayer = typeof(props.currentPlayer) == 'undefined' || Object.keys(props.currentPlayer).length <= 0
    return (
        <div className={`player-card`}>
            <div className={`player-name`}>
                {!anonimousPlayer ? props.currentPlayer.nome : '???'}
            </div>
            <div className={`player-info-container ${!anonimousPlayer && props.currentPlayer.buyed == true ? 'buyed' : ''}`}>
                <div className='player-team'>
                  <div className={`player-buyed-sign`}>
                    Venduto !
                  </div>
                  <img src={!anonimousPlayer ? `loghi/${!anonimousPlayer && props.currentPlayer.squadra}.png` : `default-user-image.png`}
                      className="team-logo"
                  />
                </div>
                <div className='player-statistics'>
                  <div className={!anonimousPlayer ? `player-role` : ''}>
                    {!anonimousPlayer ? props.currentPlayer.ruolo.split(',').map((role) => <span className={setRoleClass(role)}>{role}</span>) : ''}
                  </div>
                  <div className='player-price'>
                    <span>
                      {!anonimousPlayer ? props.currentPlayer.prezzo_base : ''}
                    </span>
                  </div>
                </div>
            </div>
            <div className="extractor">
                <div
                   className={`extractor-backward ${!anonimousPlayer && props.currentPlayer.ordine_estrazione != 1 ? '': 'hidden-button'}`}
                   onClick={props.handleBackward}>
                  <span>Torna indietro</span>
                </div>
                <div
                   className={`extractor-forward ${!anonimousPlayer ? '': 'hidden-button'}`}
                   onClick={props.handleForward}>
                  <span>{props.isLast ? 'Estrai' : 'Vai avanti'}</span>
                </div>
                <div
                   className={`extractor-forward ${!anonimousPlayer ? 'hidden-button' : ''}`}
                   onClick={props.handleBegin}>
                  <span>Inizia l'asta</span>
                </div>
            </div>
        </div>
        

  )
}
