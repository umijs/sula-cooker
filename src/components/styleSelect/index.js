import React from 'react';
import { Typography, Tooltip } from 'antd';
import { history } from 'umi';
import style from './index.less';

const { Title } = Typography;

export default props => {
  const { title, data, mode, id, ...restProps } = props;

  const { hash } = window.location;
  return (
    <div {...restProps}>
      <Title level={4}>{title}</Title>
      {data.map(({ img, type, url, isView }) => {
        if (isView && mode !== 'view') {
          return null;
        }

        const isActive = hash.includes(url);

        return (
          <Tooltip title={type} key={type}>
            <span
              className={[style.card, isActive ? style.activeCard : '']}
              onClick={() => {
                const finalUrl =
                  mode && mode !== 'create' ? `${url}/${mode}/${id}` : url;
                history.push(finalUrl);
              }}
            >
              <img src={img} width="53px" height="46px" />
            </span>
          </Tooltip>
        );
      })}
    </div>
  );
};
