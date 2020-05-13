import React from 'react';
import { Affix, Button } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import ThemeContext from '@/layout/themeContext';

export default props => {
  const { onClick } = props;
  const theme = React.useContext(ThemeContext);

  if (theme.hiddenCustomControls) {
    return null;
  }

  return (
    <Affix style={{ position: 'fixed', top: 360, right: 24, zIndex: 1001 }}>
      <Button
        style={{ width: 50, height: 50, lineHeight: '57px' }}
        icon={<SettingOutlined style={{ fontSize: 30 }} />}
        type="primary"
        onClick={onClick}
      />
    </Affix>
  );
};
