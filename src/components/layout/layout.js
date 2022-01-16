import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
import { connect } from 'react-redux';
import { ThemeProvider } from 'emotion-theming';

import Content from './content';
import Overlay from './overlay';
import Header from '../header/header';
import Drawer from '../drawer/drawer';
import './layout.css';
import theme from '../../style/theme';
import { toggleDrawer as toggleDrawerAction } from '../../state/app';

const Layout = ({ children, isDrawerOpen, toggleDrawer }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          author
          title
        }
      }
    }
  `);

  return (
    <ThemeProvider theme={theme}>
      <Content isDrawerOpen={isDrawerOpen}>
        {children}
        <footer />
      </Content>
      <Overlay
        isDrawerOpen={isDrawerOpen}
        onClick={() => toggleDrawer(false)}
      />
      <Drawer />
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default connect(
  (state) => ({ isDrawerOpen: state.app.isDrawerOpen }),
  (dispatch) => ({
    toggleDrawer: (open) => dispatch(toggleDrawerAction(open)),
  }),
)(Layout);
