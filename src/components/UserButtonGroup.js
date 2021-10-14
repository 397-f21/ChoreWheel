
const UserButtonGroup = ({ currUser, users, setUser }) => (
    <div className="container text-center">
      {
        users.map((user, idx) => (
          <UserButton key={idx}
              user={user} 
              selected={user.id === currUser}
              setUser={setUser} />
        ))
      }
    </div>
  )
  
  const UserButton = ({ user, selected, setUser }) => (
    <button type="button" 
        className={`btn m-2 ${selected ? 'btn-primary' : /* user.highlight ? 'btn-outline-warning text-black bg-warning bg-opacity-25' : */ 'btn-outline-primary'}`}
        disabled={ selected }
        onClick={ () => setUser(user.id) }> 
      { user.name } 
    </button>
  )

  export default UserButtonGroup