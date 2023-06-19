import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { makeStyles, useTheme } from '@material-ui/styles';
import { AppBar, CssBaseline, Toolbar, useMediaQuery } from '@material-ui/core';

// third-party
import clsx from 'clsx';

import Header from './Header';
import Sidebar from './Sidebar';

import { drawerWidth } from '../../store/constant';
import { SET_MENU } from './../../store/actions';
import { useEffect } from 'react';
import TransactionModal from './Modal';


// style constant
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    appBar: {
        backgroundColor: 'rgb(252 253 253)'      ///'#2d3036'

    },
    appBarWidth: {
        transition: theme.transitions.create('width'),
        backgroundColor: 'rgb(252 253 253)'///'#2d3036'
    },
    content: {
        ...theme.typography.mainContent,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        [theme.breakpoints.up('md')]: {
            marginLeft: -(drawerWidth),
            width: `calc(100% - ${drawerWidth}px)`
        },
        [theme.breakpoints.down('md')]: {
            width: `calc(100% - ${drawerWidth}px)`
        },
        [theme.breakpoints.down('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`

        }
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px'
        }
    }
}));

//-----------------------|| MAIN LAYOUT ||-----------------------//

const MainLayout = ({ children }) => {

    const classes = useStyles();
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

    // Handle left drawer
    const leftDrawerOpened = useSelector((state) => state.customization.opened);
    const dispatch = useDispatch();
    const handleLeftDrawerToggle = () => {
        dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
    };

    React.useEffect(() => {
        dispatch({ type: SET_MENU, opened: !matchDownMd });
    }, [matchDownMd]);

    const handleScroll = () => {
        const header = document.querySelector("#header");
        if (document.documentElement.scrollTop > 0) {
            header.style.boxShadow = "0 1rem 1rem rgb(31 45 61 / 8%)";
        } else {
            header.style.boxShadow = "0 1rem 3rem rgb(31 45 61 / 6%)";
        }
    };
    useEffect(() => {
        document.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener("scroll", handleScroll);
        };
    }, []);


    return (
        <div className={classes.root}>
            <CssBaseline />
            {/* header */}

            <AppBar
                id='header'
                enableColorOnDark
                position="fixed"
                color="inherit"
                elevation={0}
                className={leftDrawerOpened ? classes.appBarWidth : classes.appBar}
                sx={{ boxShadow: "0 1rem 3rem rgb(31 45 61 / 6%)" }}
            >
                <Toolbar>
                    <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
                </Toolbar>
            </AppBar>

            {/* drawer */}
            <Sidebar drawerOpen={leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />

            {/* main content */}
            <main
                className={clsx([
                    classes.content,
                    {
                        [classes.contentShift]: leftDrawerOpened
                    }
                ])}
            >
                <div>{children}</div>
            </main>
            <TransactionModal />
        </div>
    );
};

MainLayout.propTypes = {
    children: PropTypes.node
};

export default MainLayout;
