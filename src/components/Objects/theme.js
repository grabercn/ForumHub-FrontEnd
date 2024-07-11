import { createTheme } from '@mui/material/styles';

/**
 * Function to convert RGB color to hexadecimal format.
 * @param {string} rgb - The RGB color string in the format 'rgb(r, g, b)'.
 * @returns {string} - The hexadecimal color string.
 */
function rgbToHex(rgb) {
    const regex = /^rgb\((\d+\.?\d*),\s*(\d+\.?\d*),\s*(\d+\.?\d*)\)$/; // Updated regex to allow decimal numbers
    const match = rgb.match(regex);

    if (!match) {
        throw new Error(`Invalid RGB color format: ${rgb}`);
    }

    const r = Math.round(parseFloat(match[1]));
    const g = Math.round(parseFloat(match[2]));
    const b = Math.round(parseFloat(match[3]));

    if (isNaN(r) || isNaN(g) || isNaN(b) || r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
        throw new Error(`Invalid RGB color values: ${r}, ${g}, ${b}`);
    }

    const rHex = r.toString(16).padStart(2, '0');
    const gHex = g.toString(16).padStart(2, '0');
    const bHex = b.toString(16).padStart(2, '0');

    return `#${rHex}${gHex}${bHex}`.toUpperCase();
}

/**
 * Function to lighten a hexadecimal color.
 * @param {string} hex - The hexadecimal color string to lighten.
 * @param {number} amount - The amount by which to lighten the color (0 to 1).
 * @returns {string} - The lightened hexadecimal color string.
 */
function lighten(hex, amount) {
    let rgb = hexToRgb(hex);
    rgb.r += Math.floor(amount * (255 - rgb.r));
    rgb.g += Math.floor(amount * (255 - rgb.g));
    rgb.b += Math.floor(amount * (255 - rgb.b));

    rgb.r = Math.min(rgb.r, 255);
    rgb.g = Math.min(rgb.g, 255);
    rgb.b = Math.min(rgb.b, 255);

    return rgbToHex(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
}

/**
 * Function to convert hexadecimal color to RGB format.
 * @param {string} hex - The hexadecimal color string.
 * @returns {Object} - An object with r, g, b values representing RGB components.
 */
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// Initialize primary color as null initially
let primaryColor = null;

/**
 * Function to set the primary color.
 * @param {string} color - The primary color in RGB format.
 */
export const setPrimaryColor = (color) => {
    primaryColor = color;
};

/**
 * Function to check if it's night time based on user's color scheme preference.
 * @returns {boolean} - True if it's night time, false otherwise.
 */
export const isNightMode = () => {
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    console.log(prefersDarkMode)

    return prefersDarkMode;
};

/**
 * Function to create the custom MUI theme.
 * Uses primary color set by setPrimaryColor() and switches to dark mode at night.
 * Lightens the primary color for better visibility in dark mode.
 * Applies backdrop blur to the root element and excludes <MenuItem>.
 * @returns {Object} - The created Material-UI theme object.
 */
export const createCustomTheme = () => {
    // Determine if it's night time
    const isNight = isNightMode();

    // Convert the RGB color to hexadecimal
    let hexColor = '#1976d2'; // Default to blue if primaryColor is not set

    if (primaryColor) {
        hexColor = rgbToHex(primaryColor.toString());
    }

    // Lighten the primary color for dark mode
    const lightenHexColor = lighten(hexColor, 0.3); // Adjust the lightness factor as needed

    // Create the theme based on day/night mode
    const theme = createTheme({
        palette: {
            mode: isNight ? 'dark' : 'light', // Use dark mode at night, light mode during the day
            primary: {
                main: isNight ? lightenHexColor : hexColor, // Use the lightened color in dark mode
            },
            secondary: {
                main: '#f0f8ff', // Add a secondary color
            },
            // Add more palette options (secondary, error, etc.) as needed
        },
        components: {
            MuiBackdrop: {
                styleOverrides: {
                    root: {
                        backdropFilter: 'blur(8px)', // Apply backdrop blur to the root element
                    },
                    '& .MuiMenu-paper': {
                        backdropFilter: 'none', // Exclude backdrop filter for Menu items
                    },
                    
                },
            },
        },
    });

    return theme;
};
