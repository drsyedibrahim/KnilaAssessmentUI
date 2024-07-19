import React, { useEffect, useRef, useState } from 'react';
import AddModal from '../Components/Popup/AddPopup';
import EditModal from '../Components/Popup/EditPopup';
import ConfirmModal from '../Components/Popup/ConfirmPopup';
import useContactController, { getContactDataByID } from '../Controller/ContactController';
import { Link } from 'react-router-dom';

const Contact = ({ setToken }) => {
  const inputRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [editShowModal, setEditShowModal] = useState(false);
  const [deleteShowModal, setDeleteShowModal] = useState(false);
  const [deleteContactID, setDeleteContactID] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage, setContactsPerPage] = useState(5); 
  const [formData, SetFormData] = useState({
    contactID: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
  });

  const [editFormData, SetEditFormData] = useState({
    contactID: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    SetFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    SetEditFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const btnEditAction = async (contactID) => {
    try {
      const contact = await getContactDataByID(contactID);
      SetEditFormData({
        contactID: contact.contactID,
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        password: contact.password,
        phoneNumber: contact.phoneNumber,
        address: contact.address,
        city: contact.city,
        state: contact.state,
        country: contact.country,
        postalCode: contact.postalCode,
      });
      editHandleOpenModal();
    } catch (error) {
      console.error("Error in btnEditAction:", error);
    }
  };

  const btnDeleteAction = async (contactID) => {
    try {
      setDeleteContactID(contactID);
      deleteHandleOpenModal();
    } catch (error) {
      console.error("Error in btnDeleteAction:", error);
    }
  };
  const handleContactsPerPageChange = (e) => {
    setContactsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const { contacts, loading, error } = useContactController(searchQuery);

  if (loading) return <div>Loading...</div>;
  
  if (error) return <div>Error: {error.message}</div>;

  if (!Array.isArray(contacts.result)) return <div>No contacts available.</div>;

  const handleOpenModal = () => {
    SetFormData({
      contactID: 0,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: '',
      address: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    SetFormData({
      contactID: 0,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: '',
      address: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
    });
    setShowModal(false);
  };

  const editHandleOpenModal = () => {
    setEditShowModal(true);
  };

  const editHandleCloseModal = () => {
    SetEditFormData({
      contactID: 0,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: '',
      address: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
    });
    setEditShowModal(false);
  };

  const deleteHandleOpenModal = () => {
    setDeleteShowModal(true);
  };

  const deleteHandleCloseModal = () => {
    setDeleteShowModal(false);
  };

  const handleSearch = (e) =>{
    setSearchQuery(e.target.value);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contacts.result.slice(indexOfFirstContact, indexOfLastContact);
  const totalPages = Math.ceil(contacts.result.length / contactsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div>
      <h2>Contact List</h2>
      <div>
        <div className='col-lg-12 col-md-12 col-sm-12'>
            <div className='col-lg-12 col-md-12'>
                <div className='row'>
                  <div className='col-sm-5'>
                    <input type="text" placeholder="Search Contacts..." value={searchQuery} onChange={handleSearch} ref={inputRef} className="form-control m-2"/>
                  </div>
                  <div className='col-sm-1'>
                    <select value={contactsPerPage} onChange={handleContactsPerPageChange} className="form-select m-2">
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={15}>15</option>
                    </select>
                  </div>
                  <div className='col-sm-6'>
                    <div className='text-end'>
                      <button onClick={handleOpenModal} className='btn btn-primary m-2'>Add Contact</button>
                    </div>
                  </div>
                </div>
                
            </div>
            <div className='col-lg-12 col-md-12 col-sm-12 mt-2'>
                <div className='table-responsive'>
                <table className="table table-hover ">
                    
                    <thead>
                        <tr className="table-dark">
                            <th scope="col">#</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email Address</th>
                            <th scope="col">Address</th>
                            <th scope="col">City</th>
                            <th scope="col">State</th>
                            <th scope="col">Country</th>
                            <th scope="col">Phone No.</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentContacts.map((contact, index) => (
                            <tr key={contact.contactID}>
                                <td>{indexOfFirstContact + index + 1}</td>
                                <td>{contact.firstName}</td>
                                <td>{contact.lastName}</td>
                                <td>{contact.email}</td>
                                <td>{contact.address}</td>
                                <td>{contact.city}</td>
                                <td>{contact.state}</td>
                                <td>{contact.country}</td>
                                <td>{contact.phoneNumber}</td>
                                <td>
                                <Link onClick={() => btnEditAction(contact.contactID)}><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAABe0lEQVR4nN3Sv0sCYRzH8UePfuCQoHn9+COEwMGtoTGH9DDox3nWP1Bk4FC0qGQtDUFT1NJUalBN6ZnPY5SdBa4R2U1aSENgZubdN86QGgr0pMX3H/Di8314EGq/uLPuwVkSMblIgXbj5ZYxkwsLgYOs9Fqugs2fqfS7zzdUYzRHBPNcSj7NPIPSR1WGUV+mQs+QFRUYvrZ4ruTsUwksiwKcpAs1tFiuQi+L35rF0uuHorTL52B46QbuH7/RQOgBjCwuNYY59ztNLnwZjDxItTkAUEfv8iUwz6fAMI2BYnh/YxhHLn5i9Xb4HFg8whdmj24jBBrVmFIwLLYFhhAacCePg2HxV2wtIoKBbQJDCDQ0R94lWf57GRPfahBDqIOJDlm9gtzymfV044lN/SSG1O1LDVKWroZE5dM2jykZWZynHDzopzBYvWno4wgYWaIOQwihnolEUXn0LmccKHusonXwSa0juqAKU6LG+D3KHvNRTHwE2Y50qpD/6BOD+5fG4Uu67gAAAABJRU5ErkJggg==" alt="Edit" /></Link> |
                                <Link onClick={() => btnDeleteAction(contact.contactID)}><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAnElEQVR4nGNgoDe4zSDpfptBOhSCJd1J1ex/i0GyHIGlZt9mkPqPjEFiyGpuM0j64zNwFboBhLHkKpwG3mQQU7rDIGlMCr7JIKaE19u3GCS0iDUMpJaBELjFIHWFWO+C1DKQYOD12wxSHVD6PzYxEg2UXIUZUahiowZiB6NhyEDNZHMcWmQdRzIQRYzUnPKfKlkPtUAlhEkscMkBAD78SkLSkig8AAAAAElFTkSuQmCC" alt="Delete" /></Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
              </div>
            </div>
            <div className="pagination-controls text-end">
              <Link onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</Link>
              &nbsp;&nbsp;&nbsp;<span>Page {currentPage} of {totalPages}</span>&nbsp;&nbsp;&nbsp;
              <Link onClick={handleNextPage} disabled={currentPage === totalPages}>Next</Link>
            </div>
        </div>
      </div>

      <AddModal show={showModal} handleClose={handleCloseModal} formdata={formData}>
        <h4>Add Contact</h4>
        <div className='m-2'>
          <div className="form-group">
            <label htmlFor="firstName"><b>First Name</b></label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="lastName"><b>Last Name</b></label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="email"><b>Email</b></label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="password"><b>Password</b></label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="phoneNumber"><b>Phone Number</b></label>
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="address"><b>Address</b></label>
            <textarea
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className='row mb-2'>
            <div className='col-sm-6'>
              <div className="form-group">
                <label htmlFor="City"><b>City</b></label>
                <input
                  type="text"
                  className="form-control"
                  id="City"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className='col-sm-6'>
              <div className="form-group">
                <label htmlFor="State"><b>State</b></label>
                <input
                  type="text"
                  className="form-control"
                  id="State"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className='row mb-2'>
            <div className='col-sm-6'>
              <div className="form-group">
                <label htmlFor="Country"><b>Country</b></label>
                <input
                  type="text"
                  className="form-control"
                  id="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className='col-sm-6'>
              <div className="form-group">
                <label htmlFor="PostalCode"><b>Postal Code</b></label>
                <input
                  type="text"
                  className="form-control"
                  id="PostalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
      </AddModal>

      <EditModal show={editShowModal} handleClose={editHandleCloseModal} formdata={editFormData}>
        <h4>Edit Contact</h4>
        <div className='m-2'>
          <div className="form-group">
            <label htmlFor="editFirstName"><b>First Name</b></label>
            <input
              type="text"
              className="form-control"
              id="editFirstName"
              name="firstName"
              value={editFormData.firstName}
              onChange={handleEditInputChange}
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="editLastName"><b>Last Name</b></label>
            <input
              type="text"
              className="form-control"
              id="editLastName"
              name="lastName"
              value={editFormData.lastName}
              onChange={handleEditInputChange}
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="editEmail"><b>Email</b></label>
            <input
              type="email"
              className="form-control"
              id="editEmail"
              name="email"
              value={editFormData.email}
              onChange={handleEditInputChange}
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="editPassword"><b>Password</b></label>
            <input
              type="password"
              className="form-control"
              id="editPassword"
              name="password"
              value={editFormData.password}
              onChange={handleEditInputChange}
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="editPhoneNumber"><b>Phone Number</b></label>
            <input
              type="text"
              className="form-control"
              id="editPhoneNumber"
              name="phoneNumber"
              value={editFormData.phoneNumber}
              onChange={handleEditInputChange}
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="editAddress"><b>Address</b></label>
            <textarea
              type="text"
              className="form-control"
              id="editAddress"
              name="address"
              value={editFormData.address}
              onChange={handleEditInputChange}
            ></textarea>
          </div>
          <div className='row mb-2'>
            <div className='col-sm-6'>
              <div className="form-group">
                <label htmlFor="editCity"><b>City</b></label>
                <input
                  type="text"
                  className="form-control"
                  id="editCity"
                  name="city"
                  value={editFormData.city}
                  onChange={handleEditInputChange}
                />
              </div>
            </div>
            <div className='col-sm-6 mb-2'>
              <div className="form-group">
                <label htmlFor="editState"><b>State</b></label>
                <input
                  type="text"
                  className="form-control"
                  id="editState"
                  name="state"
                  value={editFormData.state}
                  onChange={handleEditInputChange}
                />
              </div>
            </div>
          </div>
          <div className='row mb-2'>
            <div className='col-sm-6'>
              <div className="form-group">
                <label htmlFor="editCountry"><b>Country</b></label>
                <input
                  type="text"
                  className="form-control"
                  id="editCountry"
                  name="country"
                  value={editFormData.country}
                  onChange={handleEditInputChange}
                />
              </div>
            </div>
            <div className='col-sm-6'>
              <div className="form-group">
                <label htmlFor="editPostalCode"><b>Postal Code</b></label>
                <input
                  type="text"
                  className="form-control"
                  id="editPostalCode"
                  name="postalCode"
                  value={editFormData.postalCode}
                  onChange={handleEditInputChange}
                />
              </div>
            </div>
          </div>
        </div>
      </EditModal>

      <ConfirmModal show={deleteShowModal} handleClose={deleteHandleCloseModal} contactID={deleteContactID}>
        <h4>Delete Contact</h4>
        <p>Are you Sure You want to Delete this Record?</p>
      </ConfirmModal>
    </div>
  );
};

export default Contact;
