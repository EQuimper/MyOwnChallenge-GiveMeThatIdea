import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Button } from 'semantic-ui-react';
import { TextAreaField } from '../../../../commons';
import { commentValidation } from './validation';

const CreateComment = ({ valid, handleSubmit, createComment }) => (
  <Form reply onSubmit={handleSubmit(createComment)}>
    <Field
      component={TextAreaField}
      name="text"
      placeholder="Create a new comment..."
    />
    <Button disabled={!valid} content="Add Reply" labelPosition="left" icon="edit" primary />
  </Form>
);

export default reduxForm({
  form: 'createComment',
  validate: commentValidation
})(CreateComment);
