import React, { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard/Dashboard';
import api from '../components/Api';

export const UserContext = React.createContext();

const DashboardPage = () => {
    const [userFirstName, setUserFirstName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userId, setUserId] = useState('');
    const [userMembers, setUserMembers] = useState([]);
    const [userPicture, setUserPicture] = useState('');

    useEffect(() => {
        const getUserData = async () => {
            const userData = await JSON.parse(localStorage.getItem('login'));
            await setUserEmail(userData.email);
            await setUserFirstName(userData.firstName);
            await setUserId(userData._id);
            await setUserPicture(userData.picture);

            if (userEmail) {
                const response = await api.getMembers(userEmail);
                setUserMembers(response.data[0].members);
            }
        }
        getUserData();
    }, [userEmail])

    const deleteUserMember = async payload => {
        try {
            await api.deleteMember(userId, payload);
            const response = await api.getMembers(userEmail);
            setUserMembers(response.data[0].members);
        } catch (err) {
            console.log(err)
        }
    }

    const handleAddMember = async payload => {
        try {
            await api.addMember(userId, payload);
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
            userMembers,
            userPicture
        }}>
            <Dashboard
                deleteUserMember={deleteUserMember}
                handleAddMember={handleAddMember}
            />
        </UserContext.Provider>
    )
}

export default DashboardPage
