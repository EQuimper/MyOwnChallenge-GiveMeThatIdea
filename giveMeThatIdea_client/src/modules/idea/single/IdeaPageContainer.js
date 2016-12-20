import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchIdea } from './actions';
import IdeaPage from './IdeaPage';

class IdeaPageContainer extends Component {
  componentWillMount() {
    this.props.fetchIdea(this.props.params.slug);
  }
  render() {
    const { data } = this.props;
    if (!data.isFetched) {
      return <h1>Loading...</h1>;
    } else if (!data.error) {
      return <IdeaPage idea={data.idea} />;
    }
    return <h1>Error</h1>;
  }
}

export default connect(
  state => ({
    data: state.api.idea
  }),
  { fetchIdea }
)(IdeaPageContainer);
