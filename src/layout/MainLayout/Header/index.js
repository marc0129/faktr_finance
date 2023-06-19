import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Avatar, Box, ButtonBase } from '@material-ui/core';

// project imports
import LogoSection from '../LogoSection';
// import NotificationSection from './NotificationSection';

// assets
import { IconMenu2 } from '@tabler/icons';
import { InPageConnectButton } from './ConnectButton';

// style constant
const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1
    },
    headerAvatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        transition: 'all .2s ease-in-out',
        background: theme.palette.common.paper,
        color: theme.palette.common.main,
        '&:hover': {
            background: theme.palette.common.main,
            color: theme.palette.common.paper
        }
    },
    boxContainer: {
        width: '228px',
        display: 'none',
        [theme.breakpoints.down('md')]: {
            width: 'auto',
            display: 'flex'
        }
    }
}));

//-----------------------|| MAIN NAVBAR / HEADER ||-----------------------//

const Header = ({ handleLeftDrawerToggle }) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            {/* logo & toggler button */}
            <div className={classes.boxContainer}>
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    <LogoSection />
                </Box>
                <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                    <Avatar variant="rounded" className={classes.headerAvatar} onClick={handleLeftDrawerToggle} color="inherit">
                        <IconMenu2 stroke={1.5} size="1.3rem" />
                    </Avatar>
                </ButtonBase>
            </div>

            <div className={classes.grow} />
            <div className={classes.grow} />

            {/* notification & connect wallet */}
            {/* <NotificationSection /> */}
            <InPageConnectButton />
        </React.Fragment>
    );
};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func
};

export default Header;
