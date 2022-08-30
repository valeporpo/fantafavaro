
import Manager from './Manager';
export default function Log(props) {

    return (
        <div className="log">
         <Manager
                  currentPlayer={props.currentPlayer}
                  key={-1}
                  isHeader="true"
                  data={{'id': 0, 'nome': 'Nome', 'spesa' : 0}}
                  credits="Milioni"
                  buyed="Giocatori"
                  
         />
         {
           props.managers.map((manager) =>
             <Manager
                      handleBuy={props.handleBuy}
                      currentPlayer={props.currentPlayer}
                      key={manager.id}
                      isHeader="false"
                      data={manager}
                      credits="400"
             />)
         }

        </div>
    )
}
