import React from 'react';

import NavGroup from './NavGroup';
import menuItem from '../../../../constants/menu';

//-----------------------|| SIDEBAR MENU LIST ||-----------------------//

const MenuList = () => {
    const navItems = menuItem.map((item) => {
        return <NavGroup key={item.title} item={item} />;
    });

    return navItems;
};

export default MenuList;
