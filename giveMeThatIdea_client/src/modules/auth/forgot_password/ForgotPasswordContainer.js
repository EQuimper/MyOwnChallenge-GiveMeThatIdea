import { connect } from 'react-redux';
import ForgotPassword from './ForgotPassword';
import { forgotPassword } from '../actions';

export default connect(
  null,
  { forgotPassword }
)(ForgotPassword);
