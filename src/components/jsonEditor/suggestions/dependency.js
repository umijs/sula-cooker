export default monaco => [
  {
    type: 'dependency',
    label: 'dependency',
    detail: '级联插件',
    kind: monaco.languages.CompletionItemKind.Property,
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    insertText:
      'dependency: {\n  ${1:value}: {\n    relates: ["${2:relateName}"],\n    inputs: [["${3:relateValue}"]],\n    output: ${4:"outputValue"},\n    ignores: [[${5:"ignoreValue"}]],\n    defaultOutput: ${6:"value"},\n  },\n},',
    documentation: {
      value: `### 表单级联配置 [文档](https://doc.sula.now.sh/zh/plugin/form-dependency.html)
  #### 可选value visible source disabled 配置
  * **relates** 受哪项表单影响
  * **inputs** relates数组对应的表单值
  * **output** 匹配到inputs时 输出值
  * **ignores** relates忽略的值
  * **defaultOutput** 匹配ignores或未匹配到inputs时，输出值
  `,
    },
  },
];
