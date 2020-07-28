import React from 'react';
import StepForm from '@/components/jsonFormTemp';
import { Card } from 'sula';
import { stepformConfig as config } from '@sula/templates';

export default (props) => {
  return (
    <Card>
      <StepForm {...props} {...config} />
    </Card>
  );
};
