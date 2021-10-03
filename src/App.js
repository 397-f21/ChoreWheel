import logo from './logo.svg';
import './App.css';


const apartmentDB = {
  "apartments": {
    "idA0":{
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
          "tasks": [
            {
              "task": "idT1", 
              "completed": true
            }
          ]
        },
        "idU1": {
          "name": "Caspar",
          "tasks": [
            {
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
          "tasks": [
            {
              "task": "idT2", 
              "completed": true
            }
          ]
        },
        "idU3": {
          "name": "Omar",
          "tasks": [
            {
              "task": "idT3", 
              "completed": true
            }
          ]
        },
        "idU4": {
          "name": "Spencer",
          "tasks": [
            {
              "task": "idT4", 
              "completed": true
            }
          ]
        },
        "idU5": {
          "name": "Yifei",
          "tasks": [
            {
              "task": "idT5", 
              "completed": true
            }
          ]
        },
      }
  }
}
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
