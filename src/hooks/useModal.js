import { useState } from "react";

const useModal = () => {

    const [isShowModal, setIsShowModal] = useState(false);

    function toggleModal(){
        setIsShowModal(!isShowModal);

    }

    function Modal(props){
        return (
            <div onClick={(e)=>{return e.target.classList.contains("popup")? toggleModal() : null}} className="popup">
            <div className="popup_content">
                <div onClick={toggleModal} className="close_btn">&#10010;</div>
    
                {props.children}
            </div>
    
        </div>
        )
    }

    return {isShowModal, setIsShowModal, toggleModal, Modal}

}

export default useModal