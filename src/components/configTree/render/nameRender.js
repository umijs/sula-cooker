import React from 'react';

export default data => {
  const { type, name } = data;

  const pluginTypes = ['render', 'action', 'type', 'container', 'validator'];
  if (pluginTypes.includes(name)) {
    return <div className="codicon codicon-symbol-method"></div>;
  }

  if (name === 'fields' || name === 'columns') {
    return (
      <div className="codicon codicon-color-gold-6 codicon-symbol-array"> </div>
    );
  }

  if (typeof name === 'number' && type === 'object') {
    return <div className="codicon codicon-symbol-variable"></div>;
  }

  return <div className="codicon codicon-symbol-property"> </div>;
};
