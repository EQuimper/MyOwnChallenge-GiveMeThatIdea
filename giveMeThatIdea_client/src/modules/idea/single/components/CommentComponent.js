import React from 'react';
import { Comment } from 'semantic-ui-react';
import moment from 'moment';



const avatar = [
  'http://semantic-ui.com/images/avatar/small/matt.jpg',
  'http://semantic-ui.com/images/avatar/small/elliot.jpg',
  'http://semantic-ui.com/images/avatar/small/jenny.jpg',
  'http://semantic-ui.com/images/avatar/small/joe.jpg'
];

const getRandomImage = index => avatar[index];

const CommentComponent = ({ text, author, dateCreated, index }) => (
  <Comment>
    <Comment.Avatar src={getRandomImage(index)} />
    <Comment.Content>
      <Comment.Author as="h5">{author}</Comment.Author>
      <Comment.Metadata>
        <div>{moment(dateCreated).calendar()}</div>
      </Comment.Metadata>
      <Comment.Text>{text}</Comment.Text>
    </Comment.Content>
  </Comment>
);

export default CommentComponent;


      // <Comment.Actions>
      //   <Comment.Action>Reply</Comment.Action>
      // </Comment.Actions>
