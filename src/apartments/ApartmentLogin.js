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

function ApartmentLogin ({ onFinish, aptKeys, setShowCreate }) {
  return (
    <form className="container p-2">
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">
          Apartment ID
        </label>
        <input type="name" 
            className="form-control mb-4" 
            id="apt_input" 
            placeholder="Enter Apartment ID" />
      </div>
      <ApartmentLoginButton onFinish={onFinish} aptKeys={aptKeys}/>
      <br/>
      <button type="button" 
      className="btn btn-secondary m-2 mx-0" onClick={() => setShowCreate()}>Create a New Apartment</button>
    </form>
  );
};
  
export default ApartmentLogin;