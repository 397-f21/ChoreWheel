import { deleteData } from "../firebase";
import { Dropdown } from "react-bootstrap";
import './dropdown.css';


const deleteTask = ( aptId, userId, taskId ) => {
  if (window.confirm("Are you sure you want to delete this task?")) {
    deleteData(`apartments/${aptId}/tasks/${taskId}`);
    deleteData(`apartments/${aptId}/users/${userId}/tasks/${taskId}`);
  }
};

const Task = ({ aptId, userId, task, children }) => {
    const currDate = new Date();
    currDate.setDate(currDate.getDate() + task.daysRemaining);
  
    return (
    <div key={ task.id } 
        className={`card m-2 p-2 col-lg-8 mx-auto ${ task.completed ? 'border-success bg-success bg-opacity-25': task.daysRemaining === 0 ? 'border-warning bg-warning bg-opacity-25' : task.daysRemaining < 0 ? 'border-danger bg-danger bg-opacity-25':'border-dark'}`} 
        style={{borderWidth: '4px'}} >
      <div className="d-flex justify-content-between align-items-center">
        <div className="card-body">
          <div className="card-title">
            <b>Task:</b> { task.title }
          </div>
          <div className="card-text">
            <b>Due:</b> { currDate.toDateString() }
          </div>
        </div>
        
        { children }

        <Dropdown className="align-self-start dropdown-toggle">
          <Dropdown.Toggle variant="outline-secondary" 
              style={{border: 'none', fontWeight: '900'}} 
              id="dropdown-basic" 
              size="sm">
            &#x00b7;&#x00b7;&#x00b7;
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={ () => deleteTask(aptId, userId, task.id) }>Delete Task</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
    );
  };

export default Task