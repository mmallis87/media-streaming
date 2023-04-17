import { IPTV_ORG_STATIONS_URL, IPTV_ORG_STREAMS_URL } from '../util/consts';
import http from './http';

const getStreams = async () => {
  const [stations, streams] = await Promise.all([
    http.get(IPTV_ORG_STATIONS_URL),
    http.get(IPTV_ORG_STREAMS_URL),
  ]);

  const streamsMap = new Map();
  streams.data
    .flat()
    .filter((stream) => stream.channel && stream.status !== 'error')
    .forEach((stream) => {
      streamsMap.set(stream.channel, stream);
    });

  return stations.data
    .flat()
    .filter((station) => streamsMap.has(station.id))
    .sort(() => 0.5 - Math.random())
    .sort((station) => (station.country.toUpperCase() === 'US' ? -1 : 1))
    .map((station) => ({ ...station,
      streamUrl: streamsMap.get(station.id).url,
      width: streamsMap.get(station.id).width,
      height: streamsMap.get(station.id).height,
    }));
};

export default getStreams;
