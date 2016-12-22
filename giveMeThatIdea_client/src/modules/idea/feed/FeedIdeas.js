import React from 'react';
import { Grid, Card, Button, Icon, Label } from 'semantic-ui-react';
import { browserHistory } from 'react-router';
import { truncateString, colorLabel } from '../../../helpers';
import { LikesGroup, FollowCommentsMeta } from './components';

const checkIfFollow = (arr, id) => arr.includes(id);

const getLength = (arr, id) => {
  const idea = arr.reduce((acc, o) => {
    if (o.id === id) {
      acc = o
    }
    return acc;
  }, {});
  return idea.followers;
};

const FeedIdeas = ({ ideas, ideasFollow, followIdea, unfollowIdea }) => (
  <Grid centered columns={1}>
    <Grid.Column>
      <Card.Group>
        {ideas.map((idea, i) => (
          <Card key={i}>
            <Label attached="top" color={colorLabel(idea.category.name)}>
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
                  followers={getLength(ideasFollow.lengthFollow, idea._id)}
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
              <div className="ui two buttons">
                {checkIfFollow(ideasFollow.ideas, idea._id) ? (
                  <Button
                    color="blue"
                    onClick={() => unfollowIdea(idea._id)}
                  >
                    Unfollow
                  </Button>
                ) : (
                  <Button
                    basic
                    color="blue"
                    onClick={() => followIdea(idea._id)}
                  >
                    Follow
                  </Button>
                )}
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

// <Card.Content extra>
//               <LikesGroup liked={10} disliked={5} />
//             </Card.Content>
