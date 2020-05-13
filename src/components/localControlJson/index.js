import React from 'react';
import Drawer from '@/components/drawer';
import JsonEditor from '@/components/jsonEditor';

export default props => {
  const {
    visible,
    onClose,
    value,
    onRun,
    onSelectCode,
    clickType,
    isFormTemp,
  } = props;
  const [pluginType, setPluginType] = React.useState(clickType);
  const [newJsonValue, setNewJsonValue] = React.useState(value);

  const getType = clickType => {
    const formType = ['searchFields', 'advancedSearchFields'];
    const otherType = [
      'actions',
      'batchActions',
      'leftActions',
      'quickSearch',
      'footerActions',
    ];

    if (otherType.some(type => type === clickType)) {
      return clickType;
    }

    if (formType.some(type => type === clickType)) {
      return 'form';
    }

    // if (formConfig.some(ele => ele.code.render.type === clickType)) {
    //   const res = formConfig.find(v => v.code.render.type === clickType);
    //   return res && res.viewType;
    // }

    return 'table';
  };

  const type = getType(clickType);

  React.useEffect(() => {
    setPluginType(clickType);
  }, [clickType]);

  React.useEffect(() => {
    setNewJsonValue(value);
  }, [value]);

  const onActionSelectClick = code => {
    setNewJsonValue({ ...newJsonValue, ...code });
  };

  const onClickValueChange = val => {
    const { name } = newJsonValue;
    const newVal = name ? { name, ...val } : val;
    setNewJsonValue(newVal);
  };

  // console.log(`点击字段： ${clickType}, 点击字段所属字段: ${type}, 点击插件: ${pluginType}`);

  return (
    <div>
      <Drawer
        visible={visible}
        width={600}
        closable={false}
        onClose={onClose}
        forceRender
      >
        <JsonEditor
          value={newJsonValue}
          onRun={onRun}
          clickType={clickType}
          // type={type}
          pluginType={pluginType}
        />
      </Drawer>
    </div>
  );
};
