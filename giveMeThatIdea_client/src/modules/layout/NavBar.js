import React from 'react';
import { browserHistory } from 'react-router';
import { Menu, Container, Icon } from 'semantic-ui-react'

const NavBar = ({ path, auth, toggleLogout }) => (
  <Menu pointing secondary>
    <Container>
      <Menu.Item onClick={() => browserHistory.push(auth ? '/ideas' : '/')}>
        <Icon name="idea" color="black" disabled size="large" />
        GetMeThatIdea
      </Menu.Item>
      {!auth ? (
        <Menu.Menu position="right">
          <Menu.Item active={path === '/signup'} onClick={() => browserHistory.push('/signup')}>
            Sign Up
          </Menu.Item>
          <Menu.Item active={path === '/login'} onClick={() => browserHistory.push('/login')}>
            Login
          </Menu.Item>
        </Menu.Menu>
      ) : (
        <Menu.Menu position="right">
          <Menu.Item onClick={() => toggleLogout()}>
            Logout
          </Menu.Item>
        </Menu.Menu>
      )}
    </Container>
  </Menu>
);

export default NavBar;


// <Menu.Item active={path === '/help'} onClick={() => browserHistory.push('/help')}>
//             How that work?
//           </Menu.Item>
