import React, { useState } from 'react';
import { Typography, message, Radio, Space } from 'antd';
import ConfigButton from '@/components/configButton';
import Drawer from '@/components/drawer';
import Editor from '@/components/jsonEditor';
import StyleSelect from '@/components/styleSelect';

const { Title } = Typography;

const formStyleLists = [
  {
    type: '卡片表单',
    img: 'https://img.alicdn.com/tfs/TB15HnIqAL0gK0jSZFtXXXQCXXa-40-32.svg',
    url: '/form/card',
  },
  {
    type: '嵌套卡片表单',
    img: 'https://img.alicdn.com/tfs/TB1XSzOqBr0gK0jSZFnXXbRRXXa-40-32.svg',
    url: '/form/nestedcard',
  },
  {
    type: '多列布局',
    img: 'https://img.alicdn.com/tfs/TB1CwzLqrr1gK0jSZFDXXb9yVXa-40-40.svg',
    url: '/form/vertical',
  },
  {
    type: '单列布局',
    img: 'https://img.alicdn.com/tfs/TB1fgrPqxD1gK0jSZFyXXciOVXa-40-40.svg',
    url: '/form/horizontal',
  },
  {
    type: '分步表单',
    img: 'https://img.alicdn.com/tfs/TB1maTYqAT2gK0jSZPcXXcKkpXa-40-32.svg',
    url: '/form/stepform',
  },
  {
    type: '响应式布局',
    img: 'https://gw.alicdn.com/tfs/TB1ZNSmGoT1gK0jSZFhXXaAtVXa-53-46.svg',
    url: '/form/media',
  },
];

export default props => {
  const {
    width = 600,
    id,
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
  const [isDetail, setIsDetail] = useState(false);
  const styleRef = React.useRef(null);

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

  const height =
    styleRef?.current?.clientHeight || styleRef?.current?.offsetHeight;

  return (
    <div>
      <Drawer visible={visible} width={width} onClose={onClose}>
        <div ref={styleRef}>
          <Space direction="vertical" style={{ marginBottom: 24 }}>
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

            <StyleSelect
              key={mode}
              mode={mode}
              title="表单风格设置"
              data={formStyleLists}
              id={id}
            />

            {isWizard && (
              <div>
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
              <div>
                <Title level={4}>表单按钮位置</Title>
                <Radio.Group
                  defaultValue={actionsPosition || 'default'}
                  buttonStyle="solid"
                  onChange={onActionsPositionChange}
                >
                  <Radio.Button value="default">默认</Radio.Button>
                  <Radio.Button value="center">居中</Radio.Button>
                  <Radio.Button value="right">右侧</Radio.Button>
                  <Radio.Button value="bottom">底部</Radio.Button>
                </Radio.Group>
              </div>
            )}
          </Space>
        </div>

        <Editor
          onRun={onClickRun}
          shallowHeight={height}
          value={{
            mode,
            ...code,
            ...(!isWizard && actionsPosition ? { actionsPosition } : {}),
            ...(isWizard ? { direction } : {}),
          }}
        />
      </Drawer>

      {!visible && !iconVisible && <ConfigButton onClick={onClick} />}
    </div>
  );
};
