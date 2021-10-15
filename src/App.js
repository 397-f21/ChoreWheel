import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useData, setData } from './firebase';
import ApartmentLogin from './components/ApartmentLogin';
import ApartmentTaskList from './components/ApartmentTaskList';
import UserTaskList from './components/UserTaskList';
import UserButtonGroup from './components/UserButtonGroup';
import AddTask from './components/TaskManagement';
import AddUser from './components/UserManagement';

const getTask = (taskId, apt) => (
  apt.tasks[taskId]
);


function App() {
  const [aptId, setApt] = useState();
  const [user, setUser] = useState('');  
  const [data, loading, error] = useData(`/apartments`);
  const [show, setShow] = useState(false);
  const [showUserAdd, setShowUserAdd] = useState(false);
  

  if (error) return <h1>{ error }</h1>;
  if (loading) return <h1>Loading the tasks...</h1>;

  if (!aptId) return <ApartmentLogin onFinish={ setApt } aptKeys={ Object.keys(data) } />;

  const apt = data[aptId];
  const userData = apt.users[user];
  const updateTask = (taskID) => {
    setData(`/apartments/${aptId}/users/${user}/tasks/${taskID}`, !userData.tasks[taskID])
  };

  const handleClose = () => setShow(false); //this is for task
  const handleShow = () => setShow(true);

  const handleAddUserClose = () => setShowUserAdd(false);
  const handleAddUserShow = () => setShowUserAdd(true);

  return (
    
      <div className='container pt-2' >
        
        <UserButtonGroup 
            currUser={ user } 
            users={ [{id:'', name:'Full Apartment',highlight:false}, ...Object.values(apt.users).map(user => ({id:user.id, name:user.name,highlight:user.tasks && Object.keys(user.tasks).some(taskId => apt.tasks[taskId].daysRemaining === 0) }))] } 
            setUser={ setUser } > 
              <button className="btn btn-success fw-bold m-2" style={{}} onClick={handleShow}>
                Add Task
              </button>
              <button className="btn btn-success fw-bold m-2" style={{}} onClick={handleAddUserShow}>Add User</button>
        </UserButtonGroup>
        <AddTask show={show} handleClose={handleClose} users={Object.values(apt.users)} aptId ={aptId} />
        <AddUser show={showUserAdd} handleClose={handleAddUserClose} aptId ={aptId} />
        { user ?  (
          <UserTaskList 
            aptId={ aptId }
            userId={ user }
            tasks={ !(userData.tasks) ? [] :  Object.keys(userData.tasks).map(taskId => ({...getTask(taskId, apt), completed:userData.tasks[taskId]})) } 
            updateTask={ updateTask } />
        ) : (
          <ApartmentTaskList 
            aptId={ aptId }
            users={ apt.users } 
            tasks={ apt.tasks }
          />
        ) }
      </div >
    
  );
}

export default App;