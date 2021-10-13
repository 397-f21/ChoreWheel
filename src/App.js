import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useData, setData } from './firebase';
import { FaDharmachakra } from 'react-icons/fa';
import ApartmentLogin from './components/ApartmentLogin';
import ApartmentTaskList from './components/ApartmentTaskList';
import UserTaskList from './components/UserTaskList';
import UserButtonGroup from './components/UserButtonGroup';

import {Modal} from 'react-bootstrap';

const getTask = (taskId, apt) => (
  apt.tasks[taskId]
);


function App() {
  const [aptId, setApt] = useState();
  const [user, setUser] = useState('');  
  const [data, loading, error] = useData(`/apartments`);
  const [show, setShow] = useState(false);

  if (error) return <h1>{ error }</h1>;
  if (loading) return <h1>Loading the tasks...</h1>;

  if (!aptId) return <ApartmentLogin onFinish={ setApt } aptKeys={ Object.keys(data) } />;

  const apt = data[aptId];
  const userData = apt.users[user];
  const updateTask = (taskID) => {
    setData(`/apartments/${aptId}/users/${user}/tasks/${taskID}`, !userData.tasks[taskID])
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <div className='navbar navbar-light bg-light'>
        <div className='container-fluid'>
          <span className='navbar-brand justify-content-bottom'>
            <FaDharmachakra size="1.7em" style={{color: '#d4af37', marginTop: '-.4em'}} />
            <span className="h2 fw-bold"> 
              ChoreWheel 
            </span>
          </span>
        </div>
      </div>

      <div className='container pt-2' >
        <UserButtonGroup 
            currUser={ user } 
            users={ [{id:'', name:'Full Apartment',highlight:false}, ...Object.values(apt.users).map(user => ({id:user.id, name:user.name,highlight:Object.keys(user.tasks).some(taskId => apt.tasks[taskId].daysRemaining === 0) }))] } 
            setUser={ setUser } />

        <button onClick={handleShow}>
          Create Task
        </button>
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header>
            <Modal.Title>Add Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div class="form-group p-2">
                <label for="exampleFormControlInput1">Task:</label>
                <input class="form-control" id="exampleFormControlInput1" placeholder="Task name" maxLength={50} />
              </div>
              <div className="form-group p-2">
                <label htmlFor="exampleFormControlSelect1">Assign to:</label>
                <select className="form-select" id="exampleFormControlSelect1">
                  <option disabled>Choose a user</option>
                  <option>user 1</option>
                  <option>user 2</option>
                  <option>user 3</option>
                  <option>user 4</option>
                  <option>user 5</option>
                </select>
              </div>
              <div className="form-group p-2">
                <label htmlFor="exampleFormControlSelect2">Repeat interval:</label>
                <input className="form-control" type="number" min="1" step="1" pattern="\d+" placeholder="How often the task should rotate"/>
              </div>
              <div className="form-group p-2">
                <label htmlFor="exampleFormControlSelect2">First due date:</label>
                <input className="form-control" type="date" onChange={(ev) => {const date = new Date(ev.target.value.slice(0,4), Number(ev.target.value.slice(5,7))-1, ev.target.value.slice(8)); console.log(date);}}/>
              </div>
              
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button className='btn btn-secondary' onClick={handleClose}>
              Close
            </button>
            <button className='btn btn-primary' onClick={handleClose}>
              Save Changes
            </button>
          </Modal.Footer>
        </Modal>
        { user ?  (
          <UserTaskList 
            tasks={ Object.keys(userData.tasks).map(taskId => ({...getTask(taskId, apt), completed:userData.tasks[taskId]})) } 
            updateTask={ updateTask}  />
        ) : (
          <ApartmentTaskList 
            users={ apt.users } 
            tasks={ apt.tasks }
          />
        ) }
      </div >
    </div>
    
  );
}

/* <h2 className='text-center'>Hi {userData.name}, your tasks are </h2>  */

export default App;