import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

const apartmentDB = {
  "apartments": {
    "idA0": {
      "taskIdCounter": 8,
      "tasks": {
        "idT0": {
          "title": "Cleaning Kitchen",
          "interval": 4,
          "daysRemaining": 2
        },
        "idT1": {
          "title": "Cleaning washroom",
          "interval": 3,
          "daysRemaining": 1
        },
        "idT2": {
          "title": "Checking mail",
          "interval": 3,
          "daysRemaining": 1
        },
        "idT3": {
          "title": "Taking trash out",
          "interval": 3,
          "daysRemaining": 1
        },
        "idT4": {
          "title": "Cleaning dishes",
          "interval": 3,
          "daysRemaining": 1
        },
        "idT5": {
          "title": "get groceries",
          "interval": 3,
          "daysRemaining": 1
        },
        "idT6": {
          "title": "Cleaning stovetop",
          "interval": 3,
          "daysRemaining": 1
        },
        "idT7": {
          "title": "vacuum floor",
          "interval": 3,
          "daysRemaining": 1
        },
      },
      "userIdCounter": 0,
      "users": {
        "idU0": {
          "name": "sathu",
          "tasks": [{
            "task": "idT1",
            "completed": true
          },
          {
            "task": "idT0",
            "completed": false
          }]
        },
        "idU1": {
          "name": "Caspar",
          "tasks": [{
            "task": "idT0",
            "completed": false
          },
          {
            "task": "idT7",
            "completed": false
          }
          ]
        },
        "idU2": {
          "name": "Jun Li",
          "tasks": [{
            "task": "idT2",
            "completed": true
          }]
        },
        "idU3": {
          "name": "Omar",
          "tasks": [{
            "task": "idT3",
            "completed": true
          }]
        },
        "idU4": {
          "name": "Spencer",
          "tasks": [{
            "task": "idT4",
            "completed": true
          }]
        },
        "idU5": {
          "name": "Yifei",
          "tasks": [{
            "task": "idT5",
            "completed": true
          }]
        },
      }
    }
  }
}

const Task = ({ task }) => (
  <div className='card m-2 p-2 col-lg-8'>
    <div className="d-flex justify-content-between align-items-center">
      <div className="card-body">
        <div className="card-title">{task.title}</div>
        <div className="card-text">{task.interval}</div>
      </div>
      <div /*className="form-switch"*/>
        <input className="form-check-input" type="checkbox" checked={task.completed} value={task.completed} id="flexCheckDefault"/>
      </div>
    </div>
  </div>
);


const TaskList = ({ tasks }) => (
  <div>
    {Object.values(tasks).map( (task, idx) => <Task key={idx} task={task} />)}
  </div>
);

const UserList = ({users, setUser, apt}) => (
  <div>
    {Object.values(users).map((user, idx) => <UserButton user={user} setUser ={setUser}/>)}
  </div>
)

const UserButton = ({user, setUser}) => (
  <button type="button" className="btn btn-primary m-2"> {user.name} </button>
)

const getTask = (taskId, apt) => (
  apt.tasks[taskId]
);

function App() {
  const [apt, setApt] = useState(apartmentDB.apartments.idA0);
  const [user, setUser] = useState(apt.users.idU0);

  return (
    <div className='container' >
      <h1 > Hi {user.name}, your tasks are </h1>
      <TaskList tasks={user.tasks.map( task => ({...getTask(task.task, apt), completed:task.completed}))} />
      <UserList users={apt.users} setUser = {setUser}/>
    </div >
  );
}

export default App;