import React, { useState } from 'react';
import { Form } from 'sula';
import { message, Popover, Collapse, Space, Button, Col } from 'antd';
import copy from 'copy-to-clipboard';
import { isEmpty, isNumber } from 'lodash';
import { TextArea, RadioGroup } from './components';

const initialLayoutValue = {
  fieldCount: 3,
  layout: 'horizontal',
  iSpan: 0,
  cols: 3,
};

const initialSingleValue = {
  hiddenLabel: false,
  span: undefined,
  wSpan: undefined,
  offset: undefined,
  lOffset: undefined,
  wOffset: undefined,
  showOffsetSetting: false,
};

export default () => {
  const [fieldList, setFieldList] = useState([]);
  const [layoutConfig, setLayoutConfig] = useState(initialLayoutValue);

  const layoutFormRef = React.useRef();

  const formLayoutConfig = {
    ref: layoutFormRef,
    container: 'card',
    onValuesChange: (value, values) => {
      setLayoutConfig(values);
    },
    initialValues: initialLayoutValue,
    itemLayout: {
      span: 12,
    },
    fields: [
      {
        name: 'fieldCount',
        label: '表单项数量',
        field: {
          type: 'inputnumber',
          props: {
            min: 1,
            max: 8,
          },
        },
      },
      {
        name: 'layout',
        label: '布局',
        field: () => {
          return <RadioGroup source={['horizontal', 'vertical', 'inline']} />;
        },
      },
      {
        name: 'cols',
        label: 'cols（多列布局）',
        field: {
          type: 'slider',
          props: {
            style: { width: '80%' },
            min: 0,
            max: 4,
            dots: true,
          },
        },
      },
      {
        name: 'iSpan',
        label: '每项表单占位栅格数',
        field: {
          type: 'slider',
          props: {
            style: { width: '80%' },
            min: 0,
            max: 24,
            dots: true,
            step: 2,
          },
        },
        dependency: {
          value: {
            relates: [['cols']],
            inputs: ['*'],
            output: 0,
          },
        },
      },
      {
        name: 'lSpan',
        label: '标题占位格数',
        field: {
          type: 'slider',
          props: {
            style: { width: '80%' },
            min: 0,
            max: 24,
            dots: true,
            step: 2,
          },
        },
      },
      {
        name: 'wSpan',
        label: '表单控件占位格数',
        field: {
          type: 'slider',
          props: {
            style: { width: '80%' },
            min: 0,
            max: 24,
            dots: true,
            step: 2,
          },
        },
      },
      {
        label: true,
        colon: false,
        render: [
          {
            type: 'button',
            props: {
              children: '获取配置',
              onClick: onCopy,
              type: 'primary',
            },
          },
          {
            type: 'button',
            props: {
              children: '重置',
              onClick: () => {},
            },
          },
        ],
      },
    ],
  };

  const { iSpan, lSpan, wSpan, fieldCount, layout, cols } = layoutConfig;

  const fields = new Array(fieldCount).fill(0).map((v, idx) => {
    const content = (
      <Form
        initialValues={fieldList[idx] || initialSingleValue}
        style={{ minWidth: 300 }}
        itemLayout={{
          labelCol: {
            span: 12,
          },
        }}
        fields={[
          {
            name: 'hiddenLabel',
            label: '隐藏标题',
            field: 'switch',
            valuePropName: 'checked',
          },
          {
            name: 'span',
            label: '该项占位格数',
            field: {
              type: 'inputnumber',
              props: {
                max: 24,
                min: 0,
              },
            },
          },
          {
            name: 'lSpan',
            label: '标题占位格数',
            field: {
              type: 'inputnumber',
              props: {
                max: 24,
                min: 0,
              },
            },
            dependency: {
              value: {
                relates: ['hiddenLabel'],
                inputs: [[true]],
                output: 0,
              },
            },
          },
          {
            name: 'wSpan',
            label: '表单控件占位格数',
            field: {
              type: 'inputnumber',
              props: {
                max: 24,
                min: 0,
              },
            },
          },
          {
            name: 'showOffsetSetting',
            label: '显示偏移配置',
            valuePropName: 'checked',
            field: 'switch',
          },
          {
            name: 'spangroup',
            initialVisible: false,
            dependency: {
              visible: {
                relates: ['showOffsetSetting'],
                inputs: [[true]],
                output: true,
                defaultOutput: false,
              },
            },
            fields: [
              {
                name: 'offset',
                label: '左侧间隔格数',
                field: {
                  type: 'inputnumber',
                  props: {
                    max: 24,
                    min: 0,
                    allowClear: true,
                  },
                },
              },
              {
                name: 'lOffset',
                label: '标题左侧间隔格数',
                field: {
                  type: 'inputnumber',
                  props: {
                    max: 24,
                    min: 0,
                    allowClear: true,
                  },
                },
              },
              {
                name: 'wOffset',
                label: '表单控件左侧间隔格数',
                field: {
                  type: 'inputnumber',
                  props: {
                    max: 24,
                    min: 0,
                    allowClear: true,
                  },
                },
              },
            ],
          },
        ]}
        actionsPosition="right"
        actionsRender={[
          {
            type: 'button',
            props: {
              children: '确认',
              type: 'primary',
            },
            action: (ctx) => {
              const values = ctx.form.getFieldsValue();
              updateFieldList(values, idx);
            },
          },
          {
            type: 'button',
            props: {
              children: '重置',
            },
            action: (ctx) => {
              // 因为initialValues使用的fieldList，所以不能用reset
              ctx.form.setFieldsValue(initialSingleValue);
              updateFieldList(initialSingleValue, idx);
            },
          },
        ]}
      />
    );

    const {
      hiddenLabel,
      span,
      offset,
      lOffset,
      wOffset,
      lSpan: itemLSpan,
      wSpan: itemWSpan,
      textareaProps,
      ...restFieldConfig
    } = fieldList[idx] || {};

    return {
      name: 'field' + idx,
      ...(!hiddenLabel
        ? { label: 'field' + idx }
        : { label: true, colon: false }),
      itemLayout: {
        ...(span ? { span } : {}),
        ...(isNumber(offset) ? { offset } : {}),
        ...(isNumber(itemLSpan) || isNumber(lOffset)
          ? {
              labelCol: {
                span: itemLSpan,
                offset: lOffset,
              },
            }
          : {}),
        ...(isNumber(itemWSpan) || isNumber(wOffset)
          ? {
              wrapperCol: {
                span: itemWSpan,
                offset: wOffset,
              },
            }
          : {}),
      },
      field: () => (
        <Popover title="属性配置" placement="right" content={content}>
          <div>
            {/** 加div保证popover显示 */}
            <TextArea {...textareaProps} />
          </div>
        </Popover>
      ),
      ...restFieldConfig,
    };
  });

  function updateFieldList(value, idx) {
    let finalFieldList = [...fieldList];
    if (!finalFieldList[idx]) {
      finalFieldList[idx] = {};
    }
    finalFieldList[idx] = value;
    setFieldList(finalFieldList);
  }

  const config = {
    container: {
      type: 'card',
    },
    layout,
    // 这里不允许是0，影响体验
    itemLayout: {
      cols,
      ...(iSpan ? { span: iSpan } : {}),
      ...(lSpan
        ? {
            labelCol: {
              span: lSpan,
            },
          }
        : {}),
      ...(wSpan
        ? {
            wrapperCol: {
              span: wSpan,
            },
          }
        : {}),
    },
    fields,
  };

  function onCopy() {
    const { fields, container, ...restConfig } = config;
    const finalFields = fields.map(({ field, itemLayout, ...restField }) => ({
      field: 'input',
      ...restField,
      ...(isEmpty(itemLayout) ? {} : { itemLayout }),
    }));

    const finalConfig = JSON.stringify(
      {
        ...restConfig,
        fields: finalFields,
      },
      null,
      2,
    );

    console.log(finalConfig);
    copy(finalConfig);
    message.success('JSON Copied 🎉');
  }

  function updateLayout(updateConfig, fieldListConifg = []) {
    setLayoutConfig(updateConfig);
    layoutFormRef.current.setFieldsValue(updateConfig);
    setFieldList(fieldListConifg);
  }

  return (
    <div>
      <Form {...formLayoutConfig} />

      <Collapse title="推荐布局" style={{ marginTop: 16 }}>
        <Collapse.Panel header="推荐布局">
          <Space>
            <Button
              onClick={() => {
                updateLayout({
                  cols: 1,
                  fieldCount: 3,
                });
              }}
            >
              单列
            </Button>
            <Button
              onClick={() => {
                updateLayout({
                  cols: 2,
                  fieldCount: 4,
                });
              }}
            >
              双列
            </Button>
            <Button
              onClick={() => {
                updateLayout({
                  cols: 3,
                  fieldCount: 3,
                });
              }}
            >
              三列
            </Button>
            <Button
              onClick={() => {
                updateLayout(
                  {
                    cols: 1,
                    fieldCount: 3,
                  },
                  [
                    {},
                    {},
                    {
                      hiddenLabel: true,
                    },
                  ],
                );
              }}
            >
              无label对齐
            </Button>
            <Button
              onClick={() => {
                updateLayout(
                  {
                    cols: 1,
                    fieldCount: 3,
                    wSpan: 6,
                  },
                  [
                    {},
                    {},
                    {
                      hiddenLabel: true,
                      wSpan: 7,
                      lSpan: 7,
                      textareaProps: {
                        style: {
                          height: 120,
                        },
                      },
                    },
                  ],
                );
              }}
            >
              无label居中
            </Button>
          </Space>
        </Collapse.Panel>
      </Collapse>

      <Form style={{ marginTop: 16 }} {...config} />
    </div>
  );
};
