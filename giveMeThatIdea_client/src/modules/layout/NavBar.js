import React from 'react';
import { browserHistory } from 'react-router';
import { Menu, Container } from 'semantic-ui-react'

const NavBar = ({ path }) => (
  <Menu pointing secondary>
    <Container>
      <Menu.Item onClick={() => browserHistory.push('/')}>
        GetMeThatIdea
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item active={path === '/signup'} onClick={() => browserHistory.push('/signup')}>
          Sign Up
        </Menu.Item>
        <Menu.Item active={path === '/login'} onClick={() => browserHistory.push('/login')}>
          Login
        </Menu.Item>
      </Menu.Menu>
    </Container>
  </Menu>
);

export default NavBar;
