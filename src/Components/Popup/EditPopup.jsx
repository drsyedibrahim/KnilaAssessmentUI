import React from 'react';
import './Popup.css';
import { Link } from 'react-router-dom';
import { AddContactDataToDB } from '../../Controller/ContactController'

const EditModal = ({ show, handleClose, formdata, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  const btnAddsubmit = async (e) => {
    e.preventDefault();
    const res = await AddContactDataToDB(formdata);
    if (res.isSuccess){
      window.location.reload();
    }
  }

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <form method='post' onSubmit={btnAddsubmit}>
          {children}
          <div className='text-end'>
            <Link onClick={handleClose} className='btn btn-danger mt-2 me-3'>Close</Link>
            <button className='btn btn-success mt-2' type='submit'>Submit</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default EditModal;