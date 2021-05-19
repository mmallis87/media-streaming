import { TUNEIN_STATIONS_URL } from '../util/consts';
import http from './http';

const getStreams = () => {
  return http.get(TUNEIN_STATIONS_URL).then(({ data }) => data.data);
};

const getStreamInfo = (streamUrl, t) => {
  let timeout = t;
  if (!timeout) {
    timeout = 1000;
    if (
      'connection' in global.navigator &&
      'effectiveType' in global.navigator.connection
    ) {
      if (global.navigator.connection.effectiveType === '3g') {
        timeout = 700;
      } else if (global.navigator.connection.effectiveType === '4g') {
        timeout = 300;
      }
    }
  }
  return http.get(streamUrl, timeout).then(({ data }) => data);
};

export { getStreams, getStreamInfo };
