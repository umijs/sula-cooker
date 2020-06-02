import { parse } from '@babel/parser';
import { visit } from 'ast-types';

function getConfigNode(data) {
  let configNode;

  visit(parse(data), {
    visitIdentifier: path => {
      if (configNode) {
        return false;
      }
      const name = path.getValueProperty('name');
      if (name === 'config') {
        const node = path.parentPath.getValueProperty('init');
        if (node) {
          configNode = node;
        }
      }
      return false;
    },
  });

  return configNode;
}

export { getConfigNode };

function locToPositon(data) {
  const { start, end } = data;
  const { line: startLine, column: startCol } = start;
  const { line: endLine, column: endCol } = end;
  const position = [startLine, startCol + 1, endLine, endCol + 1];
  return position;
}

export default function createTreeData(data) {
  if (!data) return;

  const { loc, properties = [] } = data;
  const astTree = properties.map(node => {
    if (!node) return;
    const { key, value, loc, type } = node;
    // 直接使用value类型 字符串 数值 布尔值
    const valueType = [
      'StringLiteral',
      'NumericLiteral',
      'BooleanLiteral',
      'ConditionalExpression',
      'MemberExpression',
    ];
    const objectType = ['ObjectExpression'];
    const arrayType = ['ArrayExpression'];
    const funcType = ['ArrowFunctionExpression', 'FunctionExpression'];
    const paramsType = ['Identifier', 'ThisExpression'];

    const position = locToPositon(loc);

    const name = key?.name || key?.value;

    // 方法的快捷表示法
    if (type === 'ObjectMethod') {
      return {
        name,
        value: null,
        loc: position,
      };
    }

    if (valueType.includes(value.type)) {
      return {
        name,
        value: value.value,
        loc: position,
      };
    }

    if (objectType.includes(value.type)) {
      return {
        name,
        value: null,
        loc: position,
        children: createTreeData(value),
        type: 'object',
      };
    }

    if (arrayType.includes(value.type)) {
      return {
        name,
        value: null,
        loc: position,
        children: value.elements.map((v, idx) => {
          return {
            name: idx,
            value: null,
            type: 'object',
            loc: locToPositon(v.loc),
            children: createTreeData(v),
          };
        }),
        type: 'array',
      };
    }

    if (funcType.includes(value.type)) {
      return {
        name,
        value: null,
        loc: position,
      };
    }

    if (paramsType.includes(value.type)) {
      return {
        name,
        value: null,
        loc: position,
      };
    }
  });

  return astTree;
}
