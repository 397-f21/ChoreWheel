import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useData, setData } from './firebase';
import { FaDharmachakra } from 'react-icons/fa';
import ApartmentLogin from './ApartmentLogin';
import ApartmentTaskList from './components/ApartmentTaskList';
import UserTaskList from './components/UserTaskList';
import UserButtonGroup from './components/UserButtonGroup';

const getTask = (taskId, apt) => (
  apt.tasks[taskId]
);


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
          <UserTaskList 
            tasks={ Object.keys(userData.tasks).map(taskId => ({...getTask(taskId, apt), completed:userData.tasks[taskId]})) } 
            updateTask={ updateTask}  />
        ) : (
          <ApartmentTaskList 
            users={ apt.users } 
            tasks={ apt.tasks }
          />
        ) }
        <UserButtonGroup 
            currUser={ user } 
            users={ [{id:'', name:'Full Apartment'}, ...Object.values(apt.users)] } 
            setUser={ setUser } />
      </div >
    </div>
    
  );
}

/* <h2 className='text-center'>Hi {userData.name}, your tasks are </h2>  */

export default App;