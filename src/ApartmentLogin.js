import React from 'react';



const ApartmentLoginButton = ({onFinish,aptKeys}) => (
    <button type="button" className="btn btn-primary" 
    onClick = {() => {
      const input = document.querySelector("#apt_input")
      if (aptKeys.includes(input.value)) {
        onFinish(input.value)
      }
      else {
        alert('This ID does not exist')
      }
      }}> 
    Log in to Apartment
  </button>

);


function ApartmentLogin ({onFinish,aptKeys})  {
    return (
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Apartment ID</label>
          <input type="email" class="form-control" id="apt_input" aria-describedby="emailHelp" placeholder="Enter email"/>
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <ApartmentLoginButton onFinish={onFinish} aptKeys={aptKeys}/>
      </form>
    );
  }
  

  export default ApartmentLogin;
   