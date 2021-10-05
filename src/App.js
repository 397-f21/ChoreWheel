import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

const apartmentDB = {
  "apartments": {
    "idA0": {
      "taskIdCounter": 8,
      "tasks": {
        "idT0": {
          "id" : "idT0",
          "title": "Cleaning Kitchen",
          "interval": 4,
          "daysRemaining": 2
        },
        "idT1": {
          "id" : "idT1",
          "title": "Cleaning washroom",
          "interval": 3,
          "daysRemaining": 1
        },
        "idT2": {
          "id" : "idT2",
          "title": "Checking mail",
          "interval": 3,
          "daysRemaining": 1
        },
        "idT3": {
          "id" : "idT3",
          "title": "Taking trash out",
          "interval": 3,
          "daysRemaining": 1
        },
        "idT4": {
          "id" : "idT4",
          "title": "Cleaning dishes",
          "interval": 3,
          "daysRemaining": 1
        },
        "idT5": {
          "id" : "idT5",
          "title": "get groceries",
          "interval": 3,
          "daysRemaining": 1
        },
        "idT6": {
          "id" : "idT6",
          "title": "Cleaning stovetop",
          "interval": 3,
          "daysRemaining": 1
        },
        "idT7": {
          "id" : "idT7",
          "title": "vacuum floor",
          "interval": 3,
          "daysRemaining": 0
        },
      },
      "userIdCounter": 0,
      "users": {
        "idU0": {
          "name": "sathu",
          "id" : "idU0",
          "tasks": {
            "idT1" : true,
            "idT0" : true
           }
        },
        "idU1": {
          "name": "Caspar",
          "id" : "idU1",
          "tasks": {
            "idT0" : false,
            "idT7" : false
          }
        },
        "idU2": {
          "id" : "idU2",
          "name": "Jun Li",
          "tasks": {
             "idT2" : true
          }
        },
        "idU3": {
          "id" : "idU3",
          "name": "Omar",
          "tasks": {
            "idT3" :  true
          }
        },
        "idU4": {
          "id" : "idU4",
          "name": "Spencer",
          "tasks": {
             "idT4" : true
          }
        },
        "idU5": {
          "id" : "idU5",
          "name": "Yifei",
          "tasks": {
            "idT5" : true
          }
        },
      }
    }
  }
}

const Task = ({ task, updateTask }) => {
  const currDate = new Date();
  currDate.setDate(currDate.getDate() + task.daysRemaining);

  return (
  <div className={`card m-2 p-2 col-lg-8 ${task.daysRemaining === 0 && 'border-warning'}`} style={{backgroundColor: task.completed? 'lightgreen' : 'white'}} key={task.id}>
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

const UserList = ({users, setUser}) => (
  <div>
    {Object.values(users).map((user, idx) => <UserButton user={user} setUser ={setUser} key={idx}/>)}
  </div>
)

const UserButton = ({user, setUser}) => (
  <button type="button" className="btn btn-primary m-2"
  onClick={() => setUser(user.id)}> {user.name} </button>
)

const getTask = (taskId, apt) => (
  apt.tasks[taskId]
);

function App() {
  const [apt, setApt] = useState(apartmentDB.apartments.idA0);
  const [user, setUser] = useState('idU0');

  const userData = apt.users[user];
  const updateTask = (taskID) => {
    const newApt = {...apt};
    newApt.users[userData.id].tasks[taskID] = !newApt.users[userData.id].tasks[taskID];
    setApt(newApt);
  }


  return (
    <div className='container' >
      <h1 > Hi {userData.name}, your tasks are </h1>
      <TaskList tasks={Object.keys(userData.tasks).map( taskID => ({...getTask(taskID, apt), completed:userData.tasks[taskID]}))} updateTask={updateTask} />
      <UserList users={apt.users} setUser={setUser} />
    </div >
  );
}

export default App;