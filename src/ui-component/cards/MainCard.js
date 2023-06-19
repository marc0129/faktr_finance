import PropTypes from 'prop-types';
import React from 'react';

import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';

// constant
const headerSX = {
    marginLeft: '30px',
    '& .MuiCardHeader-action': { mr: 0 }
};

//-----------------------|| CUSTOM MAIN CARD ||-----------------------//

const MainCard = React.forwardRef(
    (
        {
            border = true,
            boxShadow,
            children,
            content = true,
            contentClass,
            contentSX,
            darkTitle,
            secondary,
            shadow,
            sx = {},
            title,
            ...others
        },
        ref
    ) => {

        return (
            <Card
                ref={ref}
                {...others}
                sx={{
                    backgroundColor: 'rgb(252 253 253)',
                    ...sx
                }}
            >
                {/* card header and action */}
                {!darkTitle && title && <CardHeader sx={headerSX} title={<Typography variant='cardTitle'>{title}</Typography>} action={secondary} />}


                {/* card content */}
                {content && (
                    <CardContent sx={contentSX} className={contentClass}>
                        {children}
                    </CardContent>
                )}
                {!content && children}
            </Card>
        );
    }
);

MainCard.propTypes = {
    border: PropTypes.bool,
    boxShadow: PropTypes.bool,
    children: PropTypes.node,
    content: PropTypes.bool,
    contentClass: PropTypes.string,
    contentSX: PropTypes.object,
    darkTitle: PropTypes.bool,
    secondary: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
    shadow: PropTypes.string,
    sx: PropTypes.object,
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object])
};

MainCard.displayName = 'MainCard';
export default MainCard;
