const isHighLight = (highLightData, highLightLine) => {
  const { children, loc = [0, 0, 0, 0] } = highLightData;
  const [lineStart, , lineEnd] = loc;
  if (children) {
    return isActiveObj(highLightLine, lineStart, lineEnd);
  }
  return lineStart <= highLightLine && lineEnd >= highLightLine;
};

const hasHighLightChildren = (highLightData, highLightLine) => {
  const { children, loc = [0, 0, 0, 0] } = highLightData;
  const [lineStart, , lineEnd] = loc;
  if (children) {
    return (
      isActiveObj(highLightLine, lineStart, lineEnd) ||
      children.some(v => v && hasHighLightChildren(v, highLightLine))
    );
  }
  return lineStart <= highLightLine && lineEnd >= highLightLine;
};

function isActiveObj(highLightLine, start, end) {
  return highLightLine === start || highLightLine === end;
}

function createHighLightTreeData(treeData, highLightLine) {
  const data = Array.isArray(treeData) ? [...treeData] : [treeData];

  data.forEach(node => {
    if (!node) return;
    node.toggled = hasHighLightChildren(node, highLightLine);
    node.active = isHighLight(node, highLightLine);
    if (node.children) {
      if (node.active) {
        node.children = clearActiveNode(node.children);
      } else {
        node.children = createHighLightTreeData(node.children, highLightLine);
      }
    }
  });

  return data;
}

function clearActiveNode(treeData) {
  const data = Array.isArray(treeData) ? [...treeData] : [treeData];
  data.forEach(node => {
    if (!node) return;
    node.active = false;
    if (node.children) {
      node.children = clearActiveNode(node.children);
    }
  });
  return data;
}

export { createHighLightTreeData, clearActiveNode };
