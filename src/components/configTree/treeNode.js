import React, { useEffect, useState } from 'react';
import isArray from 'lodash/isArray';
import cx from 'classnames';

function TreeNode(props) {
  const {
    data,
    nameRender,
    iconRender,
    level,
    contextMenuRender,
    activeLine,
  } = props;
  const [nodeData, setNodeData] = useState(data);
  const isDirectory = !!nodeData.children;

  const handleClick = () => {
    const { onToggle, onSelect } = props;
    const newNodeData = { ...nodeData };
    // newNodeData.active = true;
    if (newNodeData.children) {
      newNodeData.toggled = !nodeData.toggled;
    }
    setNodeData(newNodeData);
    if (onSelect) {
      onSelect(newNodeData, !!nodeData.children);
    }
  };

  useEffect(() => {
    setNodeData(data);
  }, [activeLine]);

  const renderChildren = level => {
    const {
      onToggle,
      onSelect,
      nameRender,
      iconRender,
      contextMenuRender,
    } = props;

    if (nodeData.loading) {
      return <span>loading...</span>;
    }

    let children = nodeData.children;
    if (!isArray(children)) {
      children = children ? [children] : [];
    }

    return (
      <div>
        {children.map((child, index) => (
          <TreeNode
            onToggle={onToggle}
            onSelect={onSelect}
            key={child.name || index}
            data={child}
            nameRender={nameRender}
            iconRender={iconRender}
            contextMenuRender={contextMenuRender}
            level={level}
            activeLine={activeLine}
          />
        ))}
      </div>
    );
  };

  let blockNode = (
    <div
      className={cx(
        'si-tree-node-block',
        nodeData.active && 'si-tree-node-block-actived',
      )}
      onClick={handleClick}
    >
      <div
        style={{
          paddingLeft: `${isDirectory ? level : level + 1}em`,
          display: 'flex',
        }}
      ></div>
      {isDirectory ? (
        <div
          className={cx(
            'si-tree-node-switcher codicon',
            nodeData.toggled ? 'codicon-chevron-down' : 'codicon-chevron-right',
          )}
        />
      ) : (
        <div style={{ paddingLeft: 4 }} />
      )}
      {iconRender ? (
        <div className="si-tree-node-icon">{iconRender(nodeData)}</div>
      ) : null}
      <div className="si-tree-node-name">
        {nameRender ? nameRender(nodeData) : nodeData.name}
      </div>
    </div>
  );

  if (contextMenuRender) {
    blockNode = contextMenuRender(nodeData, blockNode);
  }

  return (
    <div className="si-tree-node">
      {blockNode}
      {nodeData.toggled ? renderChildren(level + 1) : null}
    </div>
  );
}

export default TreeNode;
