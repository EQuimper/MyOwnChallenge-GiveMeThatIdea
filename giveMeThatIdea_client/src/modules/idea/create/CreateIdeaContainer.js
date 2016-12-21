import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Grid } from 'semantic-ui-react';
import { CreateIdeaForm } from './components';
import { createIdea } from './actions';
import { LoadingScreen } from '../../../commons';

class CreateIdeaContainer extends Component {
  state = { categories: [], isFetching: false };
  componentWillMount() {
    this.setState({ isFetching: true });
    axios.get('/categories')
      .then(
        res => {
          return this.setState({
            categories: res.data.categories,
            isFetching: false
          });
        },
        err => console.log(err)
      )
  }
  render() {
    if (this.state.isFetching) {
      return <LoadingScreen />;
    }
    return (
      <Grid centered columns={2}>
        <Grid.Column>
          <h1>Create an Idea</h1>
          <CreateIdeaForm
            categories={this.state.categories}
            createIdea={this.props.createIdea}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  null,
  { createIdea }
)(CreateIdeaContainer);
