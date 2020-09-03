import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import clsx from 'clsx';
import { Link } from '@material-ui/core';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import DashboardIcon from '@material-ui/icons/Dashboard';
import EventNoteIcon from '@material-ui/icons/EventNote';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import InvertColorsIcon from '@material-ui/icons/InvertColors';

// Import Pages
import { OverviewPage, ToDoListPage } from '../../pages';

// Import state
import { UserContext } from '../../pages/DashboardPage';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap'
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        padding: theme.spacing(3),
        width: '100vw',
        height: '100vh',
        marginTop: theme.spacing(10),
    },
    alignBottom: {
        marginTop: 'auto'
    },
    subList: {
        backgroundColor: '#353535'
    },
    drawerTopDiv: {
        paddingBottom: '15px'
    },
    linkStyle: {
        display: 'flex',
        alignItems: 'center',
        '&:hover': {
            color: 'inherit',
            textDecoration: 'none'
        }
    }
}));

export default function Dashboard() {
    const classes = useStyles();

    // Imported user data state
    const { userFirstName } = useContext(UserContext);

    // States
    const [open, setOpen] = useState(false);
    const [toggle, toggleList] = useState(false);
    const [darkTheme, setDarkTheme] = useState(true);

    const theme = createMuiTheme({
        palette: {
            type: darkTheme ? 'dark' : 'light',
            primary: {
                main: '#BB86FC'
            },
            secondary: {
                main: '#03DAC5',
                light: '#ff7961'
            }
        }
    })

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleToggleList = () => {
        toggleList(!toggle);
    }

    return (
        <Router>
            {/* ----------------------------------- NAV SECTION ----------------------------------- */}
            <div className={classes.root}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <AppBar
                        color='inherit'
                        position="fixed"
                        className={clsx(classes.appBar, {
                            [classes.appBarShift]: open,
                        })}
                    >
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                className={clsx(classes.menuButton, {
                                    [classes.hide]: open,
                                })}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h5" noWrap>
                                Dock
                    </Typography>
                            <List style={{ marginLeft: 'auto' }}>
                                <ListItem>
                                    <Typography variant='h6' style={{ marginRight: '10px' }}>{userFirstName}</Typography>
                                    <IconButton onClick={() => setDarkTheme(!darkTheme)}><InvertColorsIcon /></IconButton>
                                </ListItem>
                            </List>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="permanent"
                        className={clsx(classes.drawer, {
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        })}
                        classes={{
                            paper: clsx({
                                [classes.drawerOpen]: open,
                                [classes.drawerClose]: !open,
                            }),
                        }}
                    >
                        <div className={classes.toolbar}>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                            </IconButton>
                        </div>
                        <div className={classes.drawerTopDiv} />
                        <Divider />

                        <List>
                            <ListItem button key='Profile'>
                                <ListItemIcon><AccountBoxIcon /></ListItemIcon>
                                <ListItemText primary='Profile' />
                            </ListItem>
                            <ListItem button key='Dashboard'>
                                <ListItemIcon><DashboardIcon /></ListItemIcon>
                                <ListItemText primary='Dashboard' />
                            </ListItem>
                            <ListItem button key='Calendar'>
                                <ListItemIcon><EventNoteIcon /></ListItemIcon>
                                <ListItemText primary='Calendar' />
                            </ListItem>
                            <ListItem button key='Family Journal'>
                                <ListItemIcon><PhotoLibraryIcon /></ListItemIcon>
                                <ListItemText primary='Family Journal' />
                            </ListItem>
                            <List>
                                <ListItem button key='Shopping List' onClick={handleToggleList}>
                                    <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
                                    <ListItemText primary='Shopping List' />
                                    <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                                </ListItem>
                                {toggle ?
                                    <ListItem button key='Grocery List' className={classes.subList}>
                                        <ListItemIcon></ListItemIcon>
                                        <ListItemText primary='Grocery List' />
                                    </ListItem>
                                    : null}
                            </List>
                            <ListItem button key='To Do List' to='/app/todolist'>
                                <Link href='/app/todolist' color='inherit' className={classes.linkStyle}>
                                    <ListItemIcon><CheckBoxIcon /></ListItemIcon>
                                    <ListItemText primary='To Do List'></ListItemText>
                                </Link>
                            </ListItem>
                        </List>
                        {/* <Divider /> */}
                        <List className={classes.alignBottom}>
                            {['Log Out'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon><PowerSettingsNewIcon /></ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                    </Drawer>
                    {/* ----------------------------------- END NAV SECTION ----------------------------------- */}

                    {/* ----------------------------------- ROUTES ----------------------------------- */}
                    <Switch>
                        <React.Fragment>
                            <main className={classes.content}>
                                <Route path='/app/dashboard' component={OverviewPage} />
                                <Route path='/app/todolist' component={ToDoListPage} />
                            </main>
                        </React.Fragment>
                    </Switch>
                </ThemeProvider>
            </div>
        </Router>
    );
}
