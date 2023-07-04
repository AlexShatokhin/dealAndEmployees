import { useState } from "react";
import { Button } from "react-bootstrap";

const useModal = () => {

    const [showModal, setShowModal] = useState(false);

    const changeShowModal = () => {
        setShowModal(!showModal);
    }

    const Modal = (props) => {


        return (
            <div onClick={(e)=>{return e.target.classList.contains("popup")? changeShowModal() : null}} className="popup">
                <div className="popup_content">
                    <div onClick={changeShowModal} className="close_btn">&#10010;</div>
                    {props.children}
                </div>
    
            </div>
        )
    }

    return {Modal, showModal};
    
}

export default useModal;

const AddTask = ({changeTaskAdded}) => {

    const [showModal, setShowModal] = useState(false);

    const changeShowModal = () => {
        setShowModal(!showModal);
    }

    return ( 
        <>
            <Button variant="primary" className="btn_add" onClick={changeShowModal}>Добавить задание...</Button>
            {showModal ? <Modal changeTaskAdded = {changeTaskAdded} changeShowModal = {changeShowModal} /> : null}
        </>

    )

}

const Modal = (props) => {


    return (
        <div onClick={(e)=>{return e.target.classList.contains("popup")? props.changeShowModal() : null}} className="popup">
            <div className="popup_content">
                <div onClick={props.changeShowModal} className="close_btn">&#10010;</div>
                {props.children}
            </div>

        </div>
    )
}
