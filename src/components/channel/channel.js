import React from 'react';
import {
  Card,
  Col,
  Progress,
  Rate,
  Row,
  Space,
  Tooltip,
  Typography,
} from 'antd';

import ReactPlayer from 'react-player';
import Pill from '../pill/pill';
import Image from '../image/image';
import theme from '../../style/theme';
import { showUnavailableErrorToast } from '../message-center/toasts';

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
    handleCardClick,
    stopPlayingStream,
    handleTagClick,
    selectedTag,
    isPlaying,
    isVideo,
  } = stream;

  const handleClick = () => {
    handleCardClick(stream);
  };

  const handleAudioError = () => {
    showUnavailableErrorToast();
    stopPlayingStream(id);
  };

  return (
    <Card
      className="clickable"
      onClick={handleClick}
      bordered
      css={{ width: '100%', height: 355, minWidth: 250, marginTop: 16 }}
    >
      <Typography.Paragraph>
        <Image alt={name} src={imgUrl} width="145" height="145" />
      </Typography.Paragraph>
      <Row>
        <Col flex={10}>
          {reliability && (
            <Tooltip
              title={`${reliability}% reliable`}
              color={theme.palette.primary.main}
            >
              <Progress
                percent={reliability}
                steps={10}
                size="small"
                showInfo={false}
                strokeColor={theme.strokeColor}
              />
            </Tooltip>
          )}
        </Col>
        <Col flex={1}>
          {popularity && (
            <Tooltip
              title={`Popularity ${popularity} / 5`}
              color={theme.palette.primary.main}
            >
              <Space align="end">
                <Rate disabled allowHalf defaultValue={popularity} />
              </Space>
            </Tooltip>
          )}
        </Col>
      </Row>
      <Typography.Paragraph>
        {tags &&
          tags.map((tag) => (
            <Pill
              key={tag + new Date().getTime()}
              text={tag}
              checked={tag === selectedTag}
              handleClick={handleTagClick}
            />
          ))}
      </Typography.Paragraph>
      <Typography.Paragraph ellipsis>
        <h4>{name}</h4>
      </Typography.Paragraph>
      <Typography.Paragraph ellipsis>{description}</Typography.Paragraph>
      {isPlaying && !isVideo && (
        <ReactPlayer
          playing={isPlaying}
          url={streamUrl}
          onError={(e) => handleAudioError(e.error?.message)}
        />
      )}
    </Card>
  );
};

export { Channel as default };
