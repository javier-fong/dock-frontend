import React, { useEffect, useState, useContext } from 'react';
import api from '../components/Api';
import { UserContext } from './DashboardPage';
import { makeStyles } from '@material-ui/core/styles';
import PhotoJournalUpload from '../components/PhotoJournal/PhotoJournalUpload';
import PhotoJournalCard from '../components/PhotoJournal/PhotoJournalCard';

const useStyles = makeStyles((theme) => ({
    cardDivStyle: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        marginTop: theme.spacing(3),
        // width: '100%',
        marginLeft: theme.spacing(13)
    }
}))

const PhotoJournalPage = () => {
    const classes = useStyles();

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
            <div className={classes.cardDivStyle}>
                {journalPosts.slice(0).reverse().map((post, index) => 
                <PhotoJournalCard
                    key={index}
                    owner={post.owner}
                    image={post.image}
                    date={post.createdAt}
                    caption={post.caption}
                /> 
                )}
            </div>
        </div>
    )
}

export default PhotoJournalPage
