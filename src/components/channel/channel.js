import React, { useEffect, useState } from 'react';
import {
  Typography,
  Progress,
  Rate,
  Tooltip,
  Row,
  Col,
  Card,
  Space,
} from 'antd';

import Pill from '../pill/pill';
import Audio from '../audio/audio';
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
  } = stream;
  const [streamAvailable, setStreamAvailable] = useState(false);
  const audioElementRef = React.createRef();

  const handleClick = () => {
    const audioElement = audioElementRef.current;
    handleCardClick({ ...stream, audioElement });
  };

  const handleAudioError = () => {
    showUnavailableErrorToast();
    setStreamAvailable(false);
    stopPlayingStream(id);
  };

  useEffect(() => {
    setStreamAvailable(true);
  }, []);

  return (
    <Card
      className="clickable"
      onClick={handleClick}
      bordered
      css={{ width: '100%', height: 355, minWidth: 250, marginTop: 16 }}
    >
      <Typography.Paragraph>
        <Image alt={name} src={imgUrl} />
      </Typography.Paragraph>
      <Row>
        <Col flex={10}>
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
        </Col>
        <Col flex={1}>
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
            <Pill
              key={tag}
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
      {streamAvailable && (
        <Audio
          ref={audioElementRef}
          src={streamUrl}
          onError={(e) => handleAudioError(e.error?.message)}
        />
      )}
    </Card>
  );
};

export { Channel as default };
