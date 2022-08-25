import React from 'react';

export default function Form(props) {
    const [playerPrice, setPlayerPrice] = React.useState(props.startingPrice)
    
    function handlePriceInput(event) {
        let newValue = event.target.value >= 0 ? event.target.value : 0
        setPlayerPrice(newValue) 
    }

    return(
        <form className="buy-form">
           <input 
               type="number"
               name="bid"
               value={playerPrice}
               onChange={handlePriceInput} 
           />
           <input 
               type="hidden"
               name="id"
               value={props.playerId}
           />
           <input
               type="submit"
               name="submit"
               className="buy-trigger"
               onClick={props.submit}
               value="+"
           />
        </form>
    )
}