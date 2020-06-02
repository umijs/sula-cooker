import React from 'react';
import CompactArrayView from '../component/compactArrayView';
import CompactObjectView from '../component/compactObjectView';

function iconRender(data) {
  const { name, type, children, toggled } = data;
  if (toggled) {
    return name;
  }
  if (type === 'array') {
    return (
      <div>
        <span>{name}</span>
        <CompactArrayView array={children} />
      </div>
    );
  }
  if (type === 'object') {
    return (
      <div>
        <span>{name}</span>
        <CompactObjectView object={children} />
      </div>
    );
  }
  return name;
}

export default iconRender;
