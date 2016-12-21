import React from 'react';
import { Icon } from 'semantic-ui-react';

const styles = {
  button: {
    margin: '0 5%'
  }
}

const FollowCommentsMeta = ({ followers, comments }) => (
  <div>
    <span style={styles.button}>
      <b>{followers}</b>
      <Icon
        name="star"
        color="yellow"
        disabled
        size="large"
      />
    </span>
    <span style={styles.button}>
      <b>{comments}</b>
      <Icon
        name="comments"
        disabled
        size="large"
      />
    </span>
  </div>
);

export default FollowCommentsMeta;
