import axios from 'axios';

const API_URL = 'https://localhost:7115/api';

export const loginUser = async (emailId, password) => {
  try {
    const response = await axios.post(`${API_URL}/Auth/Login`, { emailId, password });
    return response.data;
  } catch (error) {
    throw new Error('Invalid credentials');
  }
};

const token = localStorage.getItem('token');

const apiService = {
  getAllContactList: async (search, sortColumn, isAsc, page = 1, pageSize = 5) => {
      const params = {
          search,
          sortColumn,
          isAsc,
          page,
          pageSize
      };

      try {
          const response = await axios.get(`${API_URL}/Auth/GetAllContactList`, { 
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            params: params,
          }); 

          return response.data;
      } catch (error) {
          console.error("Error fetching contact list", error);
          throw error;
      }
  },

  GetContactDataByIDFromDB: async (contactID) => {
    try {
      const response = await axios.get(`${API_URL}/Auth/GetByContactID`, { 
        params: {
          contactID: contactID
        },
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }); 
  
      return response.data;
    } catch (error) {
      console.error("Error fetching contact data", error);
      throw error;
    }
  },

  DeleteContactDataByIDFromDB: async (contactID) => {
    try {
      const response = await axios.get(`${API_URL}/Auth/DeleteContactByContactID`, { 
        params: {
          contactID: contactID
        },
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }); 
  
      return response.data;
    } catch (error) {
      console.error("Error fetching contact data", error);
      throw error;
    }
  },


  PostContactDataToDB: async (formData) => {
   debugger
    try {
        const response = await axios.post(`${API_URL}/Auth/AddOrEditContact`, formData,
        { 
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }); 

        return response.data;
    } catch (error) {
        console.error("Error fetching contact list", error);
        throw error;
    }
  }
};

export default apiService;