import React from 'react';
import { Grid } from 'semantic-ui-react';
import { CreateIdeaForm } from './components';

const CreateIdea = () => (
  <Grid centered columns={2}>
    <Grid.Column>
      <h1>Create an Idea</h1>
      <CreateIdeaForm />
    </Grid.Column>
  </Grid>
);

export default CreateIdea;
