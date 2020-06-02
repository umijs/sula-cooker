import React from 'react';
import { Card, Input, Tabs, Tooltip } from 'antd';
import formConfig from './sulaconfig/fieldPlugins';
import renderConfig from './sulaconfig/renderPlugins';
import columnsConfig from './sulaconfig/columns';
import actionsConfig from './sulaconfig/actions';

import style from './index.less';

const sulaPluginConfig = {
  form: formConfig, // 对应field变更，name label不变
  actions: renderConfig, // actions配置，对应render类型变更，action属性不变
  columns: columnsConfig, // columns配置，只变更render属性
  // actionsConfig // 只变更配置中的action属性
};

const { Search } = Input;
const { Meta } = Card;
const { TabPane } = Tabs;

export default props => {
  const {
    onClickTypeChange = () => {},
    onEditorValueChange = () => {},
    type = 'form',
    hasField,
    isColumnsType,
  } = props;

  const [plugins = [], setPlugins] = React.useState(sulaPluginConfig[type]);
  const [actionPlugins = [], setActionPlugins] = React.useState(actionsConfig);

  const onChange = e => {
    const val = e.target.value;
    const newPlugins = sulaPluginConfig[type].filter(v => v.type.includes(val));
    setPlugins(newPlugins);
    setActionPlugins(actionsConfig.filter(v => v.type.includes(val)));
  };

  const tablePaneRender = (data, isAction = false) => {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {data.map(plugin => {
          return (
            <PluginCard
              plugin={plugin}
              key={plugin.type}
              isAction={isAction}
              onClickTypeChange={onClickTypeChange}
              onEditorValueChange={onEditorValueChange}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <Search
        style={{ marginBottom: 8 }}
        placeholder="Search Plugin Type"
        onChange={onChange}
      />
      <Tabs>
        <TabPane tab="Plugins" key="1">
          {tablePaneRender(plugins)}
        </TabPane>
        {!hasField && !isColumnsType && (
          <TabPane tab="Actions" key="2">
            {tablePaneRender(actionPlugins, true)}
          </TabPane>
        )}
      </Tabs>
    </div>
  );
};

function PluginCard(props) {
  const {
    plugin = {},
    onClickTypeChange,
    onEditorValueChange,
    isAction = false,
  } = props;
  const {
    avatar = 'https://img.alicdn.com/tfs/TB1BQlopUY1gK0jSZFCXXcwqXXa-56-50.svg',
    type = '',
    desc = '',
    code = '',
  } = plugin;
  return (
    <Card
      key={type}
      className={style.card}
      onClick={() => {
        onClickTypeChange(type);
        onEditorValueChange(code, isAction);
      }}
    >
      <Meta
        avatar={
          <a>
            <img src={avatar} />
          </a>
        }
        title={type}
        description={
          <div>
            <div>{desc}</div>
            {/* <Tooltip title="点击查看文档" className={style.icon}>
              "question-circle"
            </Tooltip> */}
          </div>
        }
      />
    </Card>
  );
}
