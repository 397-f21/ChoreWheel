import {Modal} from 'react-bootstrap';



const createTask = () => {
    
}

const validateForm = () => {
    const taskName = document.querySelector('#taskName').value;
    const assignedUser = document.querySelector('#assignUser').value;
    const interval = document.querySelector('#interval').value;
    const dueDate = document.querySelector('#dueDate').value;
    const date = new Date(dueDate.slice(0,4), Number(dueDate.slice(5,7))-1, dueDate.slice(8)); console.log(date);


}

const AddTask = ({show, handleClose,users}) =>  (
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
            <option disabled>Choose a user</option>
            {users.map(user => <option value={user.id} key={user.id}> {user.name} </option>)}
          </select>
        </div>
        <div className="form-group p-2">
          <label htmlFor="interval">Repeat interval:</label>
          <input className="form-control" id="interval" type="number" min="1" step="1" pattern="\d+" placeholder="How often the task should rotate"/>
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
      <button className='btn btn-primary' onClick={validateForm}>
        Save Changes
      </button>
    </Modal.Footer>
  </Modal>
)



export default AddTask