import React from 'react';
import { Item, Label, Divider, Grid } from 'semantic-ui-react';
import { CommentsGroup } from './components';
import { colorLabel } from '../../../helpers';

const IdeaPage = ({ idea, createComment, comments }) => (
  <Grid columns={2}>
    <Grid.Row>
      <Grid.Column width="10">
        <Item>
          <Item.Content>
            <Item.Header as="h1">{idea.title}</Item.Header>
            <Item.Meta>
              <Label color={colorLabel(idea.category.name)}>{idea.category.name}</Label>
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
        {!comments.isFetched ? <h1>Loading...</h1> : (
          <CommentsGroup createComment={createComment} comments={comments.comments} />
        )}
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default IdeaPage;
