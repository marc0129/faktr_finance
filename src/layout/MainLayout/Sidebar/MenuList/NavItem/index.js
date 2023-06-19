import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import ListItemButton from '@material-ui/core/ListItemButton';

// project imports
import { MENU_OPEN } from '../../../../../store/actions';

// style constant
const useStyles = makeStyles((theme) => ({
    listCustomIcon: {
        minWidth: '18px',
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    listItem: {
        marginBottom: '10px',
        alignItems: 'center'
    },
    listItemNoBack: {
        marginBottom: '5px',
        backgroundColor: 'transparent !important',
        paddingTop: '8px',
        paddingBottom: '8px',
        alignItems: 'flex-start'
    },
    subMenuCaption: {
        ...theme.typography.subMenuCaption
    }
}));

//-----------------------|| SIDEBAR MENU LIST ITEMS ||-----------------------//

const NavItem = ({ item, level }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customization);
    // const matchesSM = useMediaQuery((theme) => theme.breakpoints.down('md'));

    const Icon = item.icon;
    const itemIcon = (
        <Icon stroke={1.5} size="1.3rem" className={classes.listCustomIcon} />
    )

    let itemTarget = '';

    if (item.target) {
        itemTarget = '_blank';
    }

    let listItemProps = { component: React.forwardRef((props, ref) => <Link {...props} to={item.url} />) };
    if (item.external) {
        listItemProps = { component: 'a', href: item.url };
    }

    // active menu item on page load
    React.useEffect(() => {
        const currentIndex = document.location.pathname
            .toString()
            .split('/')
            .findIndex((id) => id === item.id);
        if (currentIndex > -1) {
            dispatch({ type: MENU_OPEN, id: item.id });
        }
        // eslint-disable-next-line
    }, [document.location.pathname]);

    return (
        <ListItemButton
            {...listItemProps}
            disabled={item.disabled}
            className={level > 1 ? classes.listItemNoBack : classes.listItem}
            sx={{ borderRadius: customization.borderRadius + 'px' }}
            selected={customization.isOpen.findIndex((id) => id === item.id) > -1}
            target={itemTarget}
            style={{ paddingLeft: level * 23 + 'px' }}
        >
            <ListItemIcon >{itemIcon}</ListItemIcon>
            <ListItemText
                primary={
                    <Typography variant={customization.isOpen.findIndex((id) => id === item.id) > -1 ? 'h5' : 'body1'} color="inherit">
                        {item.title}
                    </Typography>
                }
            />
        </ListItemButton>
    );
};

NavItem.propTypes = {
    item: PropTypes.object,
    level: PropTypes.number
};

NavItem.displayName = "NavItem";

export default NavItem;
