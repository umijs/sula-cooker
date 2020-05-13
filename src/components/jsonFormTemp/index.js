import React, { useState, useEffect } from 'react';
import { CreateForm, StepForm } from 'sula';
import { merge, isString, get, set, isEmpty } from 'lodash';
import { triggerRenderPlugin } from 'sula/es/rope/triggerPlugin';
import getFormMode from '@/utils/getFormMode';
import FormDrawer from './component/formDrawer';
import ControlDrawer from '@/components/localControlJson';
import Label from '@/components/label';
import ActionWraper from '@/components/actionWrapper';

export default props => {
  const {
    history,
    location,
    match,
    staticContext,
    computedMatch,
    route,
    children,
    ...config
  } = props;
  const [formDrawerVisible, setFormDrawerVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [code, setCode] = useState(config); // 全局代码，透传给Form组件 纯json
  const [mode, setMode] = useState(getFormMode(props));
  const [direction, setDirection] = useState('horizontal');
  const [actionsPosition, setActionsPosition] = useState(
    config.actionsPosition,
  );
  const [flag, setFlag] = useState([0]);
  const [controlValue, setControlValue] = useState({}); // 局部控制jsonEditor的value
  const [key, setKey] = useState(0);
  const [clickType, setClickType] = useState('');
  const [init, setInit] = useState(false);

  const isWizard = !!(code && code.steps);

  const getLabel = (data, ...rest) => {
    const { field = {} } = data || {};
    const clickType = isString(field) ? field : field.type;
    return (
      <Label
        key={rest.join('-')}
        onSet={() => {
          setControlValue(data);
          setFlag(rest);
          setVisible(true);
          setClickType(clickType);
        }}
      >
        {data.label}
      </Label>
    );
  };

  const getLabelFields = (data, arr = []) => {
    if (!data) return [];
    return data.map((v, idx) => {
      const { fields, steps } = v;
      const idxArr = [...arr, idx];
      if (fields) {
        return {
          ...v,
          fields: getLabelFields(fields, idxArr),
        };
      }

      if (steps) {
        const newSteps = steps.map((ele, index) => {
          const { fields } = ele;
          const newFields = fields.map((field, i) => {
            return {
              ...field,
              label: getLabel(field, idx, index, i),
            };
          });
          return {
            ...ele,
            fields: newFields,
          };
        });
        return {
          ...v,
          steps: newSteps,
        };
      }

      return {
        ...v,
        label: getLabel(v, ...idxArr),
      };
    });
  };

  const getFieldsConfig = data => {
    const { steps, fields } = data;
    return isWizard
      ? { steps: getLabelFields(steps), fields: [] }
      : { fields: getLabelFields(fields) };
  };

  const [labelCode, setLabelCode] = useState({
    ...code,
    ...getFieldsConfig(config),
  });

  useEffect(() => {
    setInit(true);
  }, []);

  useEffect(() => {
    const newLabelCode = { ...code };
    setLabelCode({ ...newLabelCode, ...getFieldsConfig(code) });
    if (init) {
      setKey(key + 1);
    }
  }, [code]);

  const { id = 19 } = props.match.params;

  const handleDo = val => {
    setCode(val);
    setFormDrawerVisible(false);
  };

  const remoteValues = {
    params: {
      id,
    },
  };

  const Comp = isWizard ? StepForm : CreateForm;

  const onRun = val => {
    const { name: oldName } = controlValue;
    const { name, ...restVal } = { ...val };
    const newVal = oldName ? { name: oldName, ...restVal } : val;
    const { steps } = { ...code };
    if (isWizard) {
      if (steps[flag[0]].steps) {
        steps[flag[0]].steps[flag[1]].fields[flag[2]] = newVal;
      } else {
        steps[flag[0]].fields[flag[1]] = newVal;
      }
      setCode({ ...code, steps });
    } else {
      const newFlag =
        clickType === 'actionsRender'
          ? flag
          : flag.map(v => ['fields', v]).flat();
      setCode(set({ ...code }, newFlag, newVal));
    }
    setVisible(false);
    setKey(key + 1);
  };

  const onModeChange = mode => {
    setMode(mode);
    setFormDrawerVisible(false);
    setKey(key + 1);
  };

  const onDirectionChange = direction => {
    setDirection(direction);
    setFormDrawerVisible(false);
    setKey(key + 1);
  };

  const onActionsPositionChange = position => {
    setActionsPosition(position);
    setFormDrawerVisible(false);
    setKey(key + 1);
  };

  const onDoubleClick = (data, namePath) => {
    setControlValue(data);
    setFlag(namePath);
    setVisible(true);
    setClickType(namePath[0]);
  };

  const getClickItem = (data, name) => {
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
    const { actionsRender, ...restProps } = { ...data };
    if (!actionsRender) return data;
    return {
      ...restProps,
      actionsRender: getClickItem(actionsRender, 'actionsRender'),
    };
  };

  const wizardDirection = isWizard ? { direction } : {};

  const finalConfig = merge(
    getActionConfig(labelCode),
    { remoteValues },
    wizardDirection,
  );

  if (!isEmpty(finalConfig.steps)) {
    delete finalConfig.fields;
  }
  if (!isWizard && isEmpty(finalConfig.fields)) {
    return null;
  }

  return (
    <div>
      <Comp
        {...finalConfig}
        mode={mode}
        actionsPosition={actionsPosition}
        key={key}
      />
      <FormDrawer
        mode={(code && code.mode) || mode}
        direction={direction}
        visible={formDrawerVisible}
        iconVisible={visible}
        onClick={() => setFormDrawerVisible(true)}
        onClose={() => setFormDrawerVisible(false)}
        onRun={handleDo}
        code={code}
        changeMode={onModeChange}
        changeDirection={onDirectionChange}
        isWizard={isWizard}
        actionsPosition={actionsPosition}
        changeActionsPosition={onActionsPositionChange}
      />
      <ControlDrawer
        clickType={clickType}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        value={controlValue}
        onRun={onRun}
        onSelectCode={onRun}
        isFormTemp={true}
      />
    </div>
  );
};
