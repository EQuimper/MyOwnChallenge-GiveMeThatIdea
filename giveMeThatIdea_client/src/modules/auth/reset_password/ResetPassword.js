import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Grid, Form, Button } from 'semantic-ui-react';
import { InputField } from '../../../commons';
import { resetPasswordValidation } from './vadidation';

const ResetPassword = ({ resetToken, handleSubmit, valid, resetPassword }) => (
  <Grid columns={2} centered style={{ marginTop: '5%' }}>
    <Grid.Row>
      <Grid.Column>
        <h2>Reset My Password</h2>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column>
        <Form onSubmit={handleSubmit(() => resetPassword(resetToken))}>
          <Form.Field>
            <label>New Password</label>
            <Field
              icon="lock"
              component={InputField}
              placeholder="yourAwesomeNewPassword"
              name="password"
              type="password"
            />
          </Form.Field>
          <Form.Field>
            <label>Confirm New Password</label>
            <Field
              icon="lock"
              component={InputField}
              placeholder="yourAwesomeNewPassword"
              name="confirmPassword"
              type="password"
            />
          </Form.Field>
          <Button disabled={!valid} primary type="submit">Set new password</Button>
        </Form>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default reduxForm({
  form: 'resetPassword',
  validate: resetPasswordValidation
})(ResetPassword);
