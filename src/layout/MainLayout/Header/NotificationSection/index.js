import React from 'react';
// import { Link } from 'react-router-dom';

// material-ui
import { makeStyles, useTheme } from '@material-ui/styles';
import {
    Avatar,
    Box,
    // Button,
    ButtonBase,
    // CardActions,
    CardContent,
    ClickAwayListener,
    // Divider,
    Grid,
    Paper,
    Popper,
    Stack,
    // TextField,
    // Typography,
    useMediaQuery
} from '@material-ui/core';

// third-party
// import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from '../../../../ui-component/cards/MainCard';
import Transitions from '../../../../ui-component/extended/Transitions';
// import NotificationList from './NotificationList';

// assets
import { IconBell } from '@tabler/icons';

// style constant
const useStyles = makeStyles((theme) => ({
    ScrollHeight: {
        height: '100%',
        maxHeight: 'calc(100vh - 205px)',
        overflowX: 'hidden'
    },
    headerAvatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        transition: 'all .2s ease-in-out',
        background: theme.palette.common.paper,
        color: theme.palette.common.main,
        '&[aria-controls="menu-list-grow"],&:hover': {
            background: theme.palette.common.main,
            color: theme.palette.common.paper
        }
    },
    cardContent: {
        padding: '0px !important'
    },
    notificationChip: {
        color: theme.palette.background.default,
        backgroundColor: theme.palette.warning.dark
    },
    divider: {
        marginTop: 0,
        marginBottom: 0
    },
    cardAction: {
        padding: '10px',
        justifyContent: 'center'
    },
    paddingBottom: {
        paddingBottom: '16px'
    },
    box: {
        marginLeft: '16px',
        marginRight: '24px',
        [theme.breakpoints.down('sm')]: {
            marginRight: '16px'
        }
    },
    bodyPPacing: {
        padding: '16px 16px 0'
    },
    textBoxSpacing: {
        padding: '0px 16px'
    },
    container: {
        marginTop: '5px',
        minWidth: '300px',
        minHeight: '500px'
    }

}));

// notification status options
// const status = [
//     {
//         value: 'all',
//         label: 'All Notification'
//     },
//     {
//         value: 'new',
//         label: 'New'
//     },
//     {
//         value: 'unread',
//         label: 'Unread'
//     },
//     {
//         value: 'other',
//         label: 'Other'
//     }
// ];

//-----------------------|| NOTIFICATION ||-----------------------//

const NotificationSection = () => {
    const classes = useStyles();
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('sm'));

    const [open, setOpen] = React.useState(false);
    // const [ value,setValue] = React.useState('');
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    // const handleChange = (event) => {
    //     setValue(event.target.value);
    // };

    return (
        <React.Fragment>
            <Box component="span" className={classes.box}>
                <ButtonBase sx={{ borderRadius: '12px' }}>
                    <Avatar
                        variant="rounded"
                        className={classes.headerAvatar}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        color="inherit"
                    >
                        <IconBell stroke={1.5} size="1.3rem" />
                    </Avatar>
                </ButtonBase>
            </Box>
            <Popper
                placement={matchesXs ? 'bottom' : 'bottom-end'}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [matchesXs ? 5 : 0, 20]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions in={open} {...TransitionProps}>
                        <Paper >
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard className={classes.container} border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                    <CardContent className={classes.cardContent}>
                                        <Grid container direction="column" spacing={2}>
                                            <Grid item xs={12}>
                                                <div className={classes.bodyPPacing}>
                                                    <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                                                        <Grid item>
                                                            <Stack direction="row" spacing={2}>
                                                                {/* <Typography variant="subtitle1">Notification</Typography> */}

                                                            </Stack>
                                                        </Grid>
                                                        {/* <Grid item>
                                                            <Typography component={Link} to="#" variant="subtitle2" color="inherit">
                                                                Mark as all read
                                                            </Typography>
                                                        </Grid> */}
                                                    </Grid>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                    {/* <Divider /> */}
                                    {/* <CardActions className={classes.cardAction}>
                                        <Button size="small" disableElevation>
                                            View All
                                        </Button>
                                    </CardActions> */}
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </React.Fragment>
    );
};

export default NotificationSection;
