
import "./TaskInformation.scss"

const TaskInformation = ({deal}) => {
    return (
        <div className="task_information-wrapper">
            <div className="task_info-title">{deal.title}</div>
            <hr />
            <div className="task_info-content">{deal.information}</div>
        </div>
    )

}

export default TaskInformation;