import React from 'react';

export const theme = {
  hiddenCustomControls: false,
  hiddenGuideTips: false,
  toggleGuideTips: () => {},
};

const ThemeContext = React.createContext(theme);

export default ThemeContext;

export const GUIDE = 'sula-guide';
export const DONE = 'sula-guide-done-01';
