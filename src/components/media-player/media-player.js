import React from 'react';
import ReactPlayer from 'react-player';
import { Affix, Card, Typography } from 'antd';
import { PauseCircleFilled, PlayCircleFilled } from '@ant-design/icons';

import Image from '../image/image';
import theme from '../../style/theme';

const MediaPlayer = ({
  id,
  streamUrl,
  imgUrl,
  imgAlt,
  description,
  category,
  country,
  website,
  isPlaying,
  isVideo,
  width,
  height,
  handlePlayPauseClick,
}) => (
  <Affix offsetBottom={0} css={{ width: '100%', height: '200px' }}>
    <Card className="padding-md margin-around-md fullHeight">
      <Typography.Paragraph>
        <Image width={72} alt={imgAlt} src={imgUrl} />
        <div className={isVideo ? '' : 'parent play-icon'}>
          <div className={isVideo ? 'child' : ''}>
            <div
              className={isVideo ? '' : 'clickable child'}
              onClick={() => handlePlayPauseClick(id)}
            >
              {isPlaying ? (
                isVideo ? (
                  <div className="player-wrapper">
                    <ReactPlayer
                      playing={isPlaying}
                      url={streamUrl}
                      controls
                      height={`${Math.min(height, 180)}px`}
                      width={`${Math.min(width, 320)}px`}
                    />
                  </div>
                ) : (
                  <div className="player-wrapper">
                    <ReactPlayer
                      playing={isPlaying}
                      url={streamUrl}
                      controls
                      height="100px"
                      width="200px"
                    />
                  </div>
                )
              ) : (
                <PlayCircleFilled
                  css={{
                    fontSize: '64px',
                    color: theme.palette.secondary.main,
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </Typography.Paragraph>
      <Typography.Paragraph className="no-margin">
        <strong>{description}</strong>
        <br />
        {country} - {category}
        <br />
        <a href={website} target="_blank" rel="noreferrer">
          {website}
        </a>
      </Typography.Paragraph>
    </Card>
  </Affix>
);

export default MediaPlayer;
