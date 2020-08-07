import React from 'react';
import { connect } from 'react-redux';

import Paper from './paper';
import DrawerHeader from './drawer-header';
import DrawerItem from './drawer-item';
import { toggleDrawer as toggleDrawerAction } from '../../state/app';
import { HOME_PAGE_TITLE } from '../../util/consts';

const items = [{ url: '/', name: HOME_PAGE_TITLE }];

const Drawer = ({ isDrawerOpen, toggleDrawer }) => (
  <Paper isDrawerOpen={isDrawerOpen}>
    <DrawerHeader />
    {items.map((item) => (
      <DrawerItem
        key={item.url}
        to={item.url}
        onClick={() => toggleDrawer(false)}
      >
        {item.name}
      </DrawerItem>
    ))}
  </Paper>
);

export default connect(
  (state) => ({ isDrawerOpen: state.app.isDrawerOpen }),
  (dispatch) => ({
    toggleDrawer: (open) => dispatch(toggleDrawerAction(open)),
  }),
)(Drawer);
