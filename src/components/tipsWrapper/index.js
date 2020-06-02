import React from 'react';
import { Popover, Space, Popconfirm } from 'antd';
import ThemeContext from '@/layout/themeContext';

export default props => {
  const {
    title = '',
    onSet,
    onAddBefore,
    onAddAfter,
    onDelete,
    children,
    ...restProps
  } = props;
  const [visible, setVisible] = React.useState(false);

  const theme = React.useContext(ThemeContext);

  if (theme.hiddenCustomControls) {
    return children;
  }

  const getTitle = (title = '') => {
    return <span>点击按钮配置{title && ` ${title} `}</span>;
  };

  const content = (
    <Space>
      <a
        onClick={() => {
          onSet();
          setVisible(false);
        }}
      >
        属性配置
      </a>
      {onAddBefore && <a onClick={onAddBefore}>前加一项</a>}
      {onAddAfter && <a onClick={onAddAfter}>后加一项</a>}
      {onDelete && (
        <Popconfirm title="确认删除?" onConfirm={onDelete}>
          <a>删除该项</a>
        </Popconfirm>
      )}
    </Space>
  );

  return (
    <Popover
      placement="rightTop"
      {...restProps}
      trigger="hover"
      title={getTitle(title)}
      content={content}
      visible={visible}
      onVisibleChange={() => {
        setVisible(!visible);
      }}
    >
      <span style={{ cursor: 'pointer' }}>{children}</span>
    </Popover>
  );
};
