import React from 'react';
import { Drawer } from 'antd';

export default props => {
  const { children, ...restProps } = props;

  return (
    <Drawer mask closable={false} forceRender {...restProps}>
      {children}
    </Drawer>
  );
};
