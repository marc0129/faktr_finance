import React from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@material-ui/core';

// project imports
import config from './../../../config';
import Logo from '../../../assets/images/logo-white.png';

//-----------------------|| MAIN LOGO ||-----------------------//

const LogoSection = () => {
    return (
        <ButtonBase disableRipple component={Link} to={config.defaultPath}>
            <img src={Logo} alt='logo' style={{ width: '72px', height: '32px' }} />
        </ButtonBase>
    );
};

export default LogoSection;
