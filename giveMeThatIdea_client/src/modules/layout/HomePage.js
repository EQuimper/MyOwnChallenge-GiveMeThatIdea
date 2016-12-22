import React from 'react';
import { Grid, Icon, Step, Divider } from 'semantic-ui-react';

const steps = [
  {
    completed: true,
    icon: 'truck',
    title: 'Authentication',
    description: 'System on top of',
    library: 'Passport.JS',
    link: 'http://passportjs.org/'
  },
  {
    completed: true,
    icon: 'truck',
    title: 'Forgot Password',
    description: 'Send email for user reset password with token generate by Crypto',
    library: 'See code on github',
    link: 'https://github.com/EQuimper/MyOwnChallenge-GiveMeThatIdea/blob/master/giveMeThatIdea_server/server/modules/user/controller.js'
  },
  {
    completed: true,
    icon: 'truck',
    title: 'Following system',
    description: 'User can follow an idea and unfollow.',
    library: 'See code on github',
    link: 'https://github.com/EQuimper/MyOwnChallenge-GiveMeThatIdea/blob/master/giveMeThatIdea_server/server/modules/idea/controller.js'
  },
  {
    completed: true,
    icon: 'truck',
    title: 'Idea creation',
    description: 'User can create idea.',
    library: 'See code on github',
    link: 'https://github.com/EQuimper/MyOwnChallenge-GiveMeThatIdea/blob/master/giveMeThatIdea_server/server/modules/idea/controller.js'
  },
  {
    completed: true,
    icon: 'truck',
    title: 'Email Helpers',
    description: 'Sent email on welcome, reset password, forgot password',
    library: 'See code on github',
    link: 'https://github.com/EQuimper/MyOwnChallenge-GiveMeThatIdea/blob/master/giveMeThatIdea_server/server/helpers/emailHelpers.js'
  },
]

const HomePage = () => (
  <Grid columns={2} centered>
    <Grid.Row>
      <Grid.Column width={4}>
        <h1>GiveMeThatIdea</h1>
        <br />
        <Divider />
        <br />
        <Step.Group vertical>
          {steps.map((step, i) => (
            <Step completed={step.completed}>
              <Icon name={step.icon} />
              <Step.Content>
                <Step.Title>{step.title}</Step.Title>
                <Step.Description>
                  {step.description} <a href={step.link} target="_blank">{step.library}</a>
                </Step.Description>
              </Step.Content>
            </Step>
          ))}
        </Step.Group>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default HomePage;
