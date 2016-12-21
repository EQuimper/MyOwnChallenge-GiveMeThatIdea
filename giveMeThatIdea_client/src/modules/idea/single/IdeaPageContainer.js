import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchIdea, createComment } from './actions';
import IdeaPage from './IdeaPage';
import { LoadingScreen } from '../../../commons';

class IdeaPageContainer extends Component {
  componentWillMount() {
    this.props.fetchIdea(this.props.params.slug);
  }
  render() {
    const { data, createComment, comments } = this.props;
    if (!data.isFetched) {
      return <LoadingScreen />;
    } else if (!data.error) {
      return <IdeaPage idea={data.idea} createComment={createComment} comments={comments} />;
    }
    return <h1>Error</h1>;
  }
}

export default connect(
  state => ({
    data: state.api.idea,
    comments: state.ui.comments
  }),
  { fetchIdea, createComment }
)(IdeaPageContainer);
