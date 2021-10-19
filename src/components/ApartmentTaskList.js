import Task from "./Task"

const ApartmentTaskList = ({ aptId, users, tasks}) => {
  const flatTasks = Object.values(users).map((user, idx) => 
  (Object.keys(user.tasks).map((taskId) => ({...tasks[taskId], completed:user.tasks[taskId], user:user})))).flat().sort((task1, task2) => 
  task1.daysRemaining - task2.daysRemaining)
  return (
  <div>
    {
          flatTasks.map((task,idx) => (
          <Task key={ idx } 
              aptId={ aptId }
              userId={ task.user.id }
              task={ task } >
            { task.user.name }
          </Task>
        ))
    }
  </div>
  )
};
  
export default ApartmentTaskList;