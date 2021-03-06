import React from 'react';
import {  Icon, Menu } from 'semantic-ui-react';
import { browserHistory } from 'react-router';

const SideMenu = ({ path }) => (
  <Menu vertical>
    <Menu.Item
      active={path === '/ideas'}
      onClick={() => browserHistory.push('/ideas')}
    >
      Ideas
      <Icon
        name="block layout"
        size="large"
        color={path === '/ideas' ? 'blue' : null}
      />
    </Menu.Item>
    <Menu.Item
      active={path === '/ideas/new'}
      onClick={() => browserHistory.push('/ideas/new')}
    >
      Add One
      <Icon
        name="add circle"
        size="large"
        color={path === '/ideas/new' ? 'teal' : null}
      />
    </Menu.Item>
  </Menu>
);

export default SideMenu;

// <Menu.Item
//       active={path === '/ideas/follow'}
//       onClick={() => browserHistory.push('/ideas/follow')}
//     >
//       Follow
//       <Icon
//         name="star"
//         size="large"
//         color={path === '/ideas/follow' ? 'green' : null}
//       />
//     </Menu.Item>

// <Menu.Item>
//       My ideas
//       <Icon
//         name="idea"
//         size="large"
//         color={path === '/myideas' ? 'yellow' : null}
//       />
//     </Menu.Item>
