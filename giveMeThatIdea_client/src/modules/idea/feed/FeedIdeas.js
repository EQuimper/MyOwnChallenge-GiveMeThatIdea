import React from 'react';
import { Grid, Card, Button, Icon, Label } from 'semantic-ui-react';
import { browserHistory } from 'react-router';
import { truncateString } from '../../../helpers/truncateString';
import { LikesGroup, FollowCommentsMeta } from './components';

const checkIfFollow = (arr, id) => arr.includes(id);

const changeColor = name => {
  switch (name) {
    case 'Idea for web developer':
      return 'teal';
    case 'Idea for web developer portfolio':
      return 'red';
    default:
      return null;
  }
};

const FeedIdeas = ({ ideas, ideasFollow, followIdea }) => (
  <Grid centered columns={1}>
    <Grid.Column>
      <Card.Group>
        {ideas.map((idea, i) => (
          <Card key={i}>
            <Label attached="top" color={changeColor(idea.category.name)}>
              <Icon name="idea" color="black" disabled size="large" />
              {idea.category.name}
            </Label>
            <Card.Content>
              <br />
              <Card.Header>
                {truncateString(idea.title, 25)}
              </Card.Header>
              <br />
              <Card.Meta>
                <FollowCommentsMeta
                  followers={idea.usersFollow.length}
                  comments={idea.comments.length}
                />
              </Card.Meta>
              <br />
              <Card.Description>
                {truncateString(idea.description, 150)}
              </Card.Description>
              <br />
            </Card.Content>
            <Card.Content extra>
              <LikesGroup liked={10} disliked={5} />
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button
                  basic={!checkIfFollow(ideasFollow, idea._id)}
                  color="blue"
                  onClick={() => followIdea(idea._id)}
                >
                  Follow
                </Button>
                <Button
                  basic
                  color="black"
                  onClick={() => browserHistory.push(`/ideas/${idea.slug}`)}
                >
                  See More
                </Button>
              </div>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Grid.Column>
  </Grid>
);

export default FeedIdeas;
