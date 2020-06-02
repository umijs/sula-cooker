export default [
  {
    type: 'refreshtable',
    desc: '刷新表格',
    code: {
      action: 'refreshtable',
    },
  },
  {
    type: 'resettable',
    desc: '重置表格',
    code: {
      action: 'resettable',
    },
  },
  {
    type: 'request',
    desc: '请求',
    code: {
      action: {
        type: 'request',
        url: '/api/manage/list.json',
        method: 'post',
      },
    },
  },
  {
    type: 'back',
    desc: '后退',
    code: {
      action: 'back',
    },
  },
  {
    type: 'forward',
    desc: '前进',
    code: {
      action: 'forward',
    },
  },
  {
    type: 'route',
    desc: '路由到指定页',
    code: {
      action: {
        type: 'route',
        path: '/form/card/create',
      },
    },
  },
  // form
  {
    type: 'validateFields',
    desc: '表单校验',
    code: {
      action: {
        type: 'validateFields',
        args: ['id'],
      },
    },
  },
  {
    type: 'validateGroupFields',
    desc: '表单组校验',
    code: {
      action: {
        type: 'validateGroupFields',
        args: ['group'],
      },
    },
  },
  {
    type: 'validateQueryFields',
    desc: '搜索列表校验',
    code: {
      action: {
        type: 'validateQueryFields',
        args: ['id'],
      },
    },
  },
  {
    type: 'resetFields',
    desc: '重置表单',
    code: {
      action: 'resetFields',
    },
  },

  // modalform
  {
    type: 'modalform',
    desc: '弹框表单',
    code: {
      action: {
        type: 'modalform',
        title: 'title',
        mode: 'edit',
        fields: [
          {
            name: 'input',
            label: 'input',
            field: 'input',
          },
        ],
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
  },
  {
    type: 'drawerform',
    desc: '抽屉表单',
    code: {
      action: {
        type: 'drawerform',
        title: 'title',
        mode: 'edit',
        fields: [
          {
            name: 'input',
            label: 'input',
            field: 'input',
          },
        ],
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
  },
];
