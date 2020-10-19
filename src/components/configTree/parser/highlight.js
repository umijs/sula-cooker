const isHightLight = (hightLightData, highLightLine) => {
  const { children, loc = [0, 0, 0, 0] } = hightLightData;
  const [lineStart, , lineEnd] = loc;
  if (children) {
    return isActiveObj(highLightLine, lineStart, lineEnd);
  }
  return lineStart <= highLightLine && lineEnd >= highLightLine;
};

const hasHighLightChildren = (hightLightData = {}, highLightLine) => {
  const { children, loc = [0, 0, 0, 0] } = hightLightData;
  const [lineStart, , lineEnd] = loc;
  if (children) {
    return (
      isActiveObj(highLightLine, lineStart, lineEnd) ||
      children.some(v => hasHighLightChildren(v, highLightLine))
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
    node.active = isHightLight(node, highLightLine);
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
