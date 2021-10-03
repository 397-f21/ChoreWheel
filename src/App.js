import logo from './logo.svg';
import './App.css';


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


function App() {
    return ( <
            div >

            <
            h1 > Hi { apartmentDB.apartments.idA0.users.idU0.name }, your tasks are < /h1>  <
            ul > {
                apartmentDB.apartments.idA0.users.idU0.tasks.map((task) => < li key = { task.task } > { task.task }, { String(task.completed) } < /li>)} < /
                    ul > <
                    /div >
                );
            }

            export default App;