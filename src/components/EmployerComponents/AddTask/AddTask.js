import { useState } from 'react';
import Button from 'react-bootstrap/Button';

import useData from '../../../services/getData';

import "./AddTask.scss"

const AddTask = ({changeTaskAdded}) => {

    const [titleValue, setTitleValue] = useState("");
    const [taskInformation, setTaskInformation] = useState("");
    const {setDeal} = useData()

    function addTask(){
        setDeal({title: titleValue, information: taskInformation}).then(changeTaskAdded)
        setTitleValue("");
        setTaskInformation("");
    }

    function changeTitleValue(e){
        setTitleValue(e.target.value);
    }

    function changeTaskInformation(e){
        setTaskInformation(e.target.value);
    }

    return ( 
        <div className="add_new_task">
            <div className="inputs">

                <input 
                placeholder="Название задания..." 
                value={titleValue} 
                onChange={changeTitleValue} 
                type="text" 
                className="add_new_task-input add_new_task-title" />
                
                <textarea 
                placeholder="Подробная информация..." 
                value={taskInformation} 
                onChange={changeTaskInformation} 
                type="text" 
                className="add_new_task-input add_new_task-information" />

            </div>


            <Button disabled = {titleValue === "" || taskInformation === ""} onClick={addTask} className="add_new_task-button">Добавить задание!</Button>
        </div>

    )

}

export default AddTask;