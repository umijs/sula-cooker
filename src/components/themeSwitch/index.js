import React from 'react';
import { Dropdown, Menu, Tooltip } from 'antd';
import { SkinOutlined } from '@ant-design/icons';

import styles from './index.less';

export default props => {
  const { handleChangeTheme } = props;

  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          handleChangeTheme('default');
        }}
      >
        Antd
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          handleChangeTheme('bluebird');
        }}
      >
        Sula
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown trigger={['click']} overlay={menu} placement="bottomRight">
      <div className={styles.themeLogo}>
        <Tooltip placement="left" title="主题">
          <SkinOutlined />
        </Tooltip>
      </div>
    </Dropdown>
  );
};
