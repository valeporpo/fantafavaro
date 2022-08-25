import React from 'react';

export default function Form(props) {
    const [playerPrice, setPlayerPrice] = React.useState(props.startingPrice)
    
    function handlePriceInput(event) {
        let newValue = event.target.value >= 0 ? event.target.value : 0
        setPlayerPrice(newValue) 
    }

    function handleSubmit(event) {
        event.preventDefault()
        console.log(playerPrice + props.managerName + props.playerId)
    }

    return(
        <form onSubmit={handleSubmit} className="buy-form">
           <input 
               type="number"
               name="bid"
               value={playerPrice}
               onChange={handlePriceInput} 
           />
           <button

               className="buy-trigger"
               onClick={props.submit}
           >
            +
           </button> 
        </form>
    )
}