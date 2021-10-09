import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useData, setData } from './firebase';
import { FaDharmachakra } from 'react-icons/fa';
import ApartmentLogin from './ApartmentLogin';


const Task = ({ task, updateTask }) => {
  const currDate = new Date();
  currDate.setDate(currDate.getDate() + task.daysRemaining);

  return (
  <div key={task.id} 
      className={`card m-2 p-2 col-lg-8 mx-auto ${ task.completed ? 'border-success bg-success bg-opacity-25': task.daysRemaining === 0 ? 'border-warning bg-warning bg-opacity-25' : 'border-dark'}`} 
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
      <div /*className="form-switch"*/>
        <input type="checkbox"
            className="form-check-input"  
            defaultChecked={task.completed} 
            value={task.completed} id="flexCheckDefault"
            onChange={ () => updateTask(task.id) } />
      </div>
    </div>
  </div>
  );
};


const TaskList = ({ tasks, updateTask }) => (
  <div>
    {
      Object.values(tasks).map((task, idx) => <Task key={idx} task={task} updateTask={updateTask} />)
    }
  </div>
);

const UserList = ({ currUser, users, setUser }) => (
  <div className="container text-center">
    {
      users.map((user, idx) => (
        <UserButton key={idx}
            user={user} 
            selected={user.id === currUser}
            setUser={setUser} />
      ))
    }
  </div>
  
)

const UserButton = ({ user, selected, setUser }) => (
  <button type="button" 
      className={`btn m-2 ${selected ? 'btn-primary' : 'btn-outline-primary'}`}
      disabled={ selected }
      onClick={ () => setUser(user.id) }> 
    { user.name } 
  </button>
)

const getTask = (taskId, apt) => (
  apt.tasks[taskId]
);

const ApartmentTaskList = ({ users, tasks, updateTask }) => (
  <div>
    {
      Object.values(users).map( (user, idx) => (
        Object.keys(user.tasks).map( (taskId, taskIdx) => (
          <Task key={`${idx}-${taskIdx}`} 
              task={{...tasks[taskId], completed:user.tasks[taskId]}} 
              updateTask={updateTask} />
        ))
      ))
    }
  </div>
)

function App() {
  const [aptId, setApt] = useState();
  const [user, setUser] = useState('');  
  const [data, loading, error] = useData(`/apartments`);
  if (error) return <h1>{ error }</h1>;
  if (loading) return <h1>Loading the tasks...</h1>;

  if (!aptId) return <ApartmentLogin onFinish={ setApt } aptKeys={ Object.keys(data) } />;

  const apt = data[aptId];
  const userData = apt.users[user];
  const updateTask = (taskID) => {
    setData(`/apartments/${aptId}/users/${user}/tasks/${taskID}`, !userData.tasks[taskID])
  };

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
        { user ?  (
          <TaskList 
            tasks={ Object.keys(userData.tasks).map(taskId => ({...getTask(taskId, apt), completed:userData.tasks[taskId]})) } 
            updateTask={ updateTask}  />
        ) : (
          <ApartmentTaskList 
            users={ apt.users } 
            tasks={ apt.tasks }
            updateTask={ updateTask } />
        ) }
        <UserList 
            currUser={ user } 
            users={ [{id:'', name:'Full Apartment'}, ...Object.values(apt.users)] } 
            setUser={ setUser } />
      </div >
    </div>
    
  );
}

/* <h2 className='text-center'>Hi {userData.name}, your tasks are </h2> */

export default App;