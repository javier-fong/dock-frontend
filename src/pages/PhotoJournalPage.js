import React, { useEffect, useState, useContext } from 'react';
import api from '../components/Api';
import { UserContext } from './DashboardPage';
import PhotoJournalUpload from '../components/PhotoJournal/PhotoJournalUpload';

const PhotoJournalPage = () => {
    // Imported user email
    const { userEmail } = useContext(UserContext);

    const [journalPosts, setJournalPosts] = useState([]);

    useEffect(() => {
        if (userEmail) {
            api.getJournalPosts(userEmail)
                .then(res => {
                    setJournalPosts(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            return undefined;
        }
    },[userEmail])

    const handleCreateJournalPost = async (owner, image, caption) => {
        try {
            const payload = {
                owner: owner,
                email: userEmail,
                image: image,
                caption: caption
            }
            await api.createJournalPost(payload);
            const response = await api.getJournalPosts(userEmail);
            setJournalPosts(response.data);
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div>
            <PhotoJournalUpload handleCreateJournalPost={handleCreateJournalPost} />
        </div>
    )
}

export default PhotoJournalPage
