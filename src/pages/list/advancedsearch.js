import React from 'react';
import QueryTable from '@/components/jsonTableTemp';
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
        key: 'time',
        title: inti.formatMessage({ id: 'list_time' }),
      },
      {
        key: 'priceProject',
        title: inti.formatMessage({ id: 'list_price' }),
        sorter: true,
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
    leftActionsRender: [
      {
        type: 'button',
        props: {
          type: 'primary',
          children: inti.formatMessage({ id: 'refresh' }),
        },
        action: 'refreshtable',
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
            placeholder: inti.formatMessage({
              id: 'form_placeholder_recipient_name',
            }),
          },
        },
        remoteSource: {
          url: '/api/manage/recipientList.json',
        },
      },
      {
        name: 'time',
        label: inti.formatMessage({ id: 'form_label_delivery_time' }),
        field: {
          type: 'rangepicker',
          props: {
            style: {
              width: '100%',
            },
            placeholder: [
              inti.formatMessage({ id: 'form_placeholder_start_time' }),
              inti.formatMessage({ id: 'form_placeholder_end_time' }),
            ],
          },
        },
      },
      {
        name: 'status',
        label: inti.formatMessage({ id: 'list_status' }),
        field: {
          type: 'select',
          props: {
            placeholder: inti.formatMessage({
              id: 'list_placeholder_search_status',
            }),
          },
        },
        remoteSource: {
          url: '/api/manage/statusList.json',
        },
      },
      {
        name: 'description',
        label: inti.formatMessage({ id: 'form_label_basic_description' }),
        field: {
          type: 'input',
          props: {
            placeholder: inti.formatMessage({
              id: 'form_placeholder_basic_description',
            }),
          },
        },
      },
      {
        name: 'recipientTime',
        label: inti.formatMessage({ id: 'form_label_recipient_time' }),
        field: {
          type: 'checkboxgroup',
        },
        initialSource: [
          { text: 'Morning', value: 'morning' },
          { text: 'Afternoon', value: 'afternoon' },
          { text: 'Night', value: 'night' },
        ],
      },

      {
        name: 'senderAddress',
        label: inti.formatMessage({ id: 'form_label_sender_address' }),
        field: {
          type: 'input',
          props: {
            placeholder: inti.formatMessage({
              id: 'form_placeholder_sender_address',
            }),
          },
        },
        remoteSource: {
          url: '/api/manage/statusList.json',
        },
      },
    ],
    remoteDataSource: {
      url: '/api/manage/list.json',
      method: 'post',
      successMessage: true,
    },
  };

  return <QueryTable {...config} />;
};
