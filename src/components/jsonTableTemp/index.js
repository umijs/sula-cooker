import React, { useState } from 'react';
import { Table, QueryTable, StepQueryTable } from 'sula';
import {
  merge,
  isString,
  get,
  set,
  omit,
  isEmpty,
  cloneDeep,
  assign,
} from 'lodash';
import TableDrawer from './component/tableDrawer';
import ControlJsonDrawer from '@/components/localControlJson';
import ActionWraper from '@/components/actionWrapper';
import Label from '@/components/label';
import { triggerRenderPlugin } from 'sula/es/rope/triggerPlugin';

export default props => {
  const { ...defaultConfig } = props;
  const [tableDrawerVisible, setTableDrawerVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [code, setCode] = useState(defaultConfig);
  const [flag, setFlag] = useState([]);
  const [clickCode, setClickCode] = useState();
  const [key, setKey] = useState(0);
  const [clickType, setClickType] = useState('');

  const onDoubleClick = (data, namePath) => {
    setClickCode(data);
    setFlag(namePath);
    setVisible(true);
    setClickType(namePath[0]);
  };

  const getLabelFields = (data, flag = 'columns') => {
    if (isEmpty(data)) return;
    return data.map((field, index) => {
      const isColumns = flag === 'columns';
      const title = isColumns ? field.title : field.label;
      const key = isColumns ? 'title' : 'label';
      if (isString(title)) {
        return {
          ...field,
          [key]: (
            <Label
              onSet={() => {
                setClickCode(field);
                setFlag([flag, index]);
                setVisible(true);
                setClickType(isColumns ? field.key || 'id' : flag);
              }}
            >
              {title}
            </Label>
          ),
        };
      }
      return field;
    });
  };

  const getClickItem = (data, name) => {
    if (isEmpty(data)) return;
    const finalActions = data.map((action, idx) => {
      return {
        type: ctx => {
          const children = triggerRenderPlugin(ctx, action);
          return (
            <ActionWraper
              onDoubleClick={() => onDoubleClick(action, [name, idx])}
            >
              {children}
            </ActionWraper>
          );
        },
      };
    });

    return finalActions;
  };

  const getActionConfig = data => {
    const {
      columns = [],
      actionsRender = [],
      fields,
      leftActionsRender = [],
      ...restProps
    } = {
      ...data,
    };
    return {
      ...restProps,
      fields: getLabelFields(fields, 'fields'),
      columns: getLabelFields(columns),
      actionsRender: getClickItem(actionsRender, 'actionsRender'),
      leftActionsRender: getClickItem(leftActionsRender, 'leftActionsRender'),
    };
  };

  const handleDo = val => {
    setCode(val);
    setTableDrawerVisible(false);
    setKey(key + 1);
  };

  const onRun = val => {
    const oldName = get(code, [...flag, 'name']);
    const { name, ...resVal } = val;
    const newVal = oldName ? { name: oldName, ...resVal } : val;
    setCode(set({ ...code }, flag, newVal));
    setKey(key + 1);
    setVisible(false);
  };

  const { initialPaging = {} } = code;
  const { pagination } = initialPaging;

  let Comp = QueryTable;
  if (pagination === false) {
    Comp = Table;
  } else if (code.steps) {
    Comp = StepQueryTable;
  }

  const finalCode = getActionConfig(code);
  const { remoteDataSource } = finalCode;
  const finalDataSource = cloneDeep(remoteDataSource);

  return (
    <div>
      <Comp
        {...assign(finalCode, { remoteDataSource: finalDataSource })}
        key={key}
      />
      <TableDrawer
        visible={tableDrawerVisible}
        onClick={() => setTableDrawerVisible(true)}
        onClose={() => setTableDrawerVisible(false)}
        onRun={handleDo}
        code={code}
        iconVisible={visible}
      />
      <ControlJsonDrawer
        visible={visible}
        onClose={() => setVisible(false)}
        onRun={onRun}
        value={omit(clickCode, ['style'])}
        onSelectCode={onRun}
        clickType={clickType}
      />
    </div>
  );
};
