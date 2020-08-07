import React from 'react';
import { Alert } from 'antd';

const MessageCenter = ({ message, errorMessage }) =>
  errorMessage ? (
    <Alert
      message={message}
      description={errorMessage}
      type="error"
      showIcon
      closable
    />
  ) : (
    <></>
  );

export default MessageCenter;
