import React from 'react';
import CreateForm from '@/components/jsonFormTemp';
import { useIntl } from 'umi';

const source = [
  { text: 'ruler', value: 'ruler' },
  { text: 'sula', value: 'sula' },
];

const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-1',
        key: '0-0-1',
      },
      {
        title: 'Child Node2',
        value: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
  },
];

const cascaderSource = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

const transferSource = [];
for (let i = 0; i < 20; i++) {
  transferSource.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
  });
}

export default props => {
  const inti = useIntl();

  const config = {
    mode: 'create',
    actionsPosition: 'bottom',
    container: {
      type: 'div',
      props: {
        style: {
          maxWidth: 1920,
          margin: '0 auto 56px',
        },
      },
    },
    fields: [
      {
        container: {
          type: 'card',
          props: {
            title: inti.formatMessage({ id: 'plugins_title_text' }),
            style: {
              padding: 0,
              marginBottom: 16,
            },
          },
        },
        fields: [
          {
            name: 'input',
            label: 'input',
            field: {
              type: 'input',
              props: {
                placeholder: inti.formatMessage({
                  id: 'plugins_placeholder_input',
                }),
              },
            },
          },
          {
            name: 'password',
            label: 'password',
            field: {
              type: 'password',
              props: {
                placeholder: inti.formatMessage({
                  id: 'plugins_placeholder_input',
                }),
              },
            },
          },
          {
            name: 'textarea',
            label: 'textarea',
            field: {
              type: 'textarea',
              props: {
                placeholder: inti.formatMessage({
                  id: 'plugins_placeholder_input',
                }),
              },
            },
          },
          // {
          //   name: 'autocomplete',
          //   label: 'autocomplete',
          //   initialSource: source,
          //   field: {
          //     type: 'autocomplete',
          //     props: {
          //       placeholder: inti.formatMessage({ id: 'plugins_placeholder_input' }),
          //       filterOption: (inputValue, option) => {
          //         return option.props.children.indexOf(inputValue) !== -1;
          //       },
          //     },
          //   },
          // },
        ],
      },
      {
        container: {
          type: 'card',
          props: {
            title: inti.formatMessage({ id: 'plugins_title_number' }),
            style: {
              padding: 0,
              marginBottom: 16,
            },
          },
        },
        fields: [
          {
            name: 'inputnumber',
            label: 'inputnumber',
            field: {
              type: 'inputnumber',
              props: {
                style: {
                  width: '50%',
                },
                placeholder: inti.formatMessage({
                  id: 'plugins_placeholder_input',
                }),
              },
            },
          },
          {
            name: 'rate',
            label: 'rate',
            field: {
              type: 'rate',
            },
          },
          {
            name: 'slider',
            label: 'slider',
            field: {
              type: 'slider',
            },
          },
        ],
      },
      {
        container: {
          type: 'card',
          props: {
            title: inti.formatMessage({ id: 'plugins_title_select' }),
            style: {
              padding: 0,
              marginBottom: 16,
            },
          },
        },
        fields: [
          {
            name: 'switch',
            label: 'switch',
            valuePropName: 'checked',
            field: {
              type: 'switch',
            },
          },
          {
            name: 'checkbox',
            label: 'checkbox',
            valulePropName: 'checked',
            field: {
              type: 'checkbox',
            },
          },
          {
            name: 'checkboxgroup',
            label: 'checkboxgroup',
            initialSource: source,
            field: {
              type: 'checkboxgroup',
            },
          },
          {
            name: 'radiogroup',
            label: 'radiogroup',
            initialSource: source,
            field: {
              type: 'radiogroup',
            },
          },
          {
            name: 'select',
            label: 'select',
            initialSource: source,
            field: {
              type: 'select',
              props: {
                placeholder: inti.formatMessage({
                  id: 'plugins_placeholder_input',
                }),
              },
            },
          },
          // {
          //   name: 'treeselect',
          //   label: 'treeselect',
          //   initialSource: treeData,
          //   field: {
          //     type: 'treeselect',
          //     props: {
          //       placeholder: inti.formatMessage({ id: 'plugins_placeholder_input' }),
          //     },
          //   },
          // },
          {
            name: 'cascader',
            label: 'cascader',
            initialSource: cascaderSource,
            field: {
              type: 'cascader',
            },
          },
          // {
          //   name: 'transfer',
          //   label: 'transfer',
          //   itemLayout: {
          //     labelCol: {
          //       span: 6,
          //     },
          //     wrapperCol: {
          //       span: 16,
          //     },
          //   },
          //   initialSource: transferSource,
          //   valuePropName: 'targetKeys',
          //   field: {
          //     type: 'transfer',
          //   },
          // },
        ],
      },
      {
        container: {
          type: 'card',
          props: {
            title: inti.formatMessage({ id: 'plugins_title_time' }),
            style: {
              padding: 0,
              marginBottom: 16,
            },
          },
        },
        fields: [
          {
            name: 'timepicker',
            label: 'timepicker',
            field: {
              type: 'timepicker',
            },
          },
          {
            name: 'datepicker',
            label: 'datepicker',
            field: {
              type: 'datepicker',
            },
          },
          {
            name: 'rangepicker',
            label: 'rangepicker',
            field: {
              type: 'rangepicker',
            },
          },
        ],
      },
      {
        container: {
          type: 'card',
          props: {
            title: inti.formatMessage({ id: 'plugins_title_other' }),
            style: {
              padding: 0,
              marginBottom: 16,
            },
          },
        },
        fields: [
          {
            name: 'upload',
            label: 'upload',
            field: {
              type: 'upload',
              props: {
                children: '点击上传',
              },
            },
            valuePropName: 'fileList',
          },
        ],
      },
      {
        container: {
          type: 'card',
          props: {
            title: inti.formatMessage({ id: 'plugins_title_other' }),
            style: {
              padding: 0,
              marginBottom: 16,
            },
          },
        },
        fields: [
          {
            label: 'inputgroup',
            childrenContainer: {
              type: 'inputgroup',
              props: {
                compact: true,
              },
            },
            children: [
              {
                name: ['group', 0],
                noStyle: true,
                field: {
                  type: 'input',
                  props: {
                    style: { width: '50%' },
                    placeholder: inti.formatMessage({
                      id: 'plugins_placeholder_input',
                    }),
                  },
                },
              },
              {
                name: ['group', 1],
                noStyle: true,
                field: {
                  type: 'input',
                  props: {
                    style: { width: '50%' },
                    placeholder: inti.formatMessage({
                      id: 'plugins_placeholder_input',
                    }),
                  },
                },
              },
            ],
          },
        ],
      },
    ],
    submit: {},
  };

  return <CreateForm {...config} {...props} />;
};
