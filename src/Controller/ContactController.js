import { useState, useEffect } from 'react';
import apiService from '../Model/UserModel';

export const AddContactDataToDB = async (formData) => {
    try {
        const data = await apiService.PostContactDataToDB(formData);
        return data;
    } catch (err) {
        console.log(err);
    } 
}

export const getContactDataByID = async (contactID) => {
    try {
        const data = await apiService.GetContactDataByIDFromDB(contactID);
        return data.resultData;
    } catch (err) {
        console.log(err);
    } 
}

export const deleteContactDataByID = async (contactID) => {
    try {
        const data = await apiService.DeleteContactDataByIDFromDB(contactID);
        return data.resultData;
    } catch (err) {
        console.log(err);
    } 
}

const useContactController = (searchQuery) => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchContacts = async () => {
        setLoading(true);
        try {
            setContacts(null);
            const data = await apiService.getAllContactList(searchQuery, '', true);
            setContacts(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, [searchQuery]);

    return { contacts, loading, error };
};

export default useContactController;
