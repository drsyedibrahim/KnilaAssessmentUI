import React from 'react';
import { handleLogout } from '../../Controller/AuthController';

const Header = ({ token }) => {
    const logout = () => {
        handleLogout(token);
    };

    return (
        <><h1>Dashboard</h1><button onClick={logout}>Logout</button></>
    );
};

export default Header;