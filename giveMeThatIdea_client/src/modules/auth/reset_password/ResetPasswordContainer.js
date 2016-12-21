import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { browserHistory } from 'react-router';
import ResetPassword from './ResetPassword';
import { resetPassword } from '../actions';

class ResetPasswordContainer extends Component {
  componentWillMount () {
    axios.post(`/auth/resetPassword/${this.props.params.resetToken}`)
      .then(
        res => {
          console.log(res);
        },
        err => {
          console.log({ err });
          if (err.response.status === 422) {
            toastr.error('Not supposed to go there!');
            browserHistory.push('/login');
          }
        }
      )
  }
  render () {
    const { params, resetPassword } = this.props;
    return <ResetPassword
      resetToken={params.resetToken}
      resetPassword={resetPassword}
    />
  }
}

export default connect(
  null,
  { resetPassword }
)(ResetPasswordContainer);
