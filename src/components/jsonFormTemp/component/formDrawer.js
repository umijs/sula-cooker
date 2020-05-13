import React, { useState } from 'react';
import { Typography, message, Radio } from 'antd';
// import { config as cardConfig } from '@/pages/form/basic';
import ConfigButton from '@/components/configButton';
import Drawer from '@/components/drawer';
import Editor from '@/components/jsonEditor';

const { Title } = Typography;

export default props => {
  const {
    width = 600,
    visible,
    onClick,
    onClose,
    onRun,
    code: defaultCode,
    iconVisible,
    mode = 'create',
    changeMode,
    direction,
    isWizard,
    changeDirection,
    actionsPosition,
    changeActionsPosition,
  } = props;
  const [code, setCode] = useState(defaultCode);
  const [jsonEditorVal, setJsonEditorVal] = useState(defaultCode);
  const [isDetail, setIsDetail] = useState(false);

  const onClickRun = value => {
    try {
      setCode(value);
    } catch (e) {
      message.error('JSON 格式错误');
    }
  };

  const onModeChange = e => {
    const { value } = e.target;
    changeMode(value);
  };

  const onDirectionChange = e => {
    const { value } = e.target;
    changeDirection(value);
  };

  const onActionsPositionChange = e => {
    const { value } = e.target;
    changeActionsPosition(value);
  };

  React.useEffect(() => {
    const { hash } = window.location;
    hash.includes('detail') && setIsDetail(true);
  }, []);

  React.useEffect(() => {
    onRun(code);
  }, [code]);

  return (
    <div>
      <Drawer visible={visible} width={width} onClose={onClose}>
        {!isDetail && (
          <div>
            <Title level={4}>表单模式</Title>
            <Radio.Group
              defaultValue={mode}
              buttonStyle="solid"
              onChange={onModeChange}
            >
              <Radio.Button value="create">新建</Radio.Button>
              <Radio.Button value="edit">编辑</Radio.Button>
              <Radio.Button value="view">查看</Radio.Button>
            </Radio.Group>
          </div>
        )}

        {isWizard && (
          <div style={{ marginTop: 20 }}>
            <Title level={4}>分布表单方向</Title>
            <Radio.Group
              defaultValue={direction}
              buttonStyle="solid"
              onChange={onDirectionChange}
            >
              <Radio.Button value="horizontal">横向</Radio.Button>
              <Radio.Button value="vertical">纵向</Radio.Button>
            </Radio.Group>
          </div>
        )}

        {!isWizard && (
          <div style={{ marginTop: 20 }}>
            <Title level={4}>表单按钮位置</Title>
            <Radio.Group
              defaultValue={actionsPosition}
              buttonStyle="solid"
              onChange={onActionsPositionChange}
            >
              <Radio.Button value={undefined}>默认</Radio.Button>
              <Radio.Button value="center">居中</Radio.Button>
              <Radio.Button value="right">右侧</Radio.Button>
              <Radio.Button value="bottom">底部</Radio.Button>
            </Radio.Group>
          </div>
        )}

        <Editor
          onRun={onClickRun}
          value={{
            mode,
            ...jsonEditorVal,
            ...(!isWizard && actionsPosition ? { actionsPosition } : {}),
            ...(isWizard ? { direction } : {}),
          }}
          type="detail"
        />
      </Drawer>

      {!visible && !iconVisible && <ConfigButton onClick={onClick} />}
    </div>
  );
};
