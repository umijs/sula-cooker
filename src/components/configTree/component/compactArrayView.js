import React from 'react';

const prefixCls = 'tree-compact';

export default class CompactArrayView extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.array.length !== this.props.array.length;
  }

  render() {
    let { array } = this.props;
    let count = array.length;

    if (count === 0) {
      return <span>{'[ ]'}</span>;
    }
    return (
      <span className={prefixCls}>
        <span>{'['}</span>
        <span>{count + ' element' + (count > 1 ? 's' : '')}</span>
        <span>{']'}</span>
      </span>
    );
  }
}
