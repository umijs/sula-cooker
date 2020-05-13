import React from 'react';
import { Typography, Button, message, Popconfirm, Tooltip } from 'antd';
import copy from 'copy-to-clipboard';
import Editor, { monaco } from '@monaco-editor/react';
import serialize, { deserialize } from '@/utils/serialize';
import {
  BulbOutlined,
  PlayCircleOutlined,
  DeleteOutlined,
  CopyOutlined,
} from '@ant-design/icons';

const { Title } = Typography;
const STRTEMP = 'const config = ';

const getEditorValue = data => {
  return `${STRTEMP}${serialize(data, { space: 2, unsafe: true })}`;
};

export default props => {
  const monacoRef = React.useRef(null);
  const { onRun, value } = props;

  const editorRef = React.useRef(null);

  const handleCopy = () => {
    const jsonEditorValue = editorRef.current.getValue();
    const val = serialize(jsonEditorValue, { space: 2 });
    copy(deserialize(val).slice(STRTEMP.length));
    message.success('JSON Schema Copied 🎉');
  };

  const formatDocument = () => {
    setTimeout(() => {
      editorRef.current &&
        editorRef.current.getAction('editor.action.formatDocument').run();
    }, 300);
  };

  monaco.init().then(ref => {
    monacoRef.current = ref;
  });

  const onEditorDidMount = (_, editor) => {
    editorRef.current = editor;
    const model = editor.getModel();

    formatDocument();

    editor.onKeyDown(e => {
      if (e.shiftKey) {
        editorRef.current &&
          editorRef.current.trigger(
            'auto completion',
            'editor.action.triggerSuggest',
          );
      }
    });

    editor.onDidChangeCursorPosition(e => {
      const lineCount = editor.getModel().getLineCount();
      if (e.position.lineNumber === 1) {
        editor.setPosition({
          lineNumber: 2,
          column: 1,
        });
      } else if (e.position.lineNumber === lineCount) {
        editor.setPosition({
          lineNumber: lineCount - 1,
          column: 1,
        });
      }
    });
  };

  // console.log(`点击字段： ${clickType}, 点击字段所属字段: ${type}, 提示: ${suggestionType}`);

  const onClickRun = () => {
    const value = editorRef.current.getValue().slice(STRTEMP.length);

    try {
      const res = deserialize(value);
      onRun(res);
      formatDocument();
      message.success(`Run Success 🎉`);
    } catch (e) {
      message.error(`JSON 格式错误`);
    }
  };

  const onClickDelete = () => {
    editorRef.current.setValue(`${STRTEMP}{\n\n}`);
  };

  return (
    <div>
      <div style={{ marginTop: 24, overflow: 'hidden' }}>
        <Title style={{ float: 'left' }} level={4}>
          代码展示
        </Title>
        <Tooltip title="按 shift 键快速呼出提示">
          <BulbOutlined
            style={{ marginLeft: 8, lineHeight: '32px', cursor: 'pointer' }}
          />
        </Tooltip>
        <div style={{ float: 'right' }}>
          <Tooltip title="运行代码">
            <Button
              shape="circle"
              size="small"
              type="primary"
              icon={<PlayCircleOutlined />}
              onClick={onClickRun}
              shape="circle"
            />
          </Tooltip>
          <Popconfirm title="确定要清空吗？" onConfirm={onClickDelete}>
            <Tooltip title="清空代码">
              <Button
                type="primary"
                style={{ marginLeft: 8 }}
                icon={<DeleteOutlined />}
                size="small"
                shape="circle"
              />
            </Tooltip>
          </Popconfirm>
          <Tooltip title="复制代码">
            <Button
              type="primary"
              icon={<CopyOutlined />}
              onClick={handleCopy}
              style={{
                marginLeft: 8,
                border: 'none',
              }}
              shape="circle"
              size="small"
            />
          </Tooltip>
        </div>
      </div>
      <Editor
        height="calc(100vh - 100px)"
        language="javascript"
        editorDidMount={onEditorDidMount}
        options={{
          selectOnLineNumbers: true,
          renderSideBySide: false,
        }}
        value={getEditorValue(value)}
      />
    </div>
  );
};
