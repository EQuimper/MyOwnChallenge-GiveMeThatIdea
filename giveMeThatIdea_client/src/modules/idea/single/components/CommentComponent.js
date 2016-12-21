import React from 'react';
import { Comment } from 'semantic-ui-react';
import moment from 'moment';

// http://semantic-ui.com/images/avatar/small/elliot.jpg
// http://semantic-ui.com/images/avatar/small/jenny.jpg
// http://semantic-ui.com/images/avatar/small/joe.jpg

const CommentComponent = ({ text, author, dateCreated }) => (
  <Comment>
    <Comment.Avatar src='http://semantic-ui.com/images/avatar/small/matt.jpg' />
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
