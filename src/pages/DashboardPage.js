import React, { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard/Dashboard';

export const UserContext = React.createContext();

const DashboardPage = () => {
    const [userFirstName, setUserFirstName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('login'));
        setUserFirstName(userData.firstName);
        setUserEmail(userData.email);
    }, [])

    return (
        <UserContext.Provider value={{ 
            userFirstName,
            userEmail
        }}>
            <Dashboard />
        </UserContext.Provider>
    )
}

export default DashboardPage
