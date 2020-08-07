import React, { useEffect, useState } from 'react';
import {
  Typography,
  Card,
  Progress,
  Rate,
  Tag,
  Tooltip,
  Row,
  Col,
  Space,
  message,
} from 'antd';

import Image from '../image/image';
import theme from '../../style/theme';

const Channel = (stream) => {
  const {
    id,
    name,
    description,
    imgUrl,
    popularity,
    tags,
    reliability,
    streamUrl,
    playPauseStream,
    stopPlayingStream,
    handleTagClick,
    selectedTag,
  } = stream;
  const [fetchingData, setFetchingData] = useState(true);
  const [streamAvailable, setStreamAvailable] = useState(false);
  const audioElementRef = React.createRef();

  const handleCardClick = async () => {
    const audioElement = audioElementRef.current;
    playPauseStream({ ...stream, audioElement });
  };

  const handleAudioError = () => {
    const key = 'loading-audio';
    message.error(
      {
        key,
        content:
          'This channel appears to be unavailable at the moment. Please try again later.',
      },
      3,
    );
    setStreamAvailable(false);
    stopPlayingStream(id);
  };

  const fetchdata = async () => {
    setFetchingData(true);
    try {
      setStreamAvailable(true);
    } catch (error) {
      handleAudioError(error.message);
    }

    setFetchingData(false);
  };

  useEffect(() => {
    fetchdata().then();
  }, []);

  return (
    !fetchingData && (
      <div className="clickable" onClick={handleCardClick}>
        <Card
          bordered
          style={{ width: '100%', height: 360, minWidth: 250, marginTop: 16 }}
        >
          <div className="space-align-container">
            <span className="space-align-block">
              <Space align="start">
                <Image alt={name} src={imgUrl} />
              </Space>
            </span>
          </div>
          <Row>
            <Col flex={1}>
              <Tooltip
                title={`${reliability}% reliable`}
                color={theme.palette.primary.main}
              >
                <Progress
                  percent={reliability}
                  steps={10}
                  size="small"
                  showInfo={false}
                  strokeColor="#52c41a"
                />
              </Tooltip>
            </Col>
            <Col flex={2}>
              <Tooltip
                title={`Popularity ${popularity} / 5`}
                color={theme.palette.primary.main}
              >
                <Space align="end">
                  <Rate disabled allowHalf defaultValue={popularity} />
                </Space>
              </Tooltip>
            </Col>
          </Row>
          <Typography.Paragraph>
            {tags &&
              tags.map((tag) => (
                <Tag.CheckableTag
                  style={{ border: 'solid 1px', borderRadius: '3px' }}
                  key={tag}
                  checked={tag === selectedTag}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTagClick(tag);
                  }}
                >
                  {tag}
                </Tag.CheckableTag>
              ))}
          </Typography.Paragraph>
          <Typography.Paragraph ellipsis>
            <h4>{name}</h4>
          </Typography.Paragraph>
          <Typography.Paragraph ellipsis>{description}</Typography.Paragraph>
          {streamAvailable && (
            <audio
              ref={audioElementRef}
              preload="none"
              onError={(e) => handleAudioError(e.error?.message)}
            >
              <source src={streamUrl} />
              <track kind="captions" />
              This channel is currently unavailable.
            </audio>
          )}
        </Card>
      </div>
    )
  );
};

export { Channel as default };
