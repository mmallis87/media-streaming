import React from 'react';
import { Spin } from 'antd';

import LoadingOutlinedIcon from './loading-outlined-icon';

const SpinContainer = ({ children, fetchingData }) => (
  <Spin
    spinning={fetchingData}
    indicator={LoadingOutlinedIcon}
    delay={200}
    size="large"
  >
    {children}
  </Spin>
);

export default SpinContainer;
