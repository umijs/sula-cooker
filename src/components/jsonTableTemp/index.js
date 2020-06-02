import React, { useState } from 'react';
import { Table, QueryTable, StepQueryTable } from 'sula';
import {
  get,
  set,
  isEmpty,
  cloneDeep,
  assign,
  isArray,
  isNumber,
  isPlainObject,
  unset,
} from 'lodash';
import TableDrawer from './component/tableDrawer';
import ControlJsonDrawer from '@/components/jsonEditorDrawer';
import TipsWrapper from '@/components/tipsWrapper';
import { triggerRenderPlugin } from 'sula/es/rope/triggerPlugin';
import { Guide } from '@/components/guide';

export default props => {
  const [tableDrawerVisible, setTableDrawerVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [code, setCode] = useState(props);
  const [flag, setFlag] = useState([]);
  const [clickCode, setClickCode] = useState();
  const [clickType, setClickType] = useState('');
  const [key, setKey] = useState(0);

  const onControlTipClick = (data, namePath) => {
    setClickCode(data);
    setFlag(namePath);
    setVisible(true);
    setClickType('actions');
  };

  function deleteItem(name, idx) {
    const finalCode = { ...code };
    finalCode[name].splice(idx, 1);
    setCode(finalCode);
    setKey(key + 1);
  }

  function addItem(name, index, position = 'left') {
    const finalCode = { ...code };
    const idx = finalCode[name].length + 1;
    let defaultCode;
    switch (name) {
      case 'fields':
        defaultCode = {
          name: 'input' + idx,
          label: 'input' + idx,
          field: 'input',
        };
        break;

      case 'actionsRender':
      case 'leftActionsRender':
        defaultCode = {
          type: 'button',
          props: {
            children: '按钮' + idx,
            type: 'primary',
          },
        };
        break;
      case 'columns':
        defaultCode = {
          key: 'column' + idx,
          title: 'column' + idx,
        };
        break;
      default:
        return;
    }
    finalCode[name].splice(
      position === 'left' ? index : index + 1,
      0,
      defaultCode,
    );
    setCode(finalCode);
    setKey(key + 1);
  }

  function addActionItem(path, index, position = 'left') {
    let finalCode = { ...code };
    let render = get(finalCode, path);
    render = isArray(render) ? render : [render];
    render.splice(position === 'left' ? index : index + 1, 0, {
      type: 'icon',
      props: {
        type: 'edit',
      },
    });
    finalCode = set(finalCode, path, render);
    setCode(finalCode);
    setKey(key + 1);
  }

  const getLabelFields = (data, name) => {
    if (isEmpty(data)) return;
    return data.map((field, index) => {
      const labelRender = (
        <TipsWrapper
          key={field.name}
          title={field.label}
          onSet={() => {
            setClickCode({ ...field });
            setFlag([name, index]);
            setVisible(true);
            setClickType('form');
          }}
          onAddBefore={() => {
            addItem(name, index);
          }}
          onAddAfter={() => {
            addItem(name, index, 'right');
          }}
          onDelete={() => {
            deleteItem(name, index);
          }}
        >
          {field.label}
        </TipsWrapper>
      );
      return {
        ...field,
        label: index ? (
          labelRender
        ) : (
          <Guide tips="鼠标划入表单标题，打开表单配置弹框" step="2">
            {labelRender}
          </Guide>
        ),
      };
    });
  };

  const getClickItem = (data, name) => {
    if (isEmpty(data)) return;
    const finalActions = data.map((action, idx) => {
      return {
        type: ctx => {
          const children = triggerRenderPlugin(ctx, action);
          const actionRender = (
            <TipsWrapper
              onSet={() => onControlTipClick(action, [name, idx])}
              onDelete={() => {
                deleteItem(name, idx);
              }}
              onAddBefore={() => {
                addItem(name, idx);
              }}
              onAddAfter={() => {
                addItem(name, idx, 'right');
              }}
            >
              {children}
            </TipsWrapper>
          );

          if (idx) {
            return actionRender;
          }
          return (
            <Guide step="4" tips="鼠标划入按钮，进行action按钮配置">
              {actionRender}
            </Guide>
          );
        },
      };
    });

    return finalActions;
  };

  const getCellRender = (data, name, index) => {
    if (!data) return;

    if (isPlainObject(data)) {
      return (ctx = {}) => {
        const children = triggerRenderPlugin(ctx, data) || '';
        const idx = isNumber(index)
          ? [...name, 'render', index]
          : [...name, 'render'];
        return (
          <TipsWrapper
            onSet={() => onControlTipClick(data, idx)}
            onDelete={() => {
              const finalCode = { ...code };
              unset(finalCode, idx);
              setCode(finalCode);
              setKey(key + 1);
            }}
            onAddBefore={() => {
              addActionItem([...name, 'render'], index);
            }}
            onAddAfter={() => {
              addActionItem([...name, 'render'], index, 'right');
            }}
          >
            {children}
          </TipsWrapper>
        );
      };
    }

    if (isArray(data)) {
      return data.map((o, idx) => getCellRender(o, name, idx));
    }

    return data;
  };

  const getLabelColumns = (data, name) => {
    if (isEmpty(data)) return;
    return data.map((column, idx) => {
      const { title, render } = column;
      const titleRender = (
        <TipsWrapper
          title={title}
          onSet={() => {
            setClickCode(column);
            setFlag([name, idx]);
            setVisible(true);
            setClickType('columns');
          }}
          onDelete={() => {
            deleteItem(name, idx);
          }}
          onAddBefore={() => {
            addItem(name, idx);
          }}
          onAddAfter={() => {
            addItem(name, idx, 'right');
          }}
        >
          {title}
        </TipsWrapper>
      );
      return {
        ...column,
        title: idx ? (
          titleRender
        ) : (
          <Guide tips="鼠标划入表格标题，打开表格列配置弹框" step="3">
            {titleRender}
          </Guide>
        ),
        render: getCellRender(render, ['columns', idx]),
      };
    });
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
      columns: getLabelColumns(columns, 'columns'),
      fields: getLabelFields(fields, 'fields'),
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
  if (initialPaging === false || pagination === false) {
    Comp = Table;
  } else if (code.steps) {
    Comp = StepQueryTable;
  }

  const finalCode = getActionConfig(code);
  const { remoteDataSource } = finalCode;
  // 防止模板内部代码改变remoteDataSource
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
        width="900"
        key={'config' + key}
      />
      <ControlJsonDrawer
        visible={visible}
        onClose={() => setVisible(false)}
        onRun={onRun}
        value={clickCode}
        onSelectCode={onRun}
        clickType={clickType}
      />
    </div>
  );
};
