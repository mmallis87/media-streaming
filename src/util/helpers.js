import { pick } from 'lodash';

const filterObjectByValue = (obj, string) =>
  pick(
    obj,
    Object.keys(obj).filter((key) =>
      Object.keys(obj[key]).some((key2) =>
        String(obj[key][key2]).toLowerCase().includes(string.toLowerCase()),
      ),
    ),
  );

export { filterObjectByValue as default };
