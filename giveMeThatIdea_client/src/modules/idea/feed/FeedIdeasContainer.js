import React, { Component } from 'react';
import { connect } from 'react-redux';
import FeedIdeas from './FeedIdeas';
import { fetchAllIdeas, followIdea, unfollowIdea } from './actions';
import { LoadingScreen } from '../../../commons';

class FeedIdeasContainer extends Component {
  componentWillMount() {
    this.props.fetchAllIdeas();
  }

  render() {
    const { data, ideasFollow, followIdea, unfollowIdea } = this.props;
    if (!data.isFetched) {
      return <LoadingScreen />;
    } else if (!data.error) {
      return <FeedIdeas
        followIdea={followIdea}
        ideas={data.ideas}
        ideasFollow={ideasFollow}
        unfollowIdea={unfollowIdea}
      />;
    }
    return <h1>Error</h1>;
  }
}

export default connect(
  state => ({
    data: state.api.ideas,
    ideasFollow: state.ui.ideasFollow
  }),
  { fetchAllIdeas, followIdea, unfollowIdea }
)(FeedIdeasContainer);
