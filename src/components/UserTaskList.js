import Task from "./Task";

const UserTaskList = ({ tasks, updateTask }) => (
    <div>
      {
        Object.values(tasks).map((task, idx) => (
        <Task key={idx} task={task}>
          <div >
            <input type="checkbox"
              className="form-check-input"  
              defaultChecked={task.completed} 
              value={task.completed} id="flexCheckDefault"
              onChange={ () => updateTask(task.id) } />
          </div>
        </Task>
        ))}
    </div>
  );

  export default UserTaskList