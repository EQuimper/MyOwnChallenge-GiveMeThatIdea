import React from 'react';
import { Dropdown, Icon, Input, Menu } from 'semantic-ui-react';
import { browserHistory, Link } from 'react-router';

const SideMenu = ({ path }) => (
  <Menu vertical>
    <Menu.Item active={path === '/ideas'} onClick={() => browserHistory.push('/ideas')}>
      Ideas
      <Icon name="block layout" size="large" />
    </Menu.Item>
    <Menu.Item>
      My ideas
      <Icon name="idea" size="large" />
    </Menu.Item>
    <Menu.Item active={path === '/ideas/new'} onClick={() => browserHistory.push('/ideas/new')}>
      Add One
      <Icon name="add circle" size="large" />
    </Menu.Item>
    <Menu.Item>
      Follow
      <Icon name="star" size="large" />
    </Menu.Item>
  </Menu>
);

export default SideMenu;
