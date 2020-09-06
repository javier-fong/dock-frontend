import React, { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard/Dashboard';
import api from '../components/api';

export const UserContext = React.createContext();

const DashboardPage = () => {
    const [userFirstName, setUserFirstName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userId, setUserId] = useState('');
    const [userMembers, setUserMembers] = useState([]);

    useEffect(() => {
        const getUserData = async () => {
            const userData = JSON.parse(localStorage.getItem('login'));
            await setUserEmail(userData.email);
            await setUserFirstName(userData.firstName);
            await setUserId(userData._id);
            
            if (userEmail) {
                const response = await api.getMembers(userEmail);
                setUserMembers(response.data[0].members);
            }
        }
        getUserData();
    }, [userEmail])

    const deleteUserMember = async member => {
        try {
            await api.deleteMember(userId, member);
            const response = await api.getMembers(userEmail);
            setUserMembers(response.data[0].members);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <UserContext.Provider value={{
            userFirstName,
            userEmail,
            userId,
            userMembers
        }}>
            <Dashboard deleteUserMember={deleteUserMember} />
        </UserContext.Provider>
    )
}

export default DashboardPage
