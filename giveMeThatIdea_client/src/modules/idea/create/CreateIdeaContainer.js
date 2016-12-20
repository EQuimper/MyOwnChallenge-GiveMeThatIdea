import { connect } from 'react-redux';
import CreateIdea from './CreateIdea';
import { createIdea } from './actions';

export default connect(
  null,
  { createIdea }
)(CreateIdea);
