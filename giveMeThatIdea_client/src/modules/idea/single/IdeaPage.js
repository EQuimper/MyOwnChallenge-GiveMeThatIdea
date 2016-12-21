import React from 'react';
import { Button, Icon, Image, Item, Label, Divider, Grid, Comment, Form, Header } from 'semantic-ui-react';
import { CommentsGroup } from './components';

const IdeaPage = ({ idea }) => (
  <Grid columns={2}>
    <Grid.Row>
      <Grid.Column width="10">
        <Item>
          <Item.Content>
            <Item.Header as="h1">{idea.title}</Item.Header>
            <Item.Meta>
              <Label color="blue">{idea.category.name}</Label>
            </Item.Meta>
            <Divider />
            <Item.Description>{idea.description}</Item.Description>
            <Divider />
            <Item.Extra>
              <Label>GONNA HAVE KEYWORD LATER</Label>
            </Item.Extra>
          </Item.Content>
        </Item>
      </Grid.Column>
      <Grid.Column width="6">
        <CommentsGroup comments={idea.comments} />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default IdeaPage;
