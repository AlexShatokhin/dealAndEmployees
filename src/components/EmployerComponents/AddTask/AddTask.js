import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';

import { toggleTaskAdded } from '../EmployerSlice';
import "./AddTask.scss"
import useDealApi from '../../../hooks/deal-api.hook';

const AddTask = () => {

    const [titleValue, setTitleValue] = useState("");
    const [taskInformation, setTaskInformation] = useState("");
    const dispatch = useDispatch();
    const {setDeal} = useDealApi();

    function addTask(){
        setDeal({title: titleValue, information: taskInformation})
        .then(() => dispatch(toggleTaskAdded()))
        .catch(err => console.log(err))
        
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

            <Button 
                disabled = {titleValue === "" || taskInformation === ""} 
                onClick={addTask} 
                className="add_new_task-button">Добавить задание!</Button>
        </div>

    )

}

export default AddTask;