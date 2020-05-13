import React from 'react';
import { Tooltip } from 'antd';
import { QuestionOutlined } from '@ant-design/icons';
import ThemeContext from '@/layout/themeContext';
import style from './index.less';

export default props => {
  const { className, children, ...restProps } = props;
  const theme = React.useContext(ThemeContext);

  if (theme.hiddenCustomControls) {
    return children;
  }

  return (
    <span {...restProps} className={`${style.holderWrapper} ${className}`}>
      <Tooltip title="双击进行设置">
        <div className={style.holder}></div>
        <QuestionOutlined className={style.icon} />
      </Tooltip>
      <div>{children}</div>
    </span>
  );
};
