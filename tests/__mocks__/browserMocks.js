// Mock Browser API's which are not supported by JSDOM, e.g. ServiceWorker, LocalStorage
const jestMock = require('jest-mock');

/**
 * An example how to mock localStorage is given below 👇
 */

/*
// Mocks localStorage
const localStorageMock = (function() {
	let store = {};

	return {
		getItem: (key) => store[key] || null,
		setItem: (key, value) => store[key] = value.toString(),
		clear: () => store = {}
	};

})();

Object.defineProperty(window, 'localStorage', {
	value: localStorageMock
}); */

Object.defineProperty(global, 'matchMedia', {
  writable: true,
  value: jestMock.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jestMock.fn(), // deprecated
    removeListener: jestMock.fn(), // deprecated
    addEventListener: jestMock.fn(),
    removeEventListener: jestMock.fn(),
    dispatchEvent: jestMock.fn(),
  })),
});
