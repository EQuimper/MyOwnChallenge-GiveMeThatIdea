import React from 'react';
import { Dropdown, Icon, Input, Menu } from 'semantic-ui-react';
import { browserHistory } from 'react-router';

const SideMenu = () => (
  <Menu vertical>
    <Menu.Item>
      Ideas
      <Menu.Menu>
        <Menu.Item>
          My ideas
        </Menu.Item>
        <Menu.Item onClick={() => browserHistory.push('/ideas/new')}>
          Add One
        </Menu.Item>
        <Menu.Item>
          Follow
        </Menu.Item>
      </Menu.Menu>
    </Menu.Item>
  </Menu>
);

export default SideMenu;
