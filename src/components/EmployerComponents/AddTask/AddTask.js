
import Button from 'react-bootstrap/Button';

import TaskModal from '../../TaskModal/TaskModal';
import useModal from "../../../hooks/useModal";

import "./AddTask.scss"





const AddTask = ({changeTaskAdded}) => {

    const{isShowModal, toggleModal, Modal} = useModal();


    return ( 
        <>
            <Button variant="primary" className="btn_add" onClick={toggleModal}>Добавить задание...</Button>
            {isShowModal ? <TaskModal 
            Modal = {Modal} 
            changeTaskAdded = {changeTaskAdded} 
            changeShowModal = {toggleModal} /> : null}
        </>

    )

}

export default AddTask;