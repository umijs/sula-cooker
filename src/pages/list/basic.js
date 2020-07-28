import React from 'react';
import QueryTable from '@/components/jsonTableTemp';
import { useIntl } from 'umi';

export default () => {
  // 国际化配置
  const inti = useIntl();

  const config = {
    layout: 'vertical',
    rowKey: 'id',
    columns: [
      {
        key: 'id',
        title: inti.formatMessage({ id: 'list_id' }),
        sorter: true,
        render: {
          type: 'button',
          props: {
            type: 'link',
            size: 'small',
            children: 'SERIAL_NUMBER_#{text}',
            href: '#/form/card/view/#{text}',
            style: {
              padding: 0,
            },
          },
        },
      },
      {
        key: 'senderName',
        title: inti.formatMessage({ id: 'list_sender' }),
        filterRender: 'search',
      },
      {
        key: 'recipientName',
        title: inti.formatMessage({ id: 'list_recipient' }),
        filters: [
          { text: 'Jack', value: 'Jack' },
          { text: 'Lucy', value: 'Lucy' },
          { text: 'Lily', value: 'lily' },
          { text: 'Mocy', value: 'Mocy' },
        ],
      },
      {
        key: 'status',
        title: inti.formatMessage({ id: 'list_status' }),
        render: {
          type: 'tag',
          props: {
            children: '#{text}',
            color:
              '#{text === "dispatching" ? "#2db7f5" : text === "success" ? "#87d068" : "#f50"}',
          },
        },
      },
      {
        key: 'operator',
        title: inti.formatMessage({ id: 'list_operator' }),
        render: [
          {
            type: 'icon',
            props: {
              type: 'edit',
            },
            action: {
              type: 'route',
              path: '/form/card/edit/#{record.id}',
            },
          },
          {
            type: 'icon',
            props: {
              type: 'delete',
            },
            tooltip: inti.formatMessage({ id: 'list_tooltip_delete' }),
            confirm: inti.formatMessage({ id: 'list_confirm_delete' }),
            visible: '#{record.id % 3 === 0}',
            action: [
              {
                type: 'request',
                url: '/api/manage/delete.json',
                method: 'POST',
                params: {
                  rowKeys: '#{record.id}',
                },
              },
              'refreshtable',
            ],
          },
        ],
      },
    ],
    actionsRender: [
      {
        type: 'button',
        props: {
          children: inti.formatMessage({ id: 'create' }),
          type: 'primary',
        },
        action: {
          type: 'route',
          path: '/form/card/create',
        },
      },
    ],
    fields: [
      {
        name: 'id',
        label: inti.formatMessage({ id: 'list_id' }),
        field: {
          type: 'input',
          props: {
            placeholder: inti.formatMessage({
              id: 'list_placeholder_search_id',
            }),
          },
        },
      },
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
      },
      {
        name: 'recipientName',
        label: inti.formatMessage({ id: 'form_placeholder_recipient_name' }),
        field: {
          type: 'select',
          props: {
            mode: 'multiple',
            allowClear: true,
            placeholder: inti.formatMessage({
              id: 'form_placeholder_recipient_name',
            }),
          },
        },
        remoteSource: {
          url: '/api/manage/recipientList.json',
        },
      },
    ],
    remoteDataSource: {
      url: '/api/manage/list.json',
      method: 'post',
    },
  };

  return <QueryTable {...config} />;
};
