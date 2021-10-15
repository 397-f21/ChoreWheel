import Task from "./Task"

const ApartmentTaskList = ({ aptId, users, tasks}) => (
  <div>
    {
      Object.values(users).map( (user, idx) => (
        Object.keys(user.tasks).map( (taskId, taskIdx) => (
          <Task key={ `${idx}-${taskIdx}` } 
              aptId={ aptId }
              userId={ user.id }
              task={ {...tasks[taskId], completed:user.tasks[taskId]} } >
            { user.name }
          </Task>
        ))
      ))
    }
  </div>
);
  
export default ApartmentTaskList;