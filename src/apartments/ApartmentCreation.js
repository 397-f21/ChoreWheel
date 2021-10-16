import React from 'react';
import { updateDataByPath } from '../firebase';

const createAptData = async (onFinish, aptKeys) => {
    const input = document.querySelector("#apt_input")
    if (aptKeys.includes(input.value)) {
      alert(`Specified Apartment ID "${input.value}" already exists; Enter a new ID`)
      input.value = '';
    } else {
      await updateDataByPath(`/apartments/`, {[input.value] : 
                                  {"tasks" : {
                                    "-1" : {
                                      "daysRemaining" : 3,
                                      "id" : "-1T",
                                      "interval" : 5,
                                      "title" : "-1"
                                    }
                                  }, "users" : {
                                    "-1" : {
                                      "id" : "-1U",
                                      "name" : "-1",
                                      "tasks" : {
                                        "-1T" : false
                                      }
                                    }
                                  }}});
      onFinish(input.value)
    }
  }

const ApartmentCreateButton = ({onFinish, aptKeys}) => (
    <button type="button" 
    className="btn btn-primary" 
    onClick = {() => createAptData(onFinish, aptKeys)}> 
    Create New Apartment
    </button>);

function ApartmentCreation ({ onFinish, aptKeys, setShowCreate }) {
    return (
      <form className="container p-2">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">
            Apartment ID
          </label>
          <input type="name" 
              className="form-control mb-4" 
              id="apt_input" 
              placeholder="Enter new Apartment ID" />
        </div>
        <ApartmentCreateButton onFinish={onFinish} aptKeys={aptKeys}/>
        <br/>
        <button type="button" 
      className="btn btn-secondary m-2 mx-0" onClick={() => setShowCreate()}>Login to Apartment</button>
      </form>
    );
  };

export default ApartmentCreation;