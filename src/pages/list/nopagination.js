import React from 'react';
import QueryTable from '@/components/jsonTableTemp';
import { useIntl } from 'umi';

export default () => {
  const inti = useIntl();

  const config = {
    rowKey: 'id',
    remoteDataSource: {
      url: '/api/manage/listnopag.json',
      method: 'post',
    },
    style: {
      paddingBottom: 16,
    },
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
      },
      {
        key: 'recipientName',
        title: inti.formatMessage({ id: 'list_recipient' }),
      },
      {
        key: 'description',
        title: inti.formatMessage({ id: 'list_description' }),
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
    initialPaging: {
      pagination: false,
    },
  };
  return <QueryTable {...config} />;
};
