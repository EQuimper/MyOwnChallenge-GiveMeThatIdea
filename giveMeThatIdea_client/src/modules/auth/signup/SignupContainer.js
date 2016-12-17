import { connect } from 'react-redux';
import Signup from './Signup';
import { signupUser } from '../actions';

export default connect(
  null,
  { signupUser }
)(Signup);
