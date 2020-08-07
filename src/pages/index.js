import React, { useEffect, useState } from 'react';
import { List, Input, BackTop, Affix, Card, Typography, message } from 'antd';
import {
  PauseCircleFilled,
  PlayCircleFilled,
  SearchOutlined,
} from '@ant-design/icons';
import { pick } from 'lodash';

import { getStreams } from '../services/tunein-json-api';
import filterObjectByValue from '../util/helpers';
import Layout from '../components/layout/layout';
import SEO from '../components/seo/seo';
import Channel from '../components/channel/channel';
import MessageCenter from '../components/message-center/message-center';
import Image from '../components/image/image';
import theme from '../style/theme';

const IndexPage = () => {
  global.alert = () => {};
  const [errorMessage, setErrorMessage] = useState('');
  const [query, setQuery] = useState('');
  const [streams, setStreams] = useState({});
  const [filteredStreams, setFilteredStreams] = useState({});
  const [streamIdsByTag, setStreamIdsByTag] = useState({});
  const [selectedTag, setSelectedTag] = useState('');
  const [playingStream, setPlayingStream] = useState(null);
  const [streamChecked, setStreamChecked] = useState({});

  const handleQueryChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
  };

  const handleTagClick = (tag) => {
    setQuery('');
    if (tag === selectedTag) {
      setSelectedTag('');
      setFilteredStreams(streams);
    } else {
      setSelectedTag(tag);
      const taggedStreamIds = streamIdsByTag[tag];
      const newFilteredStreams = pick(streams, taggedStreamIds);
      setFilteredStreams(newFilteredStreams);
    }
  };

  const handlePlayPauseClick = () => {
    if (playingStream.audioElement.paused) {
      playingStream.audioElement.play();
      setPlayingStream({ ...playingStream, isPlaying: true });
    } else {
      playingStream.audioElement.pause();
      setPlayingStream({ ...playingStream, isPlaying: false });
    }
  };

  const stopPlayingStream = (id) => {
    if (id === playingStream.id) {
      setPlayingStream(null);
    }
  };

  const playPauseStream = async (stream) => {
    let bufferingMessage;
    const { audioElement, id, name } = stream;
    const key = 'loading-audio';
    if (audioElement) {
      if (audioElement.paused) {
        if (!streamChecked[id]) {
          try {
            bufferingMessage = message.loading(
              { key, content: 'Buffering...' },
              0,
            );
          } catch (error) {
            message.error(
              {
                key,
                content: `${error.message}. This channel appears to be unavailable at the moment.`,
              },
              3,
            );
            return;
          }
        }

        global.document.title = `${name} Channel | ${
          global.document.title.split(' | ')[1]
        }`;

        setStreamChecked((oldStreamChecked) => {
          oldStreamChecked[id] = true;
          return {
            ...oldStreamChecked,
          };
        });

        const i = setImmediate(() => {
          clearImmediate(i);
          if (bufferingMessage) {
            bufferingMessage();
          }
        });

        if (playingStream && !playingStream.audioElement.paused) {
          playingStream.audioElement.pause();
        }
        audioElement.play();
        setPlayingStream({ ...stream, isPlaying: true });
      }
    } else {
      message.error(
        {
          key,
          content:
            'This channel appears to be unavailable at the moment. Please try again later.',
        },
        3,
      );
    }
  };

  const fetchData = async () => {
    setErrorMessage('');
    try {
      const res = await getStreams();
      const newStreamIdsByTag = {};
      const newStreams = res.data.reduce((obj, stream) => {
        obj[stream.id] = stream;
        stream.tags.forEach((tag) => {
          if (!newStreamIdsByTag[tag]) {
            newStreamIdsByTag[tag] = [];
          }
          newStreamIdsByTag[tag].push(stream.id);
        });
        return obj;
      }, {});
      setStreams(newStreams);
      setFilteredStreams(newStreams);
      setStreamIdsByTag(newStreamIdsByTag);
    } catch (error) {
      setStreams([]);
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    fetchData().then();
  }, []);

  useEffect(() => {
    if (!query) {
      setFilteredStreams(streams);
      return;
    }

    let newFilteredStreams = filterObjectByValue(streams, query);

    if (selectedTag) {
      const taggedStreamIds = streamIdsByTag[selectedTag];
      newFilteredStreams = pick(newFilteredStreams, taggedStreamIds);
    }

    if (playingStream) {
      newFilteredStreams[playingStream.id] = playingStream;
    }

    setFilteredStreams(newFilteredStreams);
  }, [query]);

  useEffect(() => {
    if (playingStream) {
      // TODO figure out a better way to keep playing the strea without interruption when the stream card is briefly unmounted
      setTimeout(() => {
        if (playingStream.audioElement.paused) {
          playingStream.audioElement.play();
        }
      }, 10);
    }
  }, [filteredStreams]);

  return (
    <div>
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

        <div className="container">
          {/* Sticky error messages center in the top of the page */}
          <div className={errorMessage ? 'box' : ''}>
            <MessageCenter errorMessage={errorMessage} />
          </div>

          <div className="site-card-wrapper">
            <Input
              className="no-padding"
              onChange={handleQueryChange}
              bordered={false}
              size="large"
              placeholder="Search (news, music, sports, city, name... or anything. really!)"
              value={query}
              prefix={<SearchOutlined />}
            />
          </div>

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
              dataSource={Object.values(filteredStreams).sort((s1, s2) =>
                s2.popularity === s1.popularity
                  ? s2.reliability - s1.reliability
                  : s2.popularity - s1.popularity,
              )}
              renderItem={(stream) =>
                stream.id in streams &&
                stream.id in filteredStreams && (
                  <List.Item span={16}>
                    <Channel
                      key={stream.id}
                      {...stream}
                      playPauseStream={playPauseStream}
                      stopPlayingStream={stopPlayingStream}
                      handleTagClick={handleTagClick}
                      selectedTag={selectedTag}
                    />
                  </List.Item>
                )
              }
            />
          </div>
        </div>

        <BackTop />
      </Layout>

      {playingStream && (
        <Affix offsetBottom={0} style={{ width: '100%' }}>
          <Card className="padding-md margin-around-md">
            <Typography.Paragraph>
              <Image
                width={96}
                alt={playingStream.name}
                src={playingStream.imgUrl}
              />
              <div className="parent play-icon">
                <div className="child">
                  <div
                    className="clickable child"
                    onClick={handlePlayPauseClick}
                  >
                    {playingStream.isPlaying ? (
                      <PauseCircleFilled
                        style={{
                          fontSize: '64px',
                          color: theme.palette.secondary.main,
                        }}
                      />
                    ) : (
                      <PlayCircleFilled
                        style={{
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
              {playingStream.description}
            </Typography.Paragraph>
          </Card>
        </Affix>
      )}
    </div>
  );
};

export default IndexPage;
