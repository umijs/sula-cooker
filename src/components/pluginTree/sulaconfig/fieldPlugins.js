export default [
  {
    type: 'input',
    desc: '输入框组件',
    code: {
      field: {
        type: 'input',
        props: {
          placeholder: 'Please input',
        },
      },
      rules: [{ required: true, message: 'Please input' }],
    },
  },
  {
    type: 'inputnumber',
    desc: '数字输入框',
    code: {
      field: {
        type: 'inputnumber',
        props: {
          placeholder: 'Please input',
        },
      },
    },
    rules: [{ required: true, message: 'Please input' }],
  },
  {
    type: 'select',
    desc: '选择器',
    code: {
      field: {
        type: 'select',
        props: {
          placeholder: 'Please select',
        },
      },
      initialSource: [
        { text: 'Sula', value: 'sula' },
        { text: 'Antd', value: 'antd', disabled: true },
      ],
      rules: [{ required: true, message: 'Please select' }],
    },
  },
  {
    type: 'textarea',
    desc: '文本域',
    code: {
      field: {
        type: 'textarea',
        props: {
          placeholder: 'Please input',
        },
      },
    },
    rules: [{ required: true, message: 'Please input' }],
  },
  {
    type: 'switch',
    desc: '开关',
    code: {
      field: {
        type: 'switch',
        props: {
          checkedChildren: 'On',
          unCheckedChildren: 'Off',
        },
      },
      valuePropName: 'checked',
    },
  },
  {
    type: 'checkbox',
    desc: '多选框',
    code: {
      field: {
        type: 'checkbox',
      },
      valuePropName: 'checked',
    },
  },
  {
    type: 'checkboxgroup',
    desc: '多选框组',
    code: {
      field: {
        type: 'checkboxgroup',
      },
      initialSource: [
        { text: 'Sula', value: 'sula' },
        { text: 'Antd', value: 'antd', disabled: true },
        { text: 'Umi', value: 'umi' },
      ],
      rules: [{ required: true, message: 'Please select' }],
    },
  },
  {
    type: 'radio',
    desc: '单选框',
    code: {
      field: {
        type: 'radio',
      },
      valuePropName: 'checked',
    },
  },
  {
    type: 'radiogroup',
    desc: '单选框组',
    code: {
      field: {
        type: 'radiogroup',
      },
      initialSource: [
        { text: 'Sula', value: 'sula' },
        { text: 'Antd', value: 'antd', disabled: true },
      ],
      rules: [{ required: true, message: 'Please select' }],
    },
  },
  {
    type: 'password',
    desc: '密码输入框',
    code: {
      field: {
        type: 'password',
        props: {
          placeholder: 'Please input',
        },
      },
    },
    rules: [{ required: true, message: 'Please input' }],
  },

  {
    type: 'rate',
    desc: '评分组件',
    code: {
      field: {
        type: 'rate',
        props: {
          placeholder: 'Please input',
        },
      },
    },
  },
  {
    type: 'slider',
    desc: '滑动输入条',
    code: {
      field: {
        type: 'slider',
        props: {
          min: 0,
          max: 200,
        },
      },
    },
  },
  {
    type: 'cascader',
    desc: '级联选择器',
    code: {
      field: {
        type: 'cascader',
        props: {
          placeholder: 'Please select',
        },
      },
      initialSource: [
        {
          text: 'Sula',
          value: 'sula',
          children: [
            {
              text: 'Sula-1',
              value: 'sula-1',
              children: [
                {
                  text: 'Sula-1-1',
                  value: 'sula-1-1',
                },
              ],
            },
            { text: 'Sula-2', value: 'sula-2' },
          ],
        },
        { text: 'Antd', value: 'antd', disabled: true },
      ],
      rules: [{ required: true, message: 'Please select' }],
    },
  },
  {
    type: 'datepicker',
    desc: '日期选择器',
    code: {
      field: {
        type: 'datepicker',
        props: {
          placeholder: 'Please select',
        },
      },
      rules: [{ required: true, message: 'Please select' }],
    },
  },
  {
    type: 'rangepicker',
    desc: '日期范围选择',
    code: {
      field: {
        type: 'rangepicker',
        props: {
          placeholder: 'Please select',
        },
      },
      rules: [{ required: true, message: 'Please select' }],
    },
  },
  {
    type: 'timepicker',
    desc: '时间选择器',
    code: {
      field: {
        type: 'timepicker',
        props: {
          placeholder: 'Please select',
        },
      },
      rules: [{ required: true, message: 'Please select' }],
    },
  },
];
