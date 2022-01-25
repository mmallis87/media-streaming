import React, { useEffect, useState, useCallback } from 'react';
import { BackTop, Pagination } from 'antd';
import { pick } from 'lodash';

import { getStreams } from '../services/tunein-json-api';
import getTvStreams from '../services/iptv-org-json-api';
import {
  filterObjectByValue,
  setPageTitle,
  sortByProp1ThenProp2,
} from '../util/helpers';
import Layout from '../components/layout/layout';
import SEO from '../components/seo/seo';
import Search from '../components/search/search';
import MessageCenter from '../components/message-center/message-center';
import { CANNOT_LOAD_STATIONS_LIST, HOME_PAGE_TITLE } from '../util/consts';
import ChannelList from '../components/channel/channel-list';
import MediaPlayer from '../components/media-player/media-player';
import SpinContainer from '../components/spinner/spin-container';

const IndexPage = () => {
  const [fetchingData, setFetchingData] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [query, setQuery] = useState('');
  const [streams, setStreams] = useState({});
  const [filteredStreams, setFilteredStreams] = useState({});
  const [streamIdsByTag, setStreamIdsByTag] = useState({});
  const [selectedTag, setSelectedTag] = useState('');
  const [playingStream, setPlayingStream] = useState(null);

  const isFilterAdult = global.location?.search !== '?adult';
  const [filterAdult] = useState(isFilterAdult);

  const DEFAULT_PER_PAGE = 100;
  const HOME_PAGE_KEYWORDS = [`gatsby`, `application`, `react`];
  const ADULT_CATEGORY = 'XXX';

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

  const [allStreams, setAllStreams] = useState([]);

  const [streamsByPage, setStreamsByPage] = useState([]);

  const fetchData = async () => {
    setErrorMessage('');
    const newStreams = streamsByPage[page - 1] || {};
    setStreams(newStreams);
    setFilteredStreams(newStreams);
  };

  useEffect(() => {
    setFetchingData(true);

    const newStreamIdsByTag = {};
    const isVideo = global.location?.search !== '?radio';
    try {
      (isVideo ? getTvStreams() : getStreams()).then((data) => {
        const newStreams = data.reduce((obj, stream) => {
          const id = stream.id || stream.name;
          if (!filterAdult || stream.category !== ADULT_CATEGORY) {
            obj[id] = {
              ...stream,
              id,
              isVideo,
              category: stream.category || 'Other',
              streamUrl: (stream.streamUrl || stream.url || '').replace(
                'http://',
                'https://',
              ),
              imgUrl: (
                stream.imgUrl ||
                stream.logo ||
                `https://via.placeholder.com/145.png&text=${encodeURIComponent(
                  id,
                )}`
              ).replace('http://', 'https://'),
              tags: stream.tags
                ? stream.tags.forEach((tag) => {
                    if (!newStreamIdsByTag[tag]) {
                      newStreamIdsByTag[tag] = [];
                    }
                    newStreamIdsByTag[tag].push(id);
                  })
                : [stream.category],
            };
          }

          return obj;
        }, {});
        setAllStreams(newStreams);
        setStreamIdsByTag(newStreamIdsByTag);
        setPerPage(DEFAULT_PER_PAGE);
        setFetchingData(false);
      });
    } catch (error) {
      setStreams([]);
      setErrorMessage(error.message);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [page, streamsByPage]);

  useEffect(() => {
    if (!query) {
      setFilteredStreams(streams);
      return;
    }

    let newFilteredStreams = filterObjectByValue(allStreams, query);

    if (selectedTag) {
      const taggedStreamIds = streamIdsByTag[selectedTag];
      newFilteredStreams = pick(newFilteredStreams, taggedStreamIds);
    }

    if (playingStream) {
      newFilteredStreams[playingStream.id] = playingStream;
    }

    setFilteredStreams(newFilteredStreams);
  }, [query, streams, selectedTag, playingStream]);

  useEffect(() => {
    const newStreams = Object.values(allStreams);
    let newStreamsByPage = [];

    for (let i = 0; i < newStreams.length; i += perPage)
      newStreamsByPage.push(newStreams.slice(i, i + perPage));

    newStreamsByPage = newStreamsByPage.map((a) =>
      a.reduce((obj, c) => {
        if (c) obj[c.id] = c;
        return obj;
      }, {}),
    );
    setStreamsByPage(newStreamsByPage);
  }, [perPage, allStreams]);

  const handlePaginationChange = useCallback(
    (newPage, newPerPage) => {
      setPage(newPage);
      setPerPage(newPerPage);
    },
    [setPage, setPerPage],
  );

  return (
    <>
      <Layout>
        <SEO title={HOME_PAGE_TITLE} keywords={HOME_PAGE_KEYWORDS} />

        <SpinContainer fetchingData={fetchingData}>
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
              dataSource={sortByProp1ThenProp2(
                filteredStreams,
                'popularity',
                'reliability',
              ).slice(0, perPage)}
              items={streams}
              filteredItems={filteredStreams}
              handleCardClick={handleCardClick}
              stopPlayingStream={stopPlayingStream}
              handleTagClick={handleTagClick}
              selectedTag={selectedTag}
            />

            {/* Pagination section: previous, next, jump to and page size */}
            <div className="box">
              <Pagination
                pageSize={DEFAULT_PER_PAGE}
                total={Object.keys(allStreams).length}
                showSizeChanger
                showQuickJumper
                current={page}
                showTotal={(total) => `Total ${total} channels`}
                onChange={handlePaginationChange}
              />
            </div>
          </div>
        </SpinContainer>

        {/* Scroll to top button */}
        <BackTop />
      </Layout>

      {/* Sticky media player */}
      {playingStream && (
        <MediaPlayer
          id={playingStream.id}
          isPlaying={playingStream.isPlaying}
          isVideo={playingStream.isVideo}
          description={playingStream.description}
          handlePlayPauseClick={handlePlayPauseClick}
          imgAlt={playingStream.name}
          imgUrl={playingStream.imgUrl}
          streamUrl={playingStream.streamUrl}
        />
      )}
    </>
  );
};

export default IndexPage;
