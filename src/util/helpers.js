import { pick } from 'lodash';
import { HOME_PAGE_TITLE } from './consts';

/**
 * Looks for a text in every property of a map of objects
 * e.g. { a: {p1: "Node", p2: "JS"}, b: {p1: "Django", p2: "Python"} }
 * returns {a: {p1: "Node", p2: "JS"} } when the lookup text = "Od".
 * @param obj the object to be filtered
 * @param str the lookup text string
 * @returns Pick filtered object
 */
const filterObjectByValue = (obj, str) => {
  const words = str.split(' ');
  return pick(
    obj,
    Object.keys(obj).filter((key) =>
      Object.keys(obj[key]).some((key2) => {
        const propVal = String(obj[key][key2]).toLowerCase();
        return words.every((word) =>
          propVal.includes(String(word).toLowerCase()),
        );
      }),
    ),
  );
};

const sortByProp1ThenProp2 = (obj, prop1, prop2) =>
  Object.values(obj).sort((s1, s2) =>
    s2[prop1] === s1[prop1] ? s2[prop2] - s1[prop2] : s2[prop1] - s1[prop1],
  );

const setPageTitle = (text) => {
  let title = HOME_PAGE_TITLE;
  if (text) {
    title = `${text} Channel`;
  }

  global.document.title = `${title} Channel | ${
    global.document.title.split(' | ')[1] || 'Player'
  }`;
};

export { filterObjectByValue, setPageTitle, sortByProp1ThenProp2 };
