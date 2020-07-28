import React from 'react';
import StepQueryTable from '@/components/jsonTableTemp';
import { stepquerytableConfig as config } from '@sula/templates';

export default () => {
  return <StepQueryTable {...config} />;
};
