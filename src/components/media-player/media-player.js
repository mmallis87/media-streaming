import React from 'react';
import { Affix, Card, Typography } from 'antd';
import { PauseCircleFilled, PlayCircleFilled } from '@ant-design/icons';

import Image from '../image/image';
import theme from '../../style/theme';

const MediaPlayer = ({
  imgUrl,
  imgAlt,
  description,
  isPlaying,
  handlePlayPauseClick,
}) => (
  <Affix offsetBottom={0} css={{ width: '100%' }}>
    <Card className="padding-md margin-around-md">
      <Typography.Paragraph>
        <Image width={96} alt={imgAlt} src={imgUrl} />
        <div className="parent play-icon">
          <div className="child">
            <div className="clickable child" onClick={handlePlayPauseClick}>
              {isPlaying ? (
                <PauseCircleFilled
                  css={{
                    fontSize: '64px',
                    color: theme.palette.secondary.main,
                  }}
                />
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
        {description}
      </Typography.Paragraph>
    </Card>
  </Affix>
);

export default MediaPlayer;
