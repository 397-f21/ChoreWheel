import 'bootstrap/dist/css/bootstrap.min.css';

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

const getTask = (taskId, aptId) => (
  apartmentDB.apartments[aptId].tasks[taskId]
);

function App() {
  return (
    <div className='container' >
      <h1 > Hi {apartmentDB.apartments.idA0.users.idU0.name}, your tasks are </h1>
      <TaskList tasks={apartmentDB.apartments.idA0.users.idU0.tasks.map( task => ({...getTask(task.task, "idA0"), completed:task.completed}))} />
    </div >
  );
}

export default App;