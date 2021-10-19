
const UserButtonGroup = ({ currUser, users, setUser,children }) => (
    <div className="container text-center">
      {children}
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
        className={`btn m-2 ${selected ? 'btn-primary' : 'btn-outline-primary'}`}
        disabled={ selected }
        onClick={ () => setUser(user.id) }> 
      { user.name } 
    </button>
  )

  export default UserButtonGroup