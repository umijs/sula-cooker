import React from 'react';
import { Tooltip } from 'antd';
import ThemeContext from '@/layout/themeContext';

export default props => {
  const { children = '', onSet = () => {} } = props;
  const theme = React.useContext(ThemeContext);

  if (theme.hiddenCustomControls) {
    return <span>{children}</span>;
  }

  return (
    <Tooltip title="双击进行设置">
      <span
        style={{
          userSelect: 'none',
          cursor: 'pointer',
        }}
        onDoubleClick={() => {
          onSet();
        }}
      >
        {children}
      </span>
    </Tooltip>
  );
};
