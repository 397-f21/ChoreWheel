import React from 'react';
import { updateDataByPath } from '../firebase';

const createAptData = async (onFinish, aptKeys) => {
  const input = document.querySelector("#apt_input").value.trim()
  if (input === '') {
    alert('Please enter an apartment ID')
    return
  }

  if (aptKeys.includes(input)) {
    alert(`Specified Apartment ID "${input}" already exists; Enter a new ID`);
    return;
  }
  
  await updateDataByPath(`/apartments/`, {
    [input] : 
      {
        "tasks" : {
          "-1" : {
            "daysRemaining" : 3,
            "id" : "-1T",
            "interval" : 5,
            "title" : "-1"
          }
        }, 
        "users" : {
          "-1" : {
            "id" : "-1U",
            "name" : "-1",
            "tasks" : {
            "-1T" : false
          }
        }
      }
    }
  });
  onFinish(input)  
}

const ApartmentCreateButton = ({onFinish, aptKeys}) => (
  <button type="button" 
      className="btn btn-primary" 
      onClick = {() => createAptData(onFinish, aptKeys)}> 
    Create New Apartment
  </button>
);

const ApartmentCreation = ({ onFinish, aptKeys, setShowCreate }) => (
  <form className="container p-2 text-center">
    <div className="form-group">
      <label htmlFor="exampleInputEmail1">
        Apartment ID
      </label>
      <input type="name" 
          className="form-control mb-4 mx-auto text-center" 
          style= {{maxWidth: '700px'}}
          id="apt_input" 
          placeholder="Enter new Apartment ID" />
    </div>
    <ApartmentCreateButton onFinish={onFinish} aptKeys={aptKeys}/>
    <br/>
    <p className="m-0 mt-1">
      Already have an apartment? 
      <a href="#" onClick={() => setShowCreate()}> 
        Login here!
      </a> 
    </p>
  </form>
);

export default ApartmentCreation;