import {Modal} from 'react-bootstrap';
import { updateData, getRefByPush } from '../firebase';

const createUser = async ( user, aptId ) => {
    try {
      const userRef = getRefByPush(`/apartments/${aptId}/users`);
      const userKey = userRef.key;
      user = ({...user, 'id':userKey});
     // taskRef.push(task);
      updateData(userRef, user);
  
    } catch (error) {
      alert(error);
    }
  }

const validateForm = (aptId, handleClose) => {
    const userName = document.querySelector('#userName').value;
    
    if (userName === ''){
      alert('Please enter a name for the user')
      return
    }
    

    const user =  { 
                "name": userName,
                "tasks": {},
            }

    createUser(user, aptId);
    handleClose();
}


const AddUser = ( {show, handleClose, aptId} ) => (
    <Modal show={show} onHide={handleClose} animation={false}>
    <Modal.Header>
      <Modal.Title>Add User</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form>
        <div class="form-group p-2">
          <label for="userName">New User:</label>
          <input class="form-control" id="userName" placeholder="User name" maxLength={50} />
        </div>
      </form>
    </Modal.Body>
    <Modal.Footer>
      <button className='btn btn-secondary' onClick={handleClose}>
        Close
      </button>
      <button className='btn btn-primary' onClick={() => validateForm(aptId, handleClose)}>
        Save Changes
      </button>
    </Modal.Footer>
  </Modal>

)

export default AddUser;