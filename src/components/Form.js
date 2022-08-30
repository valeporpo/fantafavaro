import React from 'react'
import config from '../config.js'

export default function Form(props) {

    let prezzoBase = typeof(props.player) == 'undefined' ? '' : props.player.prezzo_base
    const [playerPrice, setPlayerPrice] = React.useState(prezzoBase)

    // Gestisce il cambiamento del valore numerico nell'input
    function handlePriceInput(event) {
        let minimum = props.player.prezzo_base, bid = event.target.value
        let newValue = bid >= minimum ? bid : minimum
        setPlayerPrice(newValue)
    }

    // Gestisce l'invio del form
    function handleSubmit(event) {
        event.preventDefault()
        if(Object.keys(props.player).length > 0) {
            fetch(`${config.apiBase}buy_player?
                   token=${config.apiToken}&internal_id=${props.player.id}
                   &manager_id=${props.manager.id}&payed=${playerPrice}`)
                .then(res => res.json())
                .then(function(data) {
                    props.handleBuy()
                })
        }
    }

    return(
        typeof(props.player) == 'undefined' || !props.player.buyed ?     
        <form onSubmit={handleSubmit} className="buy-form">
            <input 
                type="number"
                name="bid"
                value={playerPrice}
                onChange={handlePriceInput} 
            />
            <button
                className="buy-trigger"
            >
             +
            </button> 
         </form> : ''
    )
}