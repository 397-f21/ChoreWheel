import React from 'react';

const ApartmentLoginButton = ({onFinish}) => (
    <button type="button" className="btn btn-primary" 
    onClick = {() => onFinish("idA0") }> 
    Log in to Apartment
  </button>

);


function ApartmentLogin ({onFinish})  {
    return (
      <div>
          <h1> This is apartment login page </h1>
          <ApartmentLoginButton onFinish = {onFinish} />
      </div>
    );
  }
  

  export default ApartmentLogin;
   