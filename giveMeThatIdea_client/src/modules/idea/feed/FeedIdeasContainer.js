import React, { Component } from 'react';
import { connect } from 'react-redux';
import FeedIdeas from './FeedIdeas';
import { fetchAllIdeas } from './actions';

class FeedIdeasContainer extends Component {
  componentWillMount () {
    this.props.fetchAllIdeas();
  }

  render() {
    const { data } = this.props;
    if (!data.isFetched) {
      return <h1>Loading...</h1>;
    } else if (!data.error) {
      return <FeedIdeas ideas={data.ideas} />;
    }
    return <h1>Error</h1>;
  }
}

export default connect(
  state => ({
    data: state.api.ideas
  }),
  { fetchAllIdeas }
)(FeedIdeasContainer);
