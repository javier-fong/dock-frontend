import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LoginGoogle from './LoginGoogle';
import api from '../Api';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    container: {
        height: '100%',
        display: 'flex'
    },
    container2: {
        alignSelf: 'center',
    },
    paper: {
        // marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(1, 0, 2),
    },
    forgetPwStyle: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    alertStyle: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1)
    }
}));

export default function SignIn() {
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            const payload = {
                email,
                password
            }
            const response = await api.loginUser(payload);

            if (response.status === 200) {
                localStorage.setItem('login', JSON.stringify(response.data));
                window.location.href = '/app/dashboard'
            }

        } catch(err) {
            console.log(err)
            setError(true)
        }
    }

    return (
        <Container component="main" maxWidth="xs" className={classes.container}>
            <div className={classes.container2}>
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    {error ? <Alert severity="warning" className={classes.alertStyle}>Either email or password wrong</Alert> : null}
                    <form className={classes.form} onSubmit={handleFormSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Typography variant='body2' color="textPrimary">
                            Or login with
                        </Typography>
                        <LoginGoogle />
                        <div className={classes.forgetPwStyle}>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                            <Link href="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </Container>
    );
}