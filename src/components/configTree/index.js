import React, { useState, useEffect } from 'react';
import castArray from 'lodash/castArray';
import createTreeData, { getConfigNode } from './parser';
import { createHighLightTreeData, clearActiveNode } from './parser/highlight';
import TreeNode from './treeNode';
import iconRender from './render/iconRender';
import nameRender from './render/nameRender';

import './index.less';

export { iconRender, nameRender };

function parseData(data) {
  let res;
  try {
    res = createTreeData(getConfigNode(data));
  } catch (e) {}

  return res;
}

export default props => {
  const {
    data,
    onToggle,
    onSelect,
    nameRender,
    iconRender,
    contextMenuRender,
    style,
    level = 0,
    currentLine,
  } = props;
  const [treeData, setTreeData] = useState(parseData(data));
  const [activeLine, setActiveLine] = useState(-1);

  useEffect(() => {
    setTreeData(parseData(data));
  }, [data]);

  useEffect(() => {
    if (!treeData || !treeData[0]) {
      setActiveLine(-1);
    } else {
      setActiveLine(currentLine);
    }
  }, [treeData, currentLine]);

  useEffect(() => {
    setTimeout(() => {
      setTreeData(createHighLightTreeData(treeData, activeLine));
    });
  }, [activeLine]);

  const handleSelect = (node, hasChildren) => {
    const noActiveData = clearActiveNode(treeData);
    setTreeData(noActiveData);
    onSelect(node, hasChildren);
  };

  return (
    <div className="si-tree" style={style}>
      {castArray(treeData).map((node, index) => {
        if (!node) return;

        return (
          <TreeNode
            data={node}
            onToggle={onToggle}
            onSelect={handleSelect}
            nameRender={nameRender}
            iconRender={iconRender}
            contextMenuRender={contextMenuRender}
            key={node.name || index}
            level={level}
            activeLine={activeLine}
          />
        );
      })}
    </div>
  );
};
