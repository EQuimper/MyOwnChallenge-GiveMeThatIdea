import React from 'react';
import { Button, Checkbox, Form, Grid } from 'semantic-ui-react';
import { reduxForm, Field } from 'redux-form';
import { InputField, TextAreaField } from '../../../../commons';
import { createIdeaValidation, ideaTitleAsyncValidate } from './validation';

const CreateIdeaForm = () => (
  <Form>
    <Form.Field>
      <label>Title</label>
      <Field
        placeholder="Awesome title here..."
        component={InputField}
        name="title"
        type="text"
      />
    </Form.Field>
    <Form.Field>
      <label>Description</label>
      <Field
        placeholder="Awesome description here..."
        name="description"
        type="text"
        component={TextAreaField}
      />
    </Form.Field>
    <Button type='submit'>Create Idea</Button>
  </Form>
);

export default reduxForm({
  form: 'createIdea',
  validate: createIdeaValidation,
  asyncValidate: ideaTitleAsyncValidate,
  asyncBlurFields: ['title']
})(CreateIdeaForm);
