export default monaco => [
  {
    type: 'fetch',
    label: 'remoteDataSource',
    detail: '远程表单值',
    kind: monaco.languages.CompletionItemKind.Property,
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    insertText:
      "remoteDataSource: {\n  url: '${1:\u002Fsula.json}',\n  method: '${2:GET}',\n  params: {\n    '${3:name}': '${4:sula}'\n  },\n  convertParams({ params }) {\n    return params;\n  },\n  converter({ data }) {\n    return data;\n  },\n},",
    documentation: {
      value: `
属性名 | 描述 | 类型
---|:--:|---:
url | 请求地址 |string
method| 请求方法 |'post' 'get'
params | 请求参数 | object
convertParams | 请求参数转换方法 | (ctx, config) => params
converter | 返回参数转换方法 | (ctx, config) => any
`,
    },
  },
  {
    type: 'fetch',
    label: 'remoteSource',
    detail: '远程数据源',
    kind: monaco.languages.CompletionItemKind.Property,
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    insertText:
      "remoteSource: {\n  url: '${1:\u002Fsula.json}',\n  method: '${2:GET}',\n  params: {\n    '${3:name}': '${4:sula}'\n  },\n  convertParams({ params }) {\n    return params\n  },\n  converter({ data }) {\n    return data;\n  },\n},",
    documentation: {
      value: `
属性名 | 描述 | 类型
---|:--:|---:
url | 请求地址 |string
method| 请求方法 |'post' 'get'
params | 请求参数 | object
convertParams | 请求参数转换方法 | (ctx, config) => params
converter | 返回参数转换方法 | (ctx, config) => any
`,
    },
  },
  {
    type: 'fetch',
    label: 'remoteValues',
    detail: '远程数据值',
    kind: monaco.languages.CompletionItemKind.Property,
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    insertText:
      "remoteValues: {\n  url: '${1:\u002Fsula.json}',\n  method: '${2:GET}',\n  params: {\n    '${3:name}': '${4:sula}'\n  },\n  convertParams({ params }) {\n    return params\n  },\n  converter({ data }) {\n    return data;\n  },\n},",
    documentation: {
      value: `
属性名 | 描述 | 类型
---|:--:|---:
url | 请求地址 |string
method| 请求方法 |'post' 'get'
params | 请求参数 | object
convertParams | 请求参数转换方法 | (ctx, config) => params
converter | 返回参数转换方法 | (ctx, config) => any
`,
    },
  },
];
