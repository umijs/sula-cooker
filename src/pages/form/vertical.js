import React from 'react';
import CreateForm from '@/components/jsonFormTemp';
import { useIntl } from 'umi';

export default props => {
  const inti = useIntl();

  const config = {
    container: {
      type: 'div',
      props: {
        style: {
          background: '#fff',
          padding: '24px',
          borderRadius: 2,
          margin: '0 auto 72px',
        },
      },
    },
    layout: 'vertical',
    itemLayout: {
      cols: 3,
      // span: 8,
      style: {
        padding: '0 8px',
      },
    },
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
            message: inti.formatMessage({ id: 'form_validator_input' }),
          },
        ],
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
              width: '100%',
            },
          },
        },
        rules: [
          {
            required: true,
            message: inti.formatMessage({ id: 'form_validator_input' }),
          },
        ],
      },
      {
        name: 'senderAddress',
        label: inti.formatMessage({ id: 'form_label_sender_address' }),
        field: {
          type: 'input',
          props: {
            placeholder: inti.formatMessage({
              id: 'form_label_sender_address',
            }),
          },
        },
        rules: [
          {
            required: true,
            message: inti.formatMessage({ id: 'form_validator_input' }),
          },
        ],
      },
      {
        name: 'recipientName',
        label: inti.formatMessage({ id: 'form_label_recipient_name' }),
        field: {
          type: 'input',
          props: {
            placeholder: inti.formatMessage({
              id: 'form_placeholder_recipient_name',
            }),
          },
        },
        rules: [
          {
            required: true,
            message: inti.formatMessage({ id: 'form_validator_input' }),
          },
        ],
      },
      {
        name: 'recipientNumber',
        label: inti.formatMessage({ id: 'form_label_recipient_number' }),
        field: {
          type: 'inputnumber',
          props: {
            placeholder: inti.formatMessage({
              id: 'form_placeholder_recipient_number',
            }),
            style: {
              width: '100%',
            },
          },
        },
        rules: [
          {
            required: true,
            message: inti.formatMessage({ id: 'form_validator_input' }),
          },
        ],
      },
      {
        name: 'recipientAddress',
        label: inti.formatMessage({ id: 'form_label_recipient_address' }),
        field: {
          type: 'input',
          props: {
            placeholder: inti.formatMessage({
              id: 'form_placeholder_recipient_address',
            }),
          },
        },
        rules: [
          {
            required: true,
            message: inti.formatMessage({ id: 'form_validator_input' }),
          },
        ],
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
        rules: [
          {
            required: true,
            message: inti.formatMessage({ id: 'form_validator_input' }),
          },
        ],
      },
      {
        name: 'priceProject',
        label: inti.formatMessage({ id: 'form_label_price_protection' }),
        field: {
          type: 'select',
          props: {
            placeholder: inti.formatMessage({
              id: 'form_placeholder_price_protection',
            }),
          },
        },
        remoteSource: {
          url: '/api/manage/priceList.json',
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
    ],
    submit: {
      url: '/api/manage/add.json',
      method: 'post',
    },
    remoteValues: {
      url: '/api/manage/detail.json',
      method: 'post',
    },
  };

  return <CreateForm {...config} {...props} />;
};
