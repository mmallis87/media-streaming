import React, { useEffect, useState } from 'react';
import { BackTop } from 'antd';
import { pick } from 'lodash';

import { getStreams } from '../services/tunein-json-api';
import {
  filterObjectByValue,
  setPageTitle,
  sortByProp1ThenProp2,
} from '../util/helpers';
import Layout from '../components/layout/layout';
import SEO from '../components/seo/seo';
import Search from '../components/search/search';
import MessageCenter from '../components/message-center/message-center';
import {
  showLoadingToast,
  showUnavailableErrorToast,
} from '../components/message-center/toasts';
import {
  BUFFERING,
  CANNOT_LOAD_STATIONS_LIST,
  HOME_PAGE_TITLE,
} from '../util/consts';
import ChannelList from '../components/channel/channel-list';
import MediaPlayer from '../components/media-player/media-player';

const IndexPage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [query, setQuery] = useState('');
  const [streams, setStreams] = useState({});
  const [filteredStreams, setFilteredStreams] = useState({});
  const [streamIdsByTag, setStreamIdsByTag] = useState({});
  const [selectedTag, setSelectedTag] = useState('');
  const [playingStream, setPlayingStream] = useState(null);

  const HOME_PAGE_KEYWORDS = [`gatsby`, `application`, `react`];

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

  const handlePlayPauseClick = (id) => {
    setPlayingStream({ ...playingStream, isPlaying: !playingStream.isPlaying });
    setFilteredStreams({
      ...filteredStreams,
      [id]: {
        ...filteredStreams[id],
        isPlaying: !filteredStreams[id].isPlaying,
      },
    });
  };

  const stopPlayingStream = (id) => {
    if (playingStream && id === playingStream.id) {
      setPlayingStream(null);
    }
  };

  const handleCardClick = async (stream) => {
    const { name } = stream;
    setPlayingStream({ ...stream, isPlaying: !stream.isPlaying });
    setPageTitle(name);

    setFilteredStreams({
      ...filteredStreams,
      [stream.id]: {
        ...filteredStreams[stream.id],
        isPlaying: !filteredStreams[stream.id].isPlaying,
      },
    });
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

  const dataSource = sortByProp1ThenProp2(
    filteredStreams,
    'popularity',
    'reliability',
  );

  return (
    <>
      <Layout>
        <SEO title={HOME_PAGE_TITLE} keywords={HOME_PAGE_KEYWORDS} />

        <div className="container">
          {/* Sticky error messages center in the top of the page */}
          <MessageCenter
            className={errorMessage ? 'box' : ''}
            message={CANNOT_LOAD_STATIONS_LIST}
            errorMessage={errorMessage}
          />

          {/* Search box in the top of the page body */}
          <Search query={query} onChange={handleQueryChange} />

          {/* Streams cards list */}
          <ChannelList
            dataSource={dataSource}
            items={streams}
            filteredItems={filteredStreams}
            handleCardClick={handleCardClick}
            stopPlayingStream={stopPlayingStream}
            handleTagClick={handleTagClick}
            selectedTag={selectedTag}
          />
        </div>

        {/* Scroll to top button */}
        <BackTop />
      </Layout>

      {/* Sticky media player */}
      {playingStream && (
        <MediaPlayer
          id={playingStream.id}
          isPlaying={playingStream.isPlaying}
          description={playingStream.description}
          handlePlayPauseClick={handlePlayPauseClick}
          imgAlt={playingStream.name}
          imgUrl={playingStream.imgUrl}
        />
      )}
    </>
  );
};

export default IndexPage;
