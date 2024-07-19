import React from 'react';
import './Popup.css';
import { Link } from 'react-router-dom';
import { deleteContactDataByID } from '../../Controller/ContactController'

const ConfirmModal = ({ show, handleClose, contactID, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  const btnDeletesubmit = async (e) => {
    e.preventDefault();
    const res = await deleteContactDataByID(contactID);
    if (res.isSuccess){
      window.location.reload();
    }
  }

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <form method='post' onSubmit={btnDeletesubmit}>
          {children}
          <div className='text-end'>
            <Link onClick={handleClose} className='btn btn-primary mt-2 me-3'>Close</Link>
            <button className='btn btn-danger mt-2' type='submit'>Delete</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ConfirmModal;
