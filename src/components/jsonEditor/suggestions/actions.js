export default monaco => [
  {
    type: 'action',
    label: 'back',
    detail: '返回上一级',
    kind: monaco.languages.CompletionItemKind.Property,
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    insertText: "'back'",
    documentation: {
      value: ``,
    },
  },
  {
    type: 'action',
    label: 'request',
    detail: '请求',
    kind: monaco.languages.CompletionItemKind.Property,
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    insertText:
      '{\n  type: "request",\n  url: "${1:\u002Fsula.json}",\n  method: "${2:get}",\n},',
    documentation: {
      value: ``,
    },
  },
  {
    type: 'action',
    label: 'forward',
    detail: '前进一级',
    kind: monaco.languages.CompletionItemKind.Property,
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    insertText: "'forward'",
    documentation: {
      value: ``,
    },
  },
  {
    type: 'action',
    label: 'modalform',
    detail: '弹框表单插件',
    kind: monaco.languages.CompletionItemKind.Property,
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    insertText:
      '{\n  type: "modalform",\n  title: "Title",\n  mode: "edit",\n  fields: [\n    {\n      name: "input",\n      label: "input",\n      field: {\n        type: "input",\n        props: {\n          placeholder: "请输入"\n        }\n      },\n      rules: [\n        {\n          required: true,\n          message: "请输入"\n        }\n      ]\n    }\n  ],\n  remoteValues: {\n    url: "\u002Fdetail.json",\n    method: "post",\n    params: {\n      id: 1,\n    },\n  },\n  submit: {\n    url: "\u002Fadd.json",\n    method: "post"\n  },\n},',
    documentation: {
      value: `
属性名 | 描述 | 类型
---|:--:|---:
fields | 表单配置 | -
title | 弹框标题 | -
mode | 表单模式 | -
remoteValues | 远程表单值的请求配置 | -
submit | 提交表单数据的请求配置 | -
`,
    },
  },
  {
    type: 'action',
    label: 'drawerform',
    detail: '弹框表单插件',
    kind: monaco.languages.CompletionItemKind.Property,
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    insertText:
      '{\n  type: "drawerform",\n  title: "Title",\n  mode: "edit",\n  fields: [\n    {\n      name: "input",\n      label: "input",\n      field: {\n        type: "input",\n        props: {\n          placeholder: "请输入"\n        }\n      },\n      rules: [\n        {\n          required: true,\n          message: "请输入"\n        }\n      ]\n    }\n  ],\n  remoteValues: {\n    url: "\u002Fdetail.json",\n    method: "post",\n    params: {\n      id: 1,\n    },\n  },\n  submit: {\n    url: "\u002Fadd.json",\n    method: "post"\n  },\n},',
    documentation: {
      value: `
属性名 | 描述 | 类型
---|:--:|---:
fields | 表单配置 | -
title | 抽屉标题 | -
mode | 表单模式 | -
remoteValues | 远程表单值的请求配置 | -
submit | 提交表单数据的请求配置 | -
`,
    },
  },
  {
    type: 'action',
    label: 'refreshtable',
    detail: '刷新表格',
    kind: monaco.languages.CompletionItemKind.Property,
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    insertText: "'refreshtable'",
    documentation: {
      value: ``,
    },
  },
  {
    type: 'action',
    label: 'resettable',
    detail: '重置表格',
    kind: monaco.languages.CompletionItemKind.Property,
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    insertText: "'resettable'",
    documentation: {
      value: ``,
    },
  },
  {
    type: 'action',
    label: 'route',
    detail: '路由跳转',
    kind: monaco.languages.CompletionItemKind.Property,
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    insertText:
      '{\n  type: "route",\n  path: "${1:\u002Fcreate}",\n  params: {\n    "${2:mode}": "${3:create}"\n  },\n},',
    documentation: {
      value: ``,
    },
  },
];
