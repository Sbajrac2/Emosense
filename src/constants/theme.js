export const COLORS = {
  // Primary colors from the design
  lightGreen: '#E8F5E8', // Background color
  lightBlue: '#B8D4F8', // Button and card backgrounds
  darkBlue: '#2E5BBA', // Text and icons
  pink: '#FFB6C1', // Summary screens
  yellow: '#FFD700', // Road markers and accents
  orange: '#FFA500', // Progress indicators
  red: '#FF0000', // Stop signs
  grey: '#808080', // Road and inactive elements
  lightGrey: '#D3D3D3', // Borders and inactive elements
  black: '#000000', // Text
  white: '#FFFFFF', // Text on colored backgrounds
  
  // Additional colors
  teal: '#008080',
  magenta: '#FF00FF',
};

export const SIZES = {
  // Font sizes
  base: 16,
  small: 14,
  large: 18,
  xlarge: 24,
  xxlarge: 32,
  
  // Spacing
  padding: 16,
  margin: 16,
  radius: 12,
  
  // Screen dimensions
  width: '100%',
  height: '100%',
};

export const FONTS = {
  regular: {
    fontFamily: 'System',
    fontWeight: 'normal',
  },
  medium: {
    fontFamily: 'System',
    fontWeight: '500',
  },
  bold: {
    fontFamily: 'System',
    fontWeight: 'bold',
  },
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // Web-specific shadow
    boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.25)',
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
    // Web-specific shadow
    boxShadow: '0px 4px 4.65px rgba(0, 0, 0, 0.30)',
  },
};
