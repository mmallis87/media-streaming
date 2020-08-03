import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
import { connect } from 'react-redux';
import { ThemeProvider } from 'emotion-theming';

import Container from './container';
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
      <Container>
        <Content isDrawerOpen={isDrawerOpen}>
          {children}
          <footer>
            {`Copyright © ${new Date().getFullYear()} ${
              data.site.siteMetadata.author
            }`}
          </footer>
        </Content>
      </Container>
      <Overlay
        isDrawerOpen={isDrawerOpen}
        onClick={() => toggleDrawer(false)}
      />
      <Drawer />
      <Header siteTitle={data.site.siteMetadata.title} />
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
