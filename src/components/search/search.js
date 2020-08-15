import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import React from 'react';

import { SEARCH_PLACEHOLDER } from '../../util/consts';

const Search = ({ query, onChange }) => (
  <div className="site-card-wrapper">
    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
    <label htmlFor="search">
      <Input
        id="search"
        className="no-padding"
        onChange={onChange}
        bordered={false}
        size="large"
        placeholder={SEARCH_PLACEHOLDER}
        value={query}
        prefix={<SearchOutlined />}
      />
    </label>
  </div>
);

export default Search;
