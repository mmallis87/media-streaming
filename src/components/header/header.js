import React from 'react';
import Link from 'gatsby-link';
import { connect } from 'react-redux';

import MenuIcon from './menu-icon';
import Navbar from './navbar';
import Top from './top';
import HeaderTitle from './header-title';
import HamburgerMenu from '../hamburger/hamburger-menu';
import { toggleDrawer as toggleDrawerAction } from '../../state/app';

const Header = ({ isDrawerOpen, toggleDrawer, siteTitle }) => (
  <>
    <Top>
      <MenuIcon
        isDrawerOpen={isDrawerOpen}
        onClick={() => toggleDrawer(!isDrawerOpen)}
      >
        <HamburgerMenu />
      </MenuIcon>
    </Top>
    <Navbar isDrawerOpen={isDrawerOpen}>
      <Link to="/" css={{ textDecoration: 'none' }}>
        <HeaderTitle>{siteTitle}</HeaderTitle>
      </Link>
    </Navbar>
  </>
);

export default connect(
  (state) => ({ isDrawerOpen: state.app.isDrawerOpen }),
  (dispatch) => ({
    toggleDrawer: (open) => dispatch(toggleDrawerAction(open)),
  }),
)(Header);
