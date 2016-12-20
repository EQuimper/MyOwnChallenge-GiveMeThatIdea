import React from 'react';
import { Grid, Card, Container, Button, Icon, Segment, Label } from 'semantic-ui-react';
import { browserHistory } from 'react-router';
import { truncateString } from '../../../helpers/truncateString';

const FeedIdeas = ({ ideas }) => (
  <Grid centered columns={1}>
    <Grid.Column>
      <Card.Group>
        {ideas.map((idea, i) => (
          <Card key={i}>
            <Label attached="top">{idea.category.name}</Label>
            <Card.Content label={{ as: 'a', corner: 'left', icon: 'heart' }}>
              <Card.Header>
                {truncateString(idea.title, 25)}
              </Card.Header>
              <Card.Meta>
                10 followers | 10 comments
              </Card.Meta>
              <Card.Description>
                {truncateString(idea.description, 150)}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className='ui two buttons'>
                <Button basic color="green">10 Liked</Button>
                <Button basic color="red">2 Disliked</Button>
              </div>
            </Card.Content>
            <Card.Content extra>
              <div className='ui two buttons'>
                <Button basic color="blue">Follow</Button>
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
