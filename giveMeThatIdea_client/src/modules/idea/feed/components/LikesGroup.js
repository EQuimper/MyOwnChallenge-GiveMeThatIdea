import React from 'react';
import { Icon } from 'semantic-ui-react';

const styles = {
  button: {
    margin: '0 5%'
  }
}

const LikesGroup = ({ liked, disliked }) => (
  <div>
    <span style={styles.button}>
      <b>{liked}</b>
      <Icon
        name="like outline"
        color="green"
        disabled
        inverted
        size="big"
      />
    </span>
    <span style={styles.button}>
      <b>{disliked}</b>
      <Icon
        name="dislike outline"
        color="red"
        disabled
        inverted
        size="big"
      />
    </span>
  </div>
);

export default LikesGroup;
