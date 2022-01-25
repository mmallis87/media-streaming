import { IPTV_ORG_STATIONS_URL } from '../util/consts';
import http from './http';

const getStreams = () => {
  return http
    .get(IPTV_ORG_STATIONS_URL)
    .then(({ data }) =>
      data
        .sort(() => 0.5 - Math.random())
        .sort((c1) =>
          c1.countries[0] && c1.countries[0].code.toUpperCase() === 'US'
            ? -1
            : 1,
        ),
    );
};

export default getStreams;
