import React from 'react';
import { Popover, Space, Popconfirm, Button } from 'antd';
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
    <Space direction="vertical">
      <Space>
        <Button
          type="primary"
          onClick={() => {
            onSet();
            setVisible(false);
          }}
        >
          属性配置
        </Button>
        {onDelete && (
          <Popconfirm title="确认删除?" onConfirm={onDelete}>
            <Button type="primary" type="primary">
              删除该项
            </Button>
          </Popconfirm>
        )}
      </Space>

      <Space>
        {onAddBefore && (
          <Button type="primary" ghost onClick={onAddBefore}>
            前加一项
          </Button>
        )}
        {onAddAfter && (
          <Button type="primary" ghost onClick={onAddAfter}>
            后加一项
          </Button>
        )}
      </Space>
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
