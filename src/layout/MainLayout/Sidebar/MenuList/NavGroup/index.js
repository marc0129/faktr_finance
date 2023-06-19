import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Divider, List, Typography } from '@material-ui/core';

// project imports
import NavItem from './../NavItem';

// style constant
const useStyles = makeStyles((theme) => ({
    menuCaption: {
        ...theme.typography.menuCaption
    },
    menuDivider: {
        marginTop: '2px',
        marginBottom: '10px'
    }
}));

//-----------------------|| SIDEBAR MENU LIST GROUP ||-----------------------//

const NavGroup = ({ item }) => {
    const classes = useStyles();


    const items = item.children.map((menu) => {
        return <NavItem key={menu.title} item={menu} level={1} />;
    });

    return (
        <React.Fragment>
            <List
                subheader={
                    item.title && (
                        <Typography variant="caption" className={classes.menuCaption} display="block" gutterBottom>
                            {item.title}
                        </Typography>
                    )
                }>
                {items}
            </List>
            {/* group divider */}
            <Divider className={classes.menuDivider} />
        </React.Fragment>
    );
};

NavGroup.propTypes = {
    item: PropTypes.object
};

export default NavGroup;
