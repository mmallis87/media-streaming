import { Tag } from 'antd';
import React from 'react';

const Pill = ({ text, checked, handleClick }) => (
  <Tag.CheckableTag
    checked={checked}
    css={{ border: 'solid 1px', borderRadius: '3px' }}
    onClick={(e) => {
      e.stopPropagation();
      handleClick(text);
    }}
  >
    {text}
  </Tag.CheckableTag>
);

export { Pill as default };
