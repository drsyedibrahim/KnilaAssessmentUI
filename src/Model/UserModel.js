import axios from 'axios';
import axiosInstance from '../Helper/axiosInstance';

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
          const response = await axiosInstance.get('/Auth/GetAllContactList', { 
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
      const response = await axiosInstance.get('/Auth/GetByContactID', { 
        params: {
          contactID: contactID
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
      const response = await axiosInstance.get('/Auth/DeleteContactByContactID', { 
        params: {
          contactID: contactID
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
        const response = await axiosInstance.post('/Auth/AddOrEditContact', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        }); 
        return response.data;
    } catch (error) {
        console.error("Error fetching contact list", error);
        throw error;
    }
  }
};

export default apiService;