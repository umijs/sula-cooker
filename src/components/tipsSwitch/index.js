import React from 'react';
import { Tooltip } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

export default props => {
  const [view, setView] = React.useState(false);
  const { onClick } = props;

  const handleClick = () => {
    setView(view => !view);
    onClick(view);
  };

  return (
    <Tooltip title={view ? '显示配置按钮' : '隐藏配置按钮'}>
      {view ? (
        <EyeOutlined onClick={handleClick} />
      ) : (
        <EyeInvisibleOutlined
          style={{ color: '#d9d9d9' }}
          onClick={handleClick}
        />
      )}
    </Tooltip>
  );
};
