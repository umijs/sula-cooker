import React, { useEffect } from 'react';
import {
  Typography,
  Button,
  message,
  Popconfirm,
  Tooltip,
  Row,
  Col,
  Space,
} from 'antd';
import copy from 'copy-to-clipboard';
import Editor, { monaco } from '@monaco-editor/react';
import serialize, { deserialize } from '@/utils/serialize';
import {
  BulbOutlined,
  PlayCircleOutlined,
  DeleteOutlined,
  CopyOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
} from '@ant-design/icons';
import validateSulaConfig from './lint';
import * as acorn from 'acorn';
import * as walk from 'acorn-walk';
import ConfigTree, { iconRender, nameRender } from '@/components/configTree';
import registerSuggestions from './suggestions';
import style from './index.less';

const { Title } = Typography;
const STRTEMP = 'const config = ';

const getEditorValue = data => {
  return `${STRTEMP}${serialize(data, { space: 2, unsafe: true })}`;
};

let isRegister;
let decorations = [];

export default props => {
  const monacoRef = React.useRef(null);
  const {
    onRun,
    value,
    type,
    onFullScreen = () => {},
    shallowHeight = 0,
  } = props;

  const editorRef = React.useRef(null);
  const [highLightLine, setHighLightLine] = React.useState();
  const [isFull, setFull] = React.useState(false);

  const finalValue = getEditorValue(value);

  const [treeData, setTreeData] = React.useState(finalValue);

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
    if (!isRegister) {
      registerSuggestions(ref);
      isRegister = true;
    }
  });

  const onEditorDidMount = (_monaco, editor) => {
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

    editor.onMouseDown(event => {
      clearDecorations();
      onEditorLineChange(event.target.position);
    });

    editor.onKeyDown(event => {
      setTimeout(() => {
        const position = editor.getPosition();
        onEditorLineChange(position);
        setTreeData(editor.getValue());
      });
    });

    editor.onDidChangeModelContent(() => {
      const content = editor.getValue();
      const markers = monacoRef.current.editor.getModelMarkers();

      if (markers.length > 0) {
        markers.forEach(marker => {
          monacoRef.current.editor.setModelMarkers(
            editor.getModel(),
            marker.owner,
            [],
          );
        });
      }
      const ast = acorn.parse(content, { locations: true });
      walk.full(ast, node => {
        // if (node?.loc?.start?.column < 5) {
        validateSulaConfig(node, monacoRef.current, editor);
        // }
      });
    });
  };

  function onEditorLineChange(position) {
    const { lineNumber } = position || {};
    setHighLightLine(lineNumber);
  }

  // console.log(`点击字段： ${clickType}, 点击字段所属字段: ${type}, 提示: ${suggestionType}`);

  const onClickRun = () => {
    const value = editorRef.current.getValue().slice(STRTEMP.length);

    try {
      const res = deserialize(value);
      onRun(res);
      formatDocument();
      setFull(false);
      message.success(`Run Success 🎉`);
    } catch (e) {
      message.error(`JSON 格式错误`);
    }
  };

  const onClickDelete = () => {
    editorRef.current.setValue(`${STRTEMP}{\n\n}`);
  };

  function clearDecorations() {
    if (decorations.length) {
      decorations = editorRef.current.deltaDecorations(decorations, []);
    }
  }

  function setDecorations(range) {
    const [startLineNumber, startColumn, endLineNumber, endColumn] = range;
    const newDecorations = editorRef.current.deltaDecorations(
      [],
      [
        {
          range: {
            endColumn,
            endLineNumber,
            startColumn,
            startLineNumber,
          },
          options: {
            className: 'si-editor-highlight',
          },
        },
      ],
    );
    decorations = decorations.concat(newDecorations);
  }

  const handleSelect = (node, hasChildren) => {
    const { loc, name } = node;
    clearDecorations();
    // 高亮
    if (hasChildren) {
      const [line, startColumn] = loc;
      const keyPosition = [line, startColumn, line, 100];
      setDecorations(keyPosition);
    } else {
      setDecorations(loc);
    }
    editorRef.current.revealLine(loc[0]); // 行跳转
  };

  const handleFullScreen = () => {
    setFull(true);
  };

  const handleExitFullScreen = () => {
    setFull(false);
  };

  useEffect(() => {
    editorRef?.current?.layout();
    onFullScreen && onFullScreen(isFull);
  }, [isFull]);

  useEffect(() => {
    editorRef?.current?.layout();
  }, [shallowHeight]);

  const hasConfigTree = type !== 'editor';

  return (
    <div className={isFull ? style.editorWrapper : ''}>
      <div style={{ overflow: 'hidden' }}>
        <Title style={{ float: 'left' }} level={4}>
          代码展示
        </Title>
        <Tooltip title="按 shift 键快速呼出提示">
          <BulbOutlined
            style={{ marginLeft: 8, lineHeight: '32px', cursor: 'pointer' }}
          />
        </Tooltip>
        <Space style={{ float: 'right' }}>
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
                border: 'none',
              }}
              shape="circle"
              size="small"
            />
          </Tooltip>
          <div>
            <Tooltip title="退出全屏">
              <Button
                type="primary"
                icon={<FullscreenExitOutlined />}
                onClick={handleExitFullScreen}
                style={{
                  border: 'none',
                  display: !isFull ? 'none' : '',
                }}
                shape="circle"
                size="small"
              />
            </Tooltip>
            <Tooltip title="全屏编辑">
              <Button
                type="primary"
                icon={<FullscreenOutlined />}
                onClick={handleFullScreen}
                style={{
                  border: 'none',
                  display: isFull ? 'none' : '',
                }}
                shape="circle"
                size="small"
              />
            </Tooltip>
          </div>
        </Space>
      </div>
      <Row>
        <Col span={hasConfigTree ? 16 : 24}>
          <Editor
            height={`calc(100vh - ${shallowHeight + 100}px)`}
            language="javascript"
            editorDidMount={onEditorDidMount}
            options={{
              selectOnLineNumbers: true,
              renderSideBySide: false,
            }}
            value={finalValue}
          />
        </Col>
        {hasConfigTree && (
          <Col span={8}>
            <div className={style.title}>属性节点树</div>
            <ConfigTree
              style={{
                height: 'calc(100vh - 300px)',
                overflowY: 'scroll',
              }}
              level={1}
              data={treeData}
              onSelect={handleSelect}
              currentLine={highLightLine}
              iconRender={iconRender}
              nameRender={nameRender}
            />
          </Col>
        )}
      </Row>
    </div>
  );
};
