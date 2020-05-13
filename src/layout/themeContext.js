import React from 'react';

export const theme = {
  hiddenCustomControls: false,
};

const ThemeContext = React.createContext(theme.hiddenCustomControls);

export default ThemeContext;
