import { isString, isNumber, isBoolean, lowerCase } from 'lodash';

const getData = data => data.value || data;

/**
 *
 * 其他类型暂时忽略
 */

const isIgnoreType = node => {
  return getData(node).type === 'ConditionalExpression';
};

/**
 * 基础类型
 */
export const isStringType = node => {
  if (isIgnoreType(node)) {
    return true;
  }
  return isString(getData(node).value);
};

export const isArrayType = node => {
  if (isIgnoreType(node)) {
    return true;
  }
  return getData(node).type === 'ArrayExpression';
};

export const isNumberType = node => {
  if (isIgnoreType(node)) {
    return true;
  }
  return isNumber(getData(node).value);
};

export const isBooleanType = node => {
  if (isIgnoreType(node)) {
    return true;
  }
  return isBoolean(getData(node).value);
};

export const isObjectType = node => {
  if (isIgnoreType(node)) {
    return true;
  }
  return getData(node).type === 'ObjectExpression';
};

export const isEmptyObjectType = node => {
  if (isIgnoreType(node)) {
    return true;
  }
  return isObjectType(node) && !getData(node).value;
};

export const isFunctionType = node => {
  if (isIgnoreType(node)) {
    return true;
  }
  return (
    getData(node).type === 'ArrowFunctionExpression' ||
    getData(node).type === 'FunctionExpression' ||
    getData(node).type === 'ObjectMethod'
  );
};

/**
 * field
 */

export const isNameType = node => {
  return isStringType(node) || isNumberType(node) || isArrayType(node);
};

export const isFieldRenderType = node => {
  return isStringType(node) || isObjectType(node) || isFunctionType(node);
};

export const isLayoutType = node => {
  if (isIgnoreType(node)) {
    return true;
  }
  return ['vertical', 'horizontal', 'inline'].indexOf(getData(node).value) > -1;
};

export const isModeType = node => {
  // console.log(getv(node).value);
  if (isIgnoreType(node)) {
    return true;
  }
  return ['view', 'create', 'edit'].indexOf(getData(node).value) > -1;
};

/**
 * 通用
 */
export const isFetchType = node => {
  const { properties } = getData(node);
  if (!properties.length) return false;
  return properties.some(item => {
    const { key, value } = item || {};
    if ((key.name || key.value) === 'url') {
      return true;
    }
  });
};

export const isMethodType = node => {
  if (isIgnoreType(node)) {
    return true;
  }
  return ['post', 'get', 'delete'].indexOf(lowerCase(getData(node).value)) > -1;
};

/**
 * table
 */

export const isColumnRender = node => {
  if (isIgnoreType(node)) {
    return true;
  }
  return (
    isStringType(node) ||
    isObjectType(node) ||
    isArrayType(node) ||
    isFunctionType(node)
  );
};

/**
 * action
 */
export const isActionType = node => {
  if (isIgnoreType(node)) {
    return true;
  }
  return (
    isStringType(node) ||
    isObjectType(node) ||
    isArrayType(node) ||
    isFunctionType(node)
  );
};
