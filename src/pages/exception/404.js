import React from 'react';
import { Link } from 'umi';
import { Result, Button } from 'antd';

export default () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Link to="/">
        <Button type="primary">Back Home</Button>
      </Link>
    }
  />
);
