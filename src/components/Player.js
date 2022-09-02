import React from 'react';
import Buyer from './Buyer'

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

    return (
        <div className={`player-card`}>
            <div className={`player-name`}>
                {props.status != 'begin' ? props.currentPlayer.nome : '???'}
                {props.status != 'begin' ?
                <small>
                  {'   (' + props.currentPlayer.ordine_estrazione+'/'+props.players.length+')'}
                </small> : ''}
                
            </div>
            <div className={`player-info-container ${!(props.status == 'begin') && props.currentPlayer.buyed == true ? 'buyed' : ''}`}>
                <div className='player-team'>
                  <div className={`player-buyed-sign`}>
                    Venduto !
                  </div>
                  <img src={props.status != 'begin' ? `loghi/${!(props.status == 'begin') && props.currentPlayer.squadra}.png` : `default-user-image.png`}
                      className="team-logo"
                  />
                </div>
                <div className='player-statistics'>
                  <div className={props.status != 'begin' ? `player-role` : ''}>
                    {props.status != 'begin' ? props.currentPlayer.ruolo.split(',').map((role) => <span className={setRoleClass(role)}>{role}</span>) : ''}
                  </div>
                  <div className={props.status != 'begin' ? 'player-price' : ''}>
                    <span>
                      {props.status != 'begin' ? props.currentPlayer.prezzo_base : 'Chi sarà il primo estratto?'}
                    </span>
                  </div>
                  <div className={props.currentPlayer.buyed ? 'player-buyer hidden' : 'player-buyer'}>
                    {props.status != 'begin' ? <Buyer currentPlayer={props.currentPlayer}
                                                      handleBuy={props.handleBuy}
                                                      managers={props.managers}
                                                      refresh={props.refresh}
                  /> : ''}
                  </div>
                </div>
            </div>
            <div className="extractor">
                <div
                   className={`extractor-backward ${props.status != 'begin' && props.currentPlayer.ordine_estrazione != 1 ? '': 'hidden-button'}`}
                   onClick={props.handleBackward}>
                  <span>Torna indietro</span>
                </div>
                <div
                   className={`extractor-forward ${props.status != 'begin' && props.status != 'last' ? '': 'hidden-button'}`}
                   onClick={props.handleForward}>
                  <span>
                    {(props.status == 'middle last extracted' || props.status == 'begin') ? 'Estrai' : ''}
                    {props.status == 'middle not last extracted' ? 'Vai avanti' : ''}
                  </span>
                </div>
                <div
                   className={`extractor-forward ${props.status != 'begin' ? 'hidden-button' : ''}`}
                   onClick={props.handleBegin}>
                  <span>Inizia l'asta</span>
                </div>
            </div>
        </div>
        

  )
}
