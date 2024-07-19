import { loginUser } from '../Model/UserModel';

export const handleLogin = async (emailId, password, setError, setToken) => {
  try {
    const data = await loginUser(emailId, password);
    const { token } = data;
    localStorage.setItem('token', token);
    setToken(token);
    setError('');
  } catch (error) {
    setError('Invalid credentials');
  }
};

export const handleLogout = (setToken) => {
  localStorage.removeItem('token');
  setToken(null);
};