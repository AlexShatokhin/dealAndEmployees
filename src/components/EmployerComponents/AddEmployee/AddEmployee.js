import Button from 'react-bootstrap/Button';
import useModal from "../../../hooks/useModal";
import EmployeeModal from "../../EmployeeModal/EmployeeModal";

const AddEmployee = ({changeEmployeeAdded}) => {

    const {toggleModal, isShowModal} = useModal()

    return ( 
        <>
            <Button variant="primary" className="btn_add" onClick={toggleModal}>Добавить работника...</Button>
            {isShowModal ? 
            <EmployeeModal changeEmployeeAdded = {changeEmployeeAdded} /> : null}
        </>
    )

}

export default AddEmployee;