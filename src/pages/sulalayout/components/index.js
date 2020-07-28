import React, { useState } from 'react';
import { Radio, Input } from 'antd';

export function RadioGroup(props) {
  const { source = [], ...rest } = props;
  return (
    <Radio.Group buttonStyle="solid" {...rest}>
      {source.map((ele) => (
        <Radio.Button key={ele} value={ele}>
          {ele}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
}

export function TextArea(props) {
  const [height, setHeight] = useState(32);

  return (
    <div>
      <Input.TextArea
        onResize={({ height }) => {
          setHeight(height);
        }}
        style={{ height, width: '100%' }}
        value={`height: ${height}`}
        {...props}
      />
    </div>
  );
}
