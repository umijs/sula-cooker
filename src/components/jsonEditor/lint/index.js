import * as basicTypes from './basicType';
let monaco;
let editor;

const {
  isArrayType,
  isStringType,
  isNumberType,
  isBooleanType,
  isNameType,
  isFieldRenderType,
  isLayoutType,
  isObjectType,
  isMethodType,
  isFunctionType,
  isModeType,
  isColumnRender,
  isActionType,
} = basicTypes;

const errorMarks = (node, message = '类型错误') => {
  const name = node?.key?.name || node?.key?.value || node.value || '';
  const { loc } = node;

  monaco.editor.setModelMarkers(editor.getModel(), 'propFunc', [
    {
      startLineNumber: loc.start.line,
      startColumn: loc.start.column + 1,
      endLineNumber: loc.end.line,
      endColumn: loc.end.column + 1,
      message: `${name} ${message}`,
      severity: monaco.MarkerSeverity.Error,
    },
  ]);
};

function requiredValidate(field, name) {
  const nameList = Array.isArray(name) ? name : [name];
  const { properties } = field;
  if (!properties) return;
  if (
    !properties.some(item => {
      const itemName = item?.key?.name || item?.key?.value || item.value;
      return nameList.some(v => itemName === v);
    })
  ) {
    errorMarks(field, `缺少必填项${name}`);
  }
}

export default (data, _monaco, _editor) => {
  if (!data) return;
  monaco = _monaco;
  editor = _editor;
  const { properties = [] } = data;

  properties.forEach(node => {
    const { key } = node;
    const name = key?.name || key?.value;
    if (node?.loc?.start?.column < 5) {
      // 仅对最外层校验，内部校验直接处理外部字段
      validate(node, name);
    }
  });
};

function validate(node, name) {
  /**
   * fields字段校验
   */
  const fieldTypes = ['fields'];
  if (fieldTypes.includes(name)) {
    if (!isArrayType(node)) {
      errorMarks(node, '应为数组类型');
      return;
    }
    const { elements } = node.value || {};
    elements.forEach(field => {
      if (!isObjectType(field)) {
        errorMarks(field, '应为对象类型');
        return;
      }

      const { properties } = field;
      if (!properties) return;
      if (
        !properties.some(item => {
          const itemName = item?.key?.name || item?.key?.value || item.value;
          return itemName === 'fields';
        })
      ) {
        requiredValidate(field, 'name');
        requiredValidate(field, ['field', 'render']);
      }

      properties.forEach(item => {
        const itemName = item?.key?.name || item?.key?.value || item.value;
        if (itemName === 'name' && !isNameType(item)) {
          errorMarks(item);
          return;
        }
        if (itemName === 'label') {
          if (!isStringType(item)) {
            errorMarks(item);
            return;
          }
        }
        if (itemName === 'field') {
          if (!isFieldRenderType(item)) {
            errorMarks(item);
            return;
          }
          if (isObjectType(item)) {
            const { properties: renderProperties } = item.value;
            if (!renderProperties) return;
            renderProperties.forEach(renderItem => {
              const renderItemName =
                renderItem.key.name || renderItem.key.value;
              if (renderItemName === 'type') {
                if (!isStringType(renderItem) && !isFunctionType(renderItem)) {
                  errorMarks(renderItem);
                  return;
                }
              }
            });
          }
        }

        if (itemName === 'valuePropName' && !isStringType(item)) {
          errorMarks(item);
          return;
        }
        if (itemName === 'rules' && !isArrayType(item)) {
          errorMarks(item);
          return;
        }
        if (itemName === 'wrapFormItem' && !isBooleanType(item)) {
          errorMarks(item);
          return;
        }
        if (itemName === 'initialDisabled' && !isBooleanType(item)) {
          errorMarks(item);
          return;
        }
        if (itemName === 'initialVisible' && !isBooleanType(item)) {
          errorMarks(item);
          return;
        }
        if (itemName === 'dependency') {
          if (!isObjectType(item)) {
            errorMarks(item);
            return;
          }
          const { properties: depProperties } = item.value;
          if (!depProperties) return;
          depProperties.forEach(depItem => {
            const depName = depItem.key.name || depItem.key.value;
            const depType = ['value', 'source', 'disabled', 'visible'];
            if (!depType.includes(depName)) {
              errorMarks(
                depType,
                'dependency 只可以包含value source disabled visible四种类型',
              );
              return;
            }
            if (!isObjectType(depItem)) {
              errorMarks(depItem);
              return;
            }
            const { properties: depItemProperties } = depItem.value;
            if (!depItemProperties) return;
            depItemProperties.forEach(depNode => {
              const depNodeName = depNode.key.name || depNode.key.value;
              const allowDepTypes = [
                'relates',
                'inputs',
                'cases',
                'ignores',
                'type',
                'output',
                'defaultOutput',
              ];
              if (!allowDepTypes.includes(depNodeName)) {
                errorMarks(depNode, '多余类型');
                return;
              }

              if (depNodeName === 'relates') {
                if (!isArrayType(depNode)) {
                  errorMarks(depNode);
                  return;
                }
              }
              if (depNodeName === 'inputs') {
                if (!isArrayType(depNode)) {
                  errorMarks(depNode);
                  return;
                }
              }
              if (depNodeName === 'cases') {
                if (!isArrayType(depNode)) {
                  errorMarks(depNode);
                  return;
                }
              }
              if (depNodeName === 'ignores') {
                if (!isArrayType(depNode)) {
                  errorMarks(depNode);
                  return;
                }
              }
            });
          });
        }

        if (itemName === 'render' && !isFieldRenderType(item)) {
          errorMarks(item);
          return;
        }
      });
    });
  }

  /**
   * layout
   */
  if (name === 'layout') {
    if (!isLayoutType(node)) {
      errorMarks(node);
      return;
    }
  }

  /**
   * 请求校验
   */
  const fetchType = [
    'remoteSource',
    'remoteDataSource',
    'remoteValues',
    'submit',
  ];
  if (fetchType.includes(name)) {
    if (!isObjectType(node)) {
      errorMarks(node, '应为对象类型');
      return;
    }
    requiredValidate(node.value, 'url');
    const { properties } = node.value;
    if (!properties) return;
    properties.forEach(item => {
      const itemName = item.key.name || item.key.value;
      if (itemName === 'url' && !isStringType(item)) {
        errorMarks(item);
        return;
      }
      if (itemName === 'method' && !isMethodType(item)) {
        errorMarks(item);
        return;
      }
      if (itemName === 'params' && !isObjectType(item)) {
        errorMarks(item);
        return;
      }
      if (itemName === 'extraParams' && !isObjectType(item)) {
        errorMarks(item);
        return;
      }
      if (itemName === 'convertParams' && !isFunctionType(item)) {
        errorMarks(item);
        return;
      }
      if (itemName === 'converter' && !isFunctionType(item)) {
        errorMarks(item);
        return;
      }
    });
  }

  /**
   * columns
   */
  if (name === 'columns') {
    if (!isArrayType(node)) {
      errorMarks(node);
      return;
    }

    const { elements } = node.value || {};
    elements.forEach(column => {
      if (!isObjectType(column)) {
        errorMarks(column, '应为对象类型');
        return;
      }

      const { properties } = column;
      if (!properties) return;
      properties.forEach(item => {
        const itemName = item?.key?.name || item?.key?.value || item.value;
        if (itemName === 'key') {
          if (!isStringType(item)) {
            errorMarks(item, '应为字符串类型');
            return;
          }
        }
        if (itemName === 'title') {
          if (!isStringType(item)) {
            errorMarks(item, '应为字符串类型');
            return;
          }
        }
        if (itemName === 'render') {
          if (!isColumnRender(item)) {
            errorMarks(item);
            return;
          }
        }
      });
    });
  }

  /**
   * mode
   */

  if (name === 'mode') {
    if (!isModeType(node)) {
      errorMarks(node, 'mode可选类型为view create edit');
      return;
    }
  }

  /**
   * action
   */
  if (name === 'actionsRender' || name === 'leftActionsRender') {
    if (!isActionType(node)) {
      errorMarks(node);
      return;
    }
  }

  /**
   * formItem
   */
  if (name === 'itemLayout') {
    if (!isObjectType(node)) {
      errorMarks(node);
      return;
    }

    const { properties } = node.value;
    properties.forEach(item => {
      const itemName = item?.key?.name || item?.key?.value || item.value;
      if (itemName === 'span') {
        if (!isNumberType(item)) {
          errorMarks(item);
          return;
        }
      }
      if (itemName === 'gutter') {
        if (!isNumberType(item)) {
          errorMarks(item);
          return;
        }
      }
      if (itemName === 'offset') {
        if (!isNumberType(item)) {
          errorMarks(item);
          return;
        }
      }

      if (itemName === 'labelCol') {
        if (!isObjectType(item)) {
          errorMarks(item);
          return;
        }
      }
      if (itemName === 'wrapperCol') {
        if (!isObjectType(item)) {
          errorMarks(item);
          return;
        }
      }
    });
  }
}
