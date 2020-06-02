import React from 'react';
import { Dropdown, Menu, Tooltip } from 'antd';
import { getLocale } from 'umi';

import styles from './index.less';

export default props => {
  const { handleChangeLanguage } = props;

  const localeUrl = {
    en: 'https://img.alicdn.com/tfs/TB1GdeYri_1gK0jSZFqXXcpaXXa-24-24.png',
    zh: 'https://img.alicdn.com/tfs/TB1AQ50reH2gK0jSZJnXXaT1FXa-24-24.png',
  };

  const menu = (
    <Menu className={styles.localeMenu}>
      <Menu.Item
        onClick={() => {
          handleChangeLanguage('zh-CN');
        }}
      >
        <img src={localeUrl.zh} /> 中文
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          handleChangeLanguage('en-US');
        }}
      >
        <img src={localeUrl.en} /> English
      </Menu.Item>
    </Menu>
  );

  const logoUrl = getLocale() === 'en-US' ? localeUrl.en : localeUrl.zh;

  return (
    <Tooltip title="国际化" style={{ cursor: 'pointer' }}>
      <Dropdown trigger={['click']} overlay={menu} placement="bottomRight">
        <div className={styles.localeLogo}>
          <img src={logoUrl} />
        </div>
      </Dropdown>
    </Tooltip>
  );
};
