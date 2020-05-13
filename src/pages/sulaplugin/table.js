import React from 'react';
import QueryTable from '@/components/jsonTableTemp';
import { useIntl } from 'umi';

export default () => {
  const inti = useIntl();

  const config = {
    layout: 'vertical',
    rowKey: 'id',
    remoteDataSource: {
      url: '/api/manage/list.json',
      method: 'post',
    },
    columns: [
      {
        title: inti.formatMessage({ id: 'plugins_title_tag' }),
        render: [
          {
            type: 'tag',
            props: {
              type: 'primary',
              children: 'primary',
            },
          },
          {
            type: 'tag',
            props: {
              children: '#f50',
              color: '#f50',
            },
          },
        ],
      },
      {
        title: inti.formatMessage({ id: 'plugins_title_badge' }),
        render: [
          {
            type: 'badge',
            props: {
              status: 'success',
              text: 'Success',
            },
          },
          {
            type: 'badge',
            props: {
              status: 'processing',
              text: 'Processing',
            },
          },
        ],
      },
      {
        title: inti.formatMessage({ id: 'plugins_title_badge' }),
        render: [
          // {
          //   type: 'badge',
          //   props: {
          //     status: 'success',
          //     text: 'up',
          //     shape: 'up'
          //   }
          // },
          // {
          //   type: 'badge',
          //   props: {
          //     status: 'error',
          //     shape: 'down',
          //     text: 'down'
          //   }
          // },
          {
            type: 'badge',
            props: {
              count: 109,
            },
          },
          {
            type: 'badge',
            props: {
              count: 20,
              style: {
                backgroundColor: '#52c41a',
              },
            },
          },
        ],
      },
      {
        title: inti.formatMessage({ id: 'plugins_title_progress' }),
        render: [
          {
            type: 'progress',
            props: {
              percent: 30,
              status: 'active',
            },
          },
        ],
      },
      {
        title: inti.formatMessage({ id: 'plugins_title_actions' }),
        render: [
          {
            type: 'button',
            props: {
              size: 'small',
              children: 'Refresh',
            },
            action: 'refreshtable',
          },
          {
            type: 'button',
            props: {
              size: 'small',
              children: 'Reset',
            },
            action: 'resettable',
          },
        ],
      },
      {
        key: 'operator_modalform',
        title: inti.formatMessage({ id: 'plugins_title_modalform' }),
        render: [
          {
            type: 'icon',
            tooltip: 'View',
            props: {
              type: 'eye',
            },
            action: {
              type: 'modalform',
              title: inti.formatMessage({ id: 'list_title' }),
              fields: [
                {
                  name: 'senderName',
                  label: inti.formatMessage({ id: 'form_label_sender_name' }),
                  field: {
                    type: 'input',
                    props: {
                      placeholder: inti.formatMessage({
                        id: 'form_placeholder_sender_name',
                      }),
                    },
                  },
                  rules: [
                    {
                      required: true,
                      message: inti.formatMessage({
                        id: 'form_validator_input',
                      }),
                    },
                  ],
                },
                {
                  name: 'secrecy',
                  label: inti.formatMessage({
                    id: 'form_label_sender_secrecy',
                  }),
                  field: {
                    type: 'switch',
                    props: {
                      checkedChildren: 'on',
                      unCheckedChildren: 'off',
                    },
                  },
                  valuePropName: 'checked',
                },
                {
                  name: 'senderNumber',
                  label: inti.formatMessage({ id: 'form_label_sender_number' }),
                  field: {
                    type: 'inputnumber',
                    props: {
                      placeholder: inti.formatMessage({
                        id: 'form_placeholder_sender_number',
                      }),
                      style: {
                        width: '80%',
                      },
                    },
                  },
                  rules: [
                    {
                      required: true,
                      message: inti.formatMessage({
                        id: 'form_validator_input',
                      }),
                    },
                  ],
                },
                {
                  name: 'senderAddress',
                  label: inti.formatMessage({
                    id: 'form_label_sender_address',
                  }),
                  field: {
                    type: 'textarea',
                    props: {
                      placeholder: inti.formatMessage({
                        id: 'form_label_sender_address',
                      }),
                    },
                  },
                  rules: [
                    {
                      required: true,
                      message: inti.formatMessage({
                        id: 'form_validator_input',
                      }),
                    },
                  ],
                },
              ],
              mode: 'view',
              remoteValues: {
                url: '/api/manage/detail.json',
                method: 'post',
                params: {
                  id: '#{record.id}',
                },
              },
            },
            submit: {
              url: '/api/manage/add.json',
              method: 'post',
            },
          },
          {
            type: 'icon',
            tooltip: 'Edit',
            props: {
              type: 'edit',
            },
            action: {
              type: 'modalform',
              title: inti.formatMessage({ id: 'list_title' }),
              fields: [
                {
                  name: 'senderName',
                  label: inti.formatMessage({ id: 'form_label_sender_name' }),
                  field: {
                    type: 'input',
                    props: {
                      placeholder: inti.formatMessage({
                        id: 'form_placeholder_sender_name',
                      }),
                    },
                  },
                  rules: [
                    {
                      required: true,
                      message: inti.formatMessage({
                        id: 'form_validator_input',
                      }),
                    },
                  ],
                },
                {
                  name: 'secrecy',
                  label: inti.formatMessage({
                    id: 'form_label_sender_secrecy',
                  }),
                  field: {
                    type: 'switch',
                    props: {
                      checkedChildren: 'on',
                      unCheckedChildren: 'off',
                    },
                  },
                  valuePropName: 'checked',
                },
                {
                  name: 'senderNumber',
                  label: inti.formatMessage({ id: 'form_label_sender_number' }),
                  field: {
                    type: 'inputnumber',
                    props: {
                      placeholder: inti.formatMessage({
                        id: 'form_placeholder_sender_number',
                      }),
                      style: {
                        width: '80%',
                      },
                    },
                  },
                  rules: [
                    {
                      required: true,
                      message: inti.formatMessage({
                        id: 'form_validator_input',
                      }),
                    },
                  ],
                },
                {
                  name: 'senderAddress',
                  label: inti.formatMessage({
                    id: 'form_label_sender_address',
                  }),
                  field: {
                    type: 'textarea',
                    props: {
                      placeholder: inti.formatMessage({
                        id: 'form_label_sender_address',
                      }),
                    },
                  },
                  rules: [
                    {
                      required: true,
                      message: inti.formatMessage({
                        id: 'form_validator_input',
                      }),
                    },
                  ],
                },
              ],
              mode: 'edit',
              remoteValues: {
                url: '/api/manage/detail.json',
                method: 'post',
                params: {
                  id: '#{record.id}',
                },
              },
              submit: {
                url: '/api/manage/add.json',
                method: 'post',
              },
            },
          },
        ],
      },
      {
        key: 'operator_drawerform',
        title: inti.formatMessage({ id: 'plugins_title_drawerform' }),
        render: [
          {
            type: 'icon',
            tooltip: 'View',
            props: {
              type: 'eye',
            },
            action: {
              type: 'drawerform',
              title: inti.formatMessage({ id: 'list_title' }),
              fields: [
                {
                  name: 'senderName',
                  label: inti.formatMessage({ id: 'form_label_sender_name' }),
                  field: {
                    type: 'input',
                    props: {
                      placeholder: inti.formatMessage({
                        id: 'form_placeholder_sender_name',
                      }),
                    },
                  },
                  rules: [
                    {
                      required: true,
                      message: inti.formatMessage({
                        id: 'form_validator_input',
                      }),
                    },
                  ],
                },
                {
                  name: 'secrecy',
                  label: inti.formatMessage({
                    id: 'form_label_sender_secrecy',
                  }),
                  field: {
                    type: 'switch',
                    props: {
                      checkedChildren: 'on',
                      unCheckedChildren: 'off',
                    },
                  },
                  valuePropName: 'checked',
                },
                {
                  name: 'senderNumber',
                  label: inti.formatMessage({ id: 'form_label_sender_number' }),
                  field: {
                    type: 'inputnumber',
                    props: {
                      placeholder: inti.formatMessage({
                        id: 'form_placeholder_sender_number',
                      }),
                      style: {
                        width: '80%',
                      },
                    },
                  },
                  rules: [
                    {
                      required: true,
                      message: inti.formatMessage({
                        id: 'form_validator_input',
                      }),
                    },
                  ],
                },
                {
                  name: 'senderAddress',
                  label: inti.formatMessage({
                    id: 'form_label_sender_address',
                  }),
                  field: {
                    type: 'textarea',
                    props: {
                      placeholder: inti.formatMessage({
                        id: 'form_label_sender_address',
                      }),
                    },
                  },
                  rules: [
                    {
                      required: true,
                      message: inti.formatMessage({
                        id: 'form_validator_input',
                      }),
                    },
                  ],
                },
              ],
              mode: 'view',
              remoteValues: {
                url: '/api/manage/detail.json',
                method: 'post',
                params: {
                  id: '#{record.id}',
                },
              },
              submit: {
                url: '/api/manage/add.json',
                method: 'post',
              },
            },
          },
          {
            type: 'icon',
            tooltip: 'Edit',
            props: {
              type: 'edit',
            },
            action: {
              type: 'drawerform',
              title: inti.formatMessage({ id: 'list_title' }),
              fields: [
                {
                  name: 'senderName',
                  label: inti.formatMessage({ id: 'form_label_sender_name' }),
                  field: {
                    type: 'input',
                    props: {
                      placeholder: inti.formatMessage({
                        id: 'form_placeholder_sender_name',
                      }),
                    },
                  },
                  rules: [
                    {
                      required: true,
                      message: inti.formatMessage({
                        id: 'form_validator_input',
                      }),
                    },
                  ],
                },
                {
                  name: 'secrecy',
                  label: inti.formatMessage({
                    id: 'form_label_sender_secrecy',
                  }),
                  field: {
                    type: 'switch',
                    props: {
                      checkedChildren: 'on',
                      unCheckedChildren: 'off',
                    },
                  },
                  valuePropName: 'checked',
                },
                {
                  name: 'senderNumber',
                  label: inti.formatMessage({ id: 'form_label_sender_number' }),
                  field: {
                    type: 'inputnumber',
                    props: {
                      placeholder: inti.formatMessage({
                        id: 'form_placeholder_sender_number',
                      }),
                      style: {
                        width: '80%',
                      },
                    },
                  },
                  rules: [
                    {
                      required: true,
                      message: inti.formatMessage({
                        id: 'form_validator_input',
                      }),
                    },
                  ],
                },
                {
                  name: 'senderAddress',
                  label: inti.formatMessage({
                    id: 'form_label_sender_address',
                  }),
                  field: {
                    type: 'textarea',
                    props: {
                      placeholder: inti.formatMessage({
                        id: 'form_label_sender_address',
                      }),
                    },
                  },
                  rules: [
                    {
                      required: true,
                      message: inti.formatMessage({
                        id: 'form_validator_input',
                      }),
                    },
                  ],
                },
              ],
              mode: 'edit',
              remoteValues: {
                url: '/api/manage/detail.json',
                method: 'post',
                params: {
                  id: '#{record.id}',
                },
              },
              submit: {
                url: '/api/manage/add.json',
                method: 'post',
              },
            },
          },
        ],
      },
    ],
    fields: [
      {
        name: 'id',
        label: 'ID',
        field: 'input',
      },
    ],
  };

  return <QueryTable {...config} />;
};
