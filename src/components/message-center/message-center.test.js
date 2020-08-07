import MessageCenter from './message-center';

const React = require('react');
const { mount } = require('enzyme');

describe('<MessageCenter />', () => {
  it('should reflect MessageCenter initial state', () => {
    const wrapper = mount(<MessageCenter />);

    expect(wrapper.text()).toBe('');
  });
});
