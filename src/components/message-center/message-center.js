import React from 'react';
import { Alert } from 'antd';

const MessageCenter = ({ errorMessage }) =>
  errorMessage && (
    <Alert
      message="Error"
      description={errorMessage}
      type="error"
      showIcon
      closable
    />
  );

export default MessageCenter;
