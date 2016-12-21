import React from 'react';
import { Link, browserHistory } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { Button, Checkbox, Form, Grid, Message, Icon } from 'semantic-ui-react';
import { InputField } from '../../../commons';
import { signupValidation, signupAsyncValidate } from './validation';

const styles = {
  root: {
    position: 'relative'
  }
}

const Signup = ({ handleSubmit, signupUser, valid }) => (
  <div style={styles.root}>
    <Grid centered columns={3} style={{ height: '90vh' }} verticalAlign="middle">
      <Grid.Row>
        <Grid.Column>
          <Message
            attached
            header="Welcome to our site!"
            content="Fill out the form below for register!"
          />
          <Form className="attached fluid segment" onSubmit={handleSubmit(signupUser)}>
            <Form.Field>
              <label>Username</label>
              <Field
                icon="user"
                component={InputField}
                placeholder="yourAwesomeUsername"
                name="username"
                type="text"
              />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <Field
                icon="mail"
                component={InputField}
                placeholder="yourAwesomeEmail@email.com"
                name="email"
                type="email"
              />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <Field
                icon="lock"
                component={InputField}
                placeholder="yourAwesomePassword"
                name="password"
                type="password"
              />
            </Form.Field>
            <Form.Field>
              <label>Confirm Password</label>
              <Field
                icon="lock"
                component={InputField}
                placeholder="yourAwesomePassword"
                name="confirmPassword"
                type="password"
              />
            </Form.Field>
            <Button primary disabled={!valid} type="submit">Sign Up</Button>
          </Form>
          <Message attached="bottom" info>
            <Icon name="help" />
            Already signed up?&nbsp;<Link to="/login">Login here</Link>&nbsp;instead.
          </Message>
          <div>
            <h5>You can use this platform for register too.</h5>
            <Button circular color="facebook" icon="facebook" />
            <Button circular color="twitter" icon="twitter" />
            <Button circular color="black" icon="github" />
            <Button circular color="google plus" icon="google" />
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
);

export default reduxForm({
  form: 'signup',
  validate: signupValidation,
  asyncValidate: signupAsyncValidate,
  asyncBlurFields: ['username']
})(Signup);

