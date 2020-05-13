import React from 'react';
import StepForm from '@/components/jsonFormTemp';
import { Card } from 'sula';
import { useIntl } from 'umi';

export default props => {
  const inti = useIntl();

  const config = {
    itemLayout: {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 8,
      },
    },
    direction: 'horizontal',
    steps: [
      {
        title: inti.formatMessage({ id: 'form_title_sender' }),
        subTitle: '',
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
            name: 'secrecy',
            label: inti.formatMessage({ id: 'form_label_sender_secrecy' }),
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
                message: inti.formatMessage({ id: 'form_validator_input' }),
              },
            ],
          },
          {
            name: 'senderAddress',
            label: inti.formatMessage({ id: 'form_label_sender_address' }),
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
                message: inti.formatMessage({ id: 'form_validator_input' }),
              },
            ],
          },
        ],
      },
      {
        title: inti.formatMessage({ id: 'form_title_recipient' }),
        subTitle: '',
        fields: [
          {
            name: 'recipientName',
            label: inti.formatMessage({ id: 'form_label_recipient_name' }),
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
            rules: [
              {
                required: true,
                message: inti.formatMessage({ id: 'form_validator_input' }),
              },
            ],
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
            name: 'recipientNumber',
            label: inti.formatMessage({ id: 'form_label_recipient_number' }),
            field: {
              type: 'inputnumber',
              props: {
                placeholder: inti.formatMessage({
                  id: 'form_placeholder_recipient_number',
                }),
                style: {
                  width: '80%',
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
              type: 'textarea',
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
        ],
      },
      {
        title: inti.formatMessage({ id: 'form_title_basic' }),
        subTitle: '',
        fields: [
          {
            name: 'time',
            label: inti.formatMessage({ id: 'form_label_delivery_time' }),
            field: {
              type: 'rangepicker',
              props: {
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
              type: 'slider',
              props: {
                min: 0,
                max: 1000,
                step: 100,
                dots: true,
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
              type: 'textarea',
              props: {
                placeholder: inti.formatMessage({
                  id: 'form_placeholder_basic_description',
                }),
              },
            },
          },
        ],
      },
    ],
    result: true,
    submit: {
      url: '/api/manage/add.json',
      method: 'post',
    },
    remoteValues: {
      url: '/api/manage/detail.json',
      method: 'post',
    },
  };

  return (
    <Card>
      <StepForm {...props} {...config} />
    </Card>
  );
};
