import React from 'react';
import { handleLogout } from '../../Controller/AuthController';

const Header = ({ token }) => {
    const logout = () => {
        handleLogout(token);
    };

    return (
        <><h3>Dashboard</h3><button onClick={logout}>Logout</button></>
    );
};

export default Header;