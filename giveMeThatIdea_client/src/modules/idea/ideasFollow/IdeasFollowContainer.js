import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllIdeasFollow } from './actions';
import { followIdea, unfollowIdea } from '../feed';
import { LoadingScreen } from '../../../commons';
import IdeasFollow from './IdeasFollow';

class IdeasFollowContainer extends Component {
  componentWillMount() {
    this.props.fetchAllIdeasFollow();
  }
  render() {
    const { data, ideasFollow, followIdea, unfollowIdea } = this.props;
    if (!data.isFetched) {
      return <LoadingScreen />;
    } else if (!data.error) {
      return <IdeasFollow
        ideas={data.ideasFollow}
        ideasFollow={ideasFollow}
        followIdea={followIdea}
        unfollowIdea={unfollowIdea}
      />;
    }
    return <h1>Error...</h1>;
  }
}

export default connect(
  state => ({
    data: state.api.ideasFollow,
    ideasFollow: state.ui.ideasFollow
  }),
  { fetchAllIdeasFollow, followIdea, unfollowIdea }
)(IdeasFollowContainer);
