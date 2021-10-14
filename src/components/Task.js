
const Task = ({ task, children }) => {
    const currDate = new Date();
    currDate.setDate(currDate.getDate() + task.daysRemaining);
  
    return (
    <div key={task.id} 
        className={`card m-2 p-2 col-lg-8 mx-auto ${ task.completed ? 'border-success bg-success bg-opacity-25': task.daysRemaining === 0 ? 'border-warning bg-warning bg-opacity-25' : 'border-dark'}`} 
        style={{borderWidth: '4px'}} >
      <div className="d-flex justify-content-between align-items-center">
        <div className="card-body">
          <div className="card-title">
            <b>Task:</b> { task.title }
          </div>
          <div className="card-text">
            <b>Due:</b> { currDate.toDateString() }
          </div>
        </div>
        {children}
      </div>
    </div>
    );
  };

export default Task