import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useData, setData } from './firebase';
import { FaDharmachakra } from 'react-icons/fa';
import ApartmentLogin from './ApartmentLogin';


const Task = ({ task, updateTask }) => {
  const currDate = new Date();
  currDate.setDate(currDate.getDate() + task.daysRemaining);

  return (
  <div className={`card m-2 p-2 col-lg-8 mx-auto ${task.completed ? 'border-success bg-success bg-opacity-25': task.daysRemaining === 0 ? 'border-warning bg-warning bg-opacity-25' : 'border-dark'}`} style={{borderWidth: '4px'}} key={task.id}>
    <div className="d-flex justify-content-between align-items-center">
      <div className={'card-body'}>
        <div className="card-title"><b>Task:</b> {task.title}</div>
        <div className="card-text"><b>Due:</b> {currDate.toDateString()}</div>
      </div>
      <div /*className="form-switch"*/>
        <input className="form-check-input" type="checkbox" defaultChecked={task.completed} value={task.completed} id="flexCheckDefault"
        onChange={ () => updateTask(task.id) }/>
      </div>
    </div>
  </div>
  );
};


const TaskList = ({ tasks, updateTask }) => (
  <div>
    {Object.values(tasks).map( (task, idx) => <Task key={idx} task={task} updateTask={updateTask} />)}
  </div>
);

const UserList = ({currUser, users, setUser}) => (
  <div className="container text-center">
    {users.map((user, idx) => <UserButton user={user} selected={user.id === currUser}setUser={setUser} key={idx}/>)}
  </div>
  
)

const UserButton = ({user, selected, setUser}) => (
  <button type="button" 
      className={`btn m-2 ${selected ? 'btn-primary' : 'btn-outline-primary'}`}
      disabled={selected}
      onClick={() => setUser(user.id)}> 
    {user.name} 
  </button>
)

const getTask = (taskId, apt) => (
  apt.tasks[taskId]
);

function App() {
  const [aptId, setApt] = useState();
  const [data, loading, error] = useData(`/apartments`);
  const [user, setUser] = useState('idU0');  
  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the tasks...</h1>;
  if (!aptId) return <ApartmentLogin onFinish = {setApt}/>;
  const apt = data[aptId];
  const userData = apt.users[user];
  const updateTask = (taskID) => {
    setData(`/apartments/${aptId}/users/${user}/tasks/${taskID}`, !userData.tasks[taskID])

  }
 
  

  return (
    <div>
      <div className='navbar navbar-light bg-light'>
        <div className='container-fluid'>
          <span className='navbar-brand justify-content-bottom'>
            <FaDharmachakra size="1.7em" style={{color: '#d4af37', marginTop: '-.4em'}}/>
            <span className="h2 fw-bold"> ChoreWheel </span>
          </span>
        </div>
      </div>

      <div className='container pt-2' >
        <h2 className='text-center'>Hi {userData.name}, your tasks are </h2>
        <TaskList 
            tasks={Object.keys(userData.tasks).map( taskID => ({...getTask(taskID, apt), completed:userData.tasks[taskID]}))} 
            updateTask={updateTask} />
        <UserList 
            currUser={user} 
            users={Object.values(apt.users)} 
            setUser={setUser} />
      </div >
    </div>
    
  );
}

export default App;