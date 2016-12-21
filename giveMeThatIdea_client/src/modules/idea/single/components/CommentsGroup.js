import React from 'react';
import { Comment, Header, Label, Divider } from 'semantic-ui-react';
import CommentComponent from './CommentComponent';
import CreateComment from './CreateComment';

const styles = {
  commentGroup: {
    maxHeight: '45vh',
    overflowY: 'scroll'
  },
  headerEl: {
    margin: '0 2%'
  }
};

const CommentsGroup = ({ comments, createComment }) => (
  <Comment.Group>
    <Header as='h3' dividing>
      <span style={styles.headerEl}>
        Comments
      </span>
      {comments.length > 0 && (
        <span style={styles.headerEl}>
          <Label circular color="blue">{comments.length}</Label>
        </span>
      )}
      <br />
      <br />
    </Header>
    {comments.length > 0 ? (
      <div style={styles.commentGroup}>
        {comments.map((comment, i) => (
          <div>
            <CommentComponent
              key={i}
              text={comment.text}
              author="Username"
              dateCreated={comment.createdAt}
            />
            <Divider />
          </div>
        ))}
      </div>
    ) : <h5>No comments yet!</h5>}
    <CreateComment createComment={createComment} />
  </Comment.Group>
);

export default CommentsGroup;
