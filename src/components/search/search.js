import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import React from 'react';

import { SEARCH_PLACEHOLDER } from '../../util/consts';

const Search = ({ query, onChange }) => (
  <div className="site-card-wrapper">
    <Input
      className="no-padding"
      onChange={onChange}
      bordered={false}
      size="large"
      placeholder={SEARCH_PLACEHOLDER}
      value={query}
      prefix={<SearchOutlined />}
    />
  </div>
);

export default Search;
