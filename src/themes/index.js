import { createTheme } from '@material-ui/core/styles';

// assets
import colors from '../assets/scss/_themes-vars.module.scss';

// project imports
import { componentStyleOverrides } from './component-style';
import { themePalette } from './palette';
import { themeTypography } from './typography';

/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */
export function theme(customization) {
    const color = colors;

    let themeOption = {
        colors: color,
        heading: '#666',
        paper: color.paper,
        backgroundDefault: color.paper,
        background: color.orangeLight,
        darkTextPrimary: color.grey400,
        darkTextSecondary: color.grey500,
        textDark: color.grey900,
        menuSelected: color.paper,
        menuSelectedBack: color.main,
        divider: '#666',
        customization: customization
    };

    return createTheme({
        direction: 'ltr',
        palette: themePalette(themeOption),
        mixins: {
            toolbar: {
                minHeight: '48px',
                padding: '16px',
                '@media (min-width: 600px)': {
                    minHeight: '48px'
                }
            }
        },
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 960,
                lg: 1280,
                xl: 1920
            }
        },
        typography: themeTypography(themeOption),
        components: componentStyleOverrides(themeOption)
    });
}

export default theme;
