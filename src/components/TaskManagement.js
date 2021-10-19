import {Modal} from 'react-bootstrap';
import { updateData, getRefByPush, updateDataByPath} from '../firebase';

const createTask = async ( task, aptId, userID ) => {
  try {
    const taskRef = getRefByPush(`/apartments/${aptId}/tasks`);
    const taskKey = taskRef.key;
    task = ({...task, 'id':taskKey});
   // taskRef.push(task);
    updateData(taskRef, task);

    updateDataByPath(`/apartments/${aptId}/users/${userID}/tasks`, {[taskKey] : false});

  } catch (error) {
    alert(error);
  }
}

const validateForm = (aptId, handleClose) => {
    const taskName = document.querySelector('#taskName').value;
    const assignedUser = document.querySelector('#assignUser').value;
    const interval = document.querySelector('#interval').value;
    const dueDateVal = document.querySelector('#dueDate').value;
    
    if (taskName === ''){
      alert('Please enter a name for the task')
      return
    }
    if (assignedUser === ''){
      alert('Please choose a user')
      return
    }
    if (dueDateVal === ''){
      alert('Please pick a valid date')
      return
    }
    const dueDate = new Date(dueDateVal.slice(0,4), Number(dueDateVal.slice(5,7))-1, dueDateVal.slice(8));
    const currDate = new Date(Date.now());
    dueDate.setHours(0, 0, 0, 0)
    currDate.setHours(0,0, 0, 0)
    if (dueDate <  currDate){
      alert('Please pick a valid date')
      return
    }
    if (interval === ''){
      alert('Please enter positive whole number')
      return
    }

    const daysRemaining = Number((dueDate - currDate) / (1000 * 3600 * 24));

    const intervalNum = Number(interval)

    if (intervalNum < 1 || !Number.isInteger(intervalNum) ){
      alert('Please enter positive whole number')
      return
    }

    const task =  { 
                    "daysRemaining": daysRemaining,
                    "interval": intervalNum,
                    "title": taskName
                  }

    createTask(task, aptId, assignedUser);
    handleClose();
}

const AddTask = ({show, handleClose,users, aptId}) =>  (
    <Modal show={show} onHide={handleClose} animation={false}>
    <Modal.Header>
      <Modal.Title>Add Task</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form>
        <div class="form-group p-2">
          <label for="taskName">Task:</label>
          <input class="form-control" id="taskName" placeholder="Task name" maxLength={50} />
        </div>
        <div className="form-group p-2">
          <label htmlFor="assignUser">Assign to:</label>
          <select className="form-select" id="assignUser">
            <option value="" disabled selected hidden>Choose a user</option>
            {users.map(user => <option value={user.id} key={user.id}> {user.name} </option>)}
          </select>
        </div>
        <div className="form-group p-2">
          <label htmlFor="interval">Repeat interval:</label>
          <div className="input-group">
            <input className="form-control" id="interval" type="number" min="1" step="1" pattern="\d+" placeholder="Repeat every ____ days"/>
            <span class="input-group-text" id="basic-addon2">days</span>
          </div>
          
        </div>
        <div className="form-group p-2">
          <label htmlFor="dueDate">First due date:</label>
          <input className="form-control" id="dueDate" type="date"/>
        </div>
        
      </form>
    </Modal.Body>
    <Modal.Footer>
      <button className='btn btn-secondary' onClick={handleClose}>
        Close
      </button>
      <button className='btn btn-primary' onClick={() => validateForm(aptId, handleClose)}>
        Save Changes
      </button>
    </Modal.Footer>
  </Modal>
)



export default AddTask