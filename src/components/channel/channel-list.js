import React from 'react';
import { List } from 'antd';
import Channel from './channel';

const ChannelList = ({
  dataSource,
  items,
  filteredItems,
  handleCardClick,
  stopPlayingStream,
  handleTagClick,
  selectedTag,
}) => (
  <div className="site-card-wrapper">
    <List
      rowKey={({ id }) => id}
      grid={{
        gutter: 32,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4,
        xxl: 4,
      }}
      dataSource={dataSource}
      renderItem={(item) =>
        item.id in items &&
        item.id in filteredItems && (
          <List.Item span={16}>
            <Channel
              key={item.id}
              {...item}
              handleCardClick={handleCardClick}
              stopPlayingStream={stopPlayingStream}
              handleTagClick={handleTagClick}
              selectedTag={selectedTag}
            />
          </List.Item>
        )
      }
    />
  </div>
);

export default ChannelList;
