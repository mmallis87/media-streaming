import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const SpinContainer = ({ children, fetchingData }) => (
  <Spin
    spinning={fetchingData}
    indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />}
    size="large"
  >
    {children}
  </Spin>
);

export default SpinContainer;
