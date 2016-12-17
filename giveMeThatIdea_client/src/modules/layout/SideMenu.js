import React from 'react';
import { Dropdown, Icon, Input, Menu } from 'semantic-ui-react'

const SideMenu = () => (
  <Menu vertical>
    <Menu.Item>
      <Input placeholder="Search..." />
    </Menu.Item>

    <Menu.Item>
      Ideas
      <Menu.Menu>
        <Menu.Item>
          My ideas
        </Menu.Item>
        <Menu.Item>
          Add One
        </Menu.Item>
        <Menu.Item>
          Follow
        </Menu.Item>
      </Menu.Menu>
    </Menu.Item>

        <Menu.Item>
          <Icon name='grid layout' />
          Browse
        </Menu.Item>
        <Menu.Item>
          Messages
        </Menu.Item>

        <Dropdown as={Menu.Item} text='More'>
          <Dropdown.Menu>
            <Dropdown.Item icon='edit' text='Edit Profile' />
            <Dropdown.Item icon='globe' text='Choose Language' />
            <Dropdown.Item icon='settings' text='Account Settings' />
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
);

export default SideMenu;
