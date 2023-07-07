import { useState } from 'react';
import Button from 'react-bootstrap/Button';

import useData from '../../../services/getData';

import "./AddTask.scss"

const AddTask = ({changeTaskAdded}) => {

    const [taskValue, setTaskValue] = useState("");
    const {setDeal} = useData()

    function addTask(){
        setDeal({title: taskValue});
        setTaskValue("");
        changeTaskAdded();
    }

    function changeTaskValue(e){
        setTaskValue(e.target.value);
    }

    return ( 
        <div className="add_new_task">
            <input 
            placeholder="Введите задание..." 
            value={taskValue} 
            onChange={changeTaskValue} 
            type="text" 
            className="add_new_task-input" />
            
            <Button onClick={addTask} className="add_new_task-button">Добавить задание!</Button>
        </div>

    )

}

export default AddTask;