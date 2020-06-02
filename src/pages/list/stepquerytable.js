import React from 'react';
import StepQueryTable from '@/components/jsonTableTemp';
import { useIntl } from 'umi';

export default () => {
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
    steps: [
      {
        title: inti.formatMessage({ id: 'form_title_step1' }),
      },
      {
        title: inti.formatMessage({ id: 'form_title_step2' }),
      },
      {
        title: inti.formatMessage({ id: 'form_title_step3' }),
      },
      {
        title: inti.formatMessage({ id: 'form_title_step4' }),
      },
    ],
    remoteDataSource: {
      url: '/api/manage/list.json',
      method: 'post',
    },
  };

  return <StepQueryTable {...config} />;
};
