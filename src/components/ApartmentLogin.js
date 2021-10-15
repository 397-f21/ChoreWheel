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

function ApartmentLogin ({ onFinish, aptKeys }) {
  return (
    <form className="container">
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">
          Apartment ID
        </label>
        <input type="name" 
            className="form-control" 
            id="apt_input" 
            placeholder="Enter Aparmtent ID" />
      </div>
      <ApartmentLoginButton onFinish={onFinish} aptKeys={aptKeys}/>
    </form>
  );
};
  
export default ApartmentLogin;
   