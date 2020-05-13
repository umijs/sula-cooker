import React from 'react';
import QueryTable from '@/components/jsonTableTemp';
import { useIntl } from 'umi';

export default () => {
  const inti = useIntl();

  const config = {
    layout: 'vertical',
    rowKey: 'id',
    rowSelection: {},
    columns: [
      {
        key: 'id',
        title: inti.formatMessage({ id: 'list_id' }),
        sorter: true,
        render: {
          type: 'a',
          props: {
            children: 'SERIAL_NUMBER_#{text}',
            href: '#/form/card/view/#{text}',
          },
        },
      },
      {
        key: 'senderName',
        title: inti.formatMessage({ id: 'list_sender' }),
      },
      {
        key: 'recipientName',
        title: inti.formatMessage({ id: 'list_recipient' }),
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
      {
        type: 'button',
        props: {
          type: 'danger',
          children: inti.formatMessage({ id: 'delete' }),
        },
        confirm: inti.formatMessage({ id: 'list_confirm_delete' }),
        action: [
          {
            type: 'request',
            url: '/api/manage/delete.json',
            method: 'post',
            params: {
              rowKeys: '#{table.getSelectedRowKeys()}',
            },
          },
          'refreshtable',
        ],
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
    ],
    remoteDataSource: {
      url: '/api/manage/list.json',
      method: 'post',
    },
  };

  return <QueryTable {...config} />;
};
