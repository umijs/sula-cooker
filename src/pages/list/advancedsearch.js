import React from 'react';
import QueryTable from '@/components/jsonTableTemp';
import { advancesearchConfig as config } from '@sula/templates';

export default () => {
  return <QueryTable {...config} />;
};
