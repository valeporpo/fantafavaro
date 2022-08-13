import playersList from '../managerData.js';
import Manager from './Manager';
export default function Log(props) {
    const managers = playersList.data.managers
    //console.log(managers)
    return (
        <div className="log">
         <Manager currentPlayerRef={props.currentPlayerRef} isHeader="true" name="Allenatore" credits="Milioni" buyed="Giocatori"/>
         {managers.map((manager) => <Manager handle={props.handle} currentPlayerRef={props.currentPlayerRef} key={manager.id} isHeader="false" name={manager.name} credits="300" buyed="0"/>)}

        </div>
    )
}
