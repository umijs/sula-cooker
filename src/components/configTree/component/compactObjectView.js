import React from 'react';

const prefixCls = 'tree-compact';

export default class CompactObjectView extends React.Component {
  shouldComponentUpdate(nextProps) {
    const nextLength = Object.keys(nextProps.object).length;
    const prevLength = Object.keys(this.props.object).length;
    return nextLength !== prevLength;
  }

  render() {
    let keys = this.props.object.map(v => v.name);
    let count = keys.length;

    if (count === 0) {
      return <span>{'{ }'}</span>;
    }
    if (count > 2) {
      keys = keys.slice(0, 2).concat([`... +${count - 2}`]);
    }
    return (
      <span className={prefixCls}>
        <span>{'{'}</span>
        <span>{keys.join(', ')}</span>
        <span>{'}'}</span>
      </span>
    );
  }
}
