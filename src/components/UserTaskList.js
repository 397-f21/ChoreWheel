import Task from "./Task";

const UserTaskList = ({ aptId, userId, tasks, updateTask }) => (
    <div>
      {
        Object.values(tasks).map((task, idx) => (
        <Task key={ idx }
            aptId={ aptId }
            userId={ userId }
            task={ task }>
          <div>
            <input type="checkbox"
              className="form-check-input"  
              defaultChecked={ task.completed } 
              value={task.completed} id="flexCheckDefault"
              onChange={ () => updateTask(task.id) } />
          </div>
        </Task>
        ))}
    </div>
  );

  export default UserTaskList