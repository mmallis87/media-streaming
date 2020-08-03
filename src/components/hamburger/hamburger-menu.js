import React from 'react';
import { connect } from 'react-redux';

import { toggleDrawer as toggleDrawerAction } from '../../state/app';
import Hamburger from './hamburger';
import HamburgerLine from './hamburger-line';

const HamburgerMenu = ({ isDrawerOpen }) => (
  <Hamburger isDrawerOpen={isDrawerOpen}>
    <HamburgerLine
      css={{
        transform: isDrawerOpen ? 'translateX(-10px) rotate(-45deg)' : 'none',
      }}
    />
    <HamburgerLine />
    <HamburgerLine
      css={{
        transform: isDrawerOpen ? 'translateX(-10px) rotate(45deg)' : 'none',
      }}
    />
  </Hamburger>
);

export default connect(
  (state) => ({ isDrawerOpen: state.app.isDrawerOpen }),
  (dispatch) => ({
    toggleDrawer: (open) => dispatch(toggleDrawerAction(open)),
  }),
)(HamburgerMenu);
