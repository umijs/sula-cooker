import React, { useState } from 'react';
import { message } from 'antd';
import Drawer from '@/components/drawer';
import ConfigButton from '@/components/configButton';
import Editor from '@/components/jsonEditor';

export default React.memo(props => {
  const {
    width = 600,
    visible,
    onClick,
    onClose,
    onRun,
    code: defaultCode,
    mode = 'create',
    iconVisible,
  } = props;
  const [code, setCode] = useState(defaultCode);
  const [init, setInit] = useState(false);
  const [jsonEditorVal, setJsonEditorVal] = useState(defaultCode);

  React.useEffect(() => {
    setInit(true);
  }, []);

  const onClickRun = value => {
    setJsonEditorVal(value);
    try {
      setCode(value);
    } catch (e) {
      message.error('JSON 格式错误');
    }
  };

  React.useEffect(() => {
    if (init) {
      onRun(code);
    }
  }, [code]);

  return (
    <div>
      <Drawer visible={visible} width={width} onClose={onClose} forceRender>
        <Editor
          onRun={onClickRun}
          value={jsonEditorVal}
          mode={mode}
          type="list"
        />
      </Drawer>

      {!visible && !iconVisible && <ConfigButton onClick={onClick} />}
    </div>
  );
});
