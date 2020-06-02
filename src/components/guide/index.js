import React, { useState, useEffect, useRef } from 'react';

import style from './index.less';
import { Space, Button, Popover } from 'antd';
import ThemeContext, { GUIDE, DONE } from '@/layout/themeContext';

function getElementLeft(element) {
  let actualLeft = element.offsetLeft;
  let current = element.offsetParent;

  while (current !== null) {
    actualLeft += current.offsetLeft;
    current = current.offsetParent;
  }

  return actualLeft;
}
function getElementTop(element) {
  let actualTop = element.offsetTop;
  let current = element.offsetParent;

  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }

  return actualTop;
}

export default props => {
  const { children } = props;
  const containerRef = useRef();
  const [visible, setVisible] = useState(true);
  const [guideNodes, setGuideNodes] = useState([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const theme = React.useContext(ThemeContext);

  useEffect(() => {
    setTimeout(() => {
      setGuideNodes(markDom());
    });
    window.addEventListener('resize', onWindowResize, false);
    return () => {
      window.removeEventListener('resize', onWindowResize, false);
    };
  }, []);

  function onWindowResize() {
    setGuideNodes(markDom());
  }

  const markDom = () => {
    const nodeList = [...document.querySelectorAll('[data-guide-step]')].sort(
      (p, c) => p.dataset.guideStep - c.dataset.guideStep,
    );

    const dots = nodeList.map(node => {
      const height = node.clientHeight || node.offsetHeight;
      const width = node.clientWidth || node.offsetWidth;
      const left = getElementLeft(node);
      const top = getElementTop(node);

      return {
        left: left - 10,
        top: top - 10,
        width: width + 20,
        height: height + 20,
        tips: node.getAttribute('data-guide-tips'),
        step: node.getAttribute('data-guide-step'),
        snapshot: node.getAttribute('data-guide-snapshot'),
      };
    });

    return dots;
  };

  function closeGuideTips() {
    theme.toggleGuideTips(true);
    localStorage.setItem(GUIDE, DONE);
  }

  const onSkip = () => {
    setActiveIdx(-1);
    closeGuideTips();
  };

  const onNext = () => {
    setActiveIdx(activeIdx + 1);
    if (activeIdx === guideNodes.length - 1) {
      closeGuideTips();
    }
  };

  const onPrev = () => {
    setActiveIdx(activeIdx - 1);
  };

  useEffect(() => {
    setVisible(activeIdx > -1 && activeIdx < guideNodes.length);
  }, [activeIdx, guideNodes]);

  const renderShallow = () => {
    return (
      <div>
        <div className={style.shadow}></div>
        {guideNodes.map((node, idx, { length }) => {
          const { tips, step, snapshot, ...nodeStyle } = node;
          const content = (
            <div>
              <div style={{ marginBottom: '8px' }}>
                <img width="200" src={snapshot} />
              </div>
              <Space>
                <Button size="small" onClick={onSkip}>
                  跳过
                </Button>
                <Button.Group>
                  <Button
                    size="small"
                    onClick={onPrev}
                    disabled={activeIdx === 0}
                  >
                    上一步
                  </Button>
                  <Button size="small" onClick={onNext}>
                    {activeIdx === length - 1 ? '结束' : '下一步'}
                  </Button>
                </Button.Group>
              </Space>
            </div>
          );
          return (
            <div key={idx} style={{ display: activeIdx === idx ? '' : 'none' }}>
              <Popover
                mouseEnterDelay={0}
                mouseLeaveDelay={0}
                overlayStyle={{ textAlign: 'right' }}
                title={tips}
                visible={activeIdx === idx}
                content={content}
                placement="leftTop"
              >
                <div
                  key={idx}
                  style={nodeStyle}
                  className={style.activeNode}
                ></div>
              </Popover>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={style.container} ref={containerRef}>
      {children}
      {visible && renderShallow()}
    </div>
  );
};

export function Guide(props) {
  const {
    children,
    step,
    tips = '',
    snapshot = 'https://img.alicdn.com/tfs/TB1_e8_H1L2gK0jSZPhXXahvXXa-696-272.png',
    ...rest
  } = props;
  const theme = React.useContext(ThemeContext);

  if (theme.hiddenGuideTips) {
    return children;
  }

  return (
    <span
      data-guide-step={step}
      data-guide-tips={tips}
      data-guide-snapshot={snapshot}
      {...rest}
      className={style.guide}
    >
      {children}
    </span>
  );
}
