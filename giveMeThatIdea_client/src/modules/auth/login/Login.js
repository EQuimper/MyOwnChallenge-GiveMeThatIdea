import React from 'react';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { Button, Form, Grid, Message, Icon } from 'semantic-ui-react';
import { InputField } from '../../../commons';
import { loginValidation } from './validation';

const styles = {
  root: {
    position: 'relative'
  },
  buttonCancel: {
    position: 'absolute',
    top: '5%',
    right: '5%'
  }
}

const Login = ({ handleSubmit, loginUser, valid }) => (
  <div style={styles.root}>
    <Grid centered columns={3} style={{ height: '90vh' }} verticalAlign="middle">
      <Grid.Row>
        <Grid.Column>
          <Message
            attached
            header="Welcome to our GiveMeThatIdea!"
            content="Fill out the form below for login!"
          />
          <Form className="attached fluid segment" onSubmit={handleSubmit(loginUser)}>
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
            <Button disabled={!valid} primary type="submit">Login</Button>
          </Form>
          <Message attached="bottom" warning>
            <Icon name="help" />
            Forgot Password?&nbsp;<Link to="/forgotPassword">Click here</Link>
          </Message>
          <Message attached="bottom" info>
            <Icon name="help" />
            No account yet?&nbsp;<Link to="/signup">Register here</Link>&nbsp;instead.
          </Message>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
);

export default reduxForm({
  form: 'login',
  validate: loginValidation
})(Login);

// <Button circular color="twitter" icon="twitter" />
// <Button circular color="google plus" icon="google" />

// <div>
//             <h5>You can use this platform for login too.</h5>
//             <Button circular color="facebook" icon="facebook" />
//             <a href="http://localhost:3001/api/v1/auth/github">
//               <Button
//                 circular
//                 color="black"
//                 icon="github"
//               />
//             </a>
//           </div>
