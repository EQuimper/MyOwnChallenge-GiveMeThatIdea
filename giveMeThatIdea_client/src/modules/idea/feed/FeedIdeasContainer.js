import React, { Component } from 'react';
import { connect } from 'react-redux';
import FeedIdeas from './FeedIdeas';
import { fetchAllIdeas, followIdea } from './actions';

class FeedIdeasContainer extends Component {
  componentWillMount () {
    this.props.fetchAllIdeas();
  }

  render() {
    const { data, ideasFollow, followIdea } = this.props;
    if (!data.isFetched) {
      return <h1>Loading...</h1>;
    } else if (!data.error) {
      return <FeedIdeas followIdea={followIdea} ideas={data.ideas} ideasFollow={ideasFollow} />;
    }
    return <h1>Error</h1>;
  }
}

export default connect(
  state => ({
    data: state.api.ideas,
    ideasFollow: state.ui.ideasFollow
  }),
  { fetchAllIdeas, followIdea }
)(FeedIdeasContainer);
