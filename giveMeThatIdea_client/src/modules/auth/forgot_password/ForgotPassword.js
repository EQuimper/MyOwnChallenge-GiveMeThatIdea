import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Form, Grid } from 'semantic-ui-react';
import { InputField } from '../../../commons';
import { forgotPasswordValidation, forgotPasswordAsyncValidate } from './validation';

const ForgotPassword = ({ handleSubmit, valid, forgotPassword }) => (
  <Grid columns={2} centered style={{ marginTop: '5%' }}>
    <Grid.Row>
      <Grid.Column>
        <h2>Forgot My Password</h2>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column>
        <Form onSubmit={handleSubmit(forgotPassword)}>
          <Form.Field>
            <label>My Email</label>
            <Field
              icon="mail"
              component={InputField}
              placeholder="yourEmail@example.com"
              name="email"
              type="email"
            />
          </Form.Field>
          <Button disabled={!valid} primary type="submit">Send me a new password</Button>
        </Form>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default reduxForm({
  form: 'forgotPassword',
  validate: forgotPasswordValidation,
  asyncValidate: forgotPasswordAsyncValidate,
  asyncBlurFields: ['email']
})(ForgotPassword);
