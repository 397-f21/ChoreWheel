import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useData, setData } from './firebase';
import ApartmentManagement from './apartments/ApartmentManagement';
import ApartmentTaskList from './components/ApartmentTaskList';
import UserTaskList from './components/UserTaskList';
import UserButtonGroup from './components/UserButtonGroup';
import AddTask from './components/TaskManagement';
import AddUser from './components/UserManagement';
import {BiBuildingHouse} from 'react-icons/bi';

const getTask = (taskId, apt) => (
  apt.tasks[taskId]
);


function App() {
  const [aptId, setApt] = useState();
  const [user, setUser] = useState('');
  const filterList = (lst) => Object.fromEntries(Object.entries(lst).filter(([key, val]) => (key !== "-1" )));
  const filterAptData = (aptData) => Object.fromEntries(Object.entries(aptData).map(([key, val]) => [key, filterList(val)]));
  const filterData = (data) => Object.fromEntries(Object.entries(data).map(([aptKey, aptData]) => [aptKey, filterAptData(aptData)]));
  const [data, loading, error] = useData(`/apartments`, filterData);
  const [show, setShow] = useState(false);
  const [showUserAdd, setShowUserAdd] = useState(false);
  

  if (error) return <h1>{ error }</h1>;
  if (loading) return <h1>Loading...</h1>;
  
  if (!aptId) return <ApartmentManagement onFinish={ setApt } aptKeys={ Object.keys(data) } />;

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
      <h1 className="text-center">
        <BiBuildingHouse/>
        { aptId }
      </h1>

      <UserButtonGroup currUser={ user } 
          users={ [{id:'', name:'Full Apartment',highlight:false}, ...Object.values(apt.users).map(user => ({id:user.id, name:user.name,highlight:user.tasks && Object.keys(user.tasks).some(taskId => apt.tasks[taskId].daysRemaining === 0) }))] } 
          setUser={ setUser } > 
        <button className="btn btn-success fw-bold m-2" onClick={handleShow}>
          Add Task
        </button>
        <button className="btn btn-success fw-bold m-2" onClick={handleAddUserShow}>
          Add User
        </button>
      </UserButtonGroup>

      <AddTask show={show} 
          handleClose={handleClose} 
          users={Object.values(apt.users)} 
          aptId ={aptId} />
      <AddUser show={showUserAdd} 
          handleClose={handleAddUserClose} 
          aptId ={aptId} />

      <div className='row justify-content-center'>
        <div className='card p-2 col-3 col-lg-2 m-1 border-success bg-success bg-opacity-25 text-center' style={{borderWidth: '4px'}}>
          <div>Complete</div>
        </div> 
        <div className='card p-2 col-3 col-lg-2 m-1 border-warning bg-warning bg-opacity-25 text-center' style={{borderWidth: '4px'}}>
          Due now
        </div>
        <div className='card p-2 col-3 col-lg-2 m-1 border-danger bg-danger bg-opacity-25 text-center' style={{borderWidth: '4px'}}>
          Overdue  
        </div>
      </div>

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
              tasks={ apt.tasks }/>
        ) 
      }
    </div>
  );
}

export default App;