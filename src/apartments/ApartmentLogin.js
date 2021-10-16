import React from 'react';

const ApartmentLoginButton = ({ onFinish, aptKeys }) => (
  <button type="button" 
      className="btn btn-primary" 
      onClick = {
        () => {
          const input = document.querySelector("#apt_input")
          if (aptKeys.includes(input.value)) {
            onFinish(input.value)
          } else {
            alert(`Specified Apartment ID "${input.value}" does not exist`)
            input.value = '';
          }
        }
      }> 
    Log in to Apartment
  </button>
);

const ApartmentLogin = ({ onFinish, aptKeys, setShowCreate }) => (
  <form className="container p-2 text-center">
    <div className="form-group">
      <label htmlFor="exampleInputEmail1">
        Apartment ID
      </label>
      <input type="name" 
          className="form-control mb-4 mx-auto text-center" 
          style={{maxWidth: "700px"}}
          id="apt_input" 
          placeholder="Enter Apartment ID" />
    </div>
    <ApartmentLoginButton onFinish={onFinish} aptKeys={aptKeys}/>
    <br/>
    <p className="m-0 mt-1">
      Don't have and apartment? 
      <a href="#" onClick={() => setShowCreate()}> 
        Create a new one here!
      </a> 
    </p>
  </form>
);

export default ApartmentLogin;