export default [
  {
    type: 'textlink',
    desc: '文本链接',
    code: {
      render: {
        type: 'button',
        props: {
          children: '#{text}',
          type: 'link',
          size: 'small',
          link: '#/form/card/view/#{text}',
          style: { padding: 0 },
        },
      },
    },
  },
  {
    type: 'tag',
    desc: '标签',
    code: {
      key: 'status',
      title: '标签插件',
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
  },
  {
    type: 'process',
    desc: '进度条',
    code: {
      key: 'process',
      title: '进度条插件',
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
  },
  {
    type: 'operator',
    desc: '图标操作组',
    code: {
      key: 'operator',
      title: 'Operator',
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
          tooltip: 'Delete',
          confirm: 'Are you sure to delete?',
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
  },
];
