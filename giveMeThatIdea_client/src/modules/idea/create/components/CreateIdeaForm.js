import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { reduxForm, Field } from 'redux-form';
import { InputField, TextAreaField, SelectField } from '../../../../commons';
import { createIdeaValidation, ideaTitleAsyncValidate } from './validation';

const optionsMap = arr => {
  return arr.reduce((acc, value) => {
    acc.push({ text: value.name, value: value._id });
    return acc;
  }, []);
};

const CreateIdeaForm = ({ valid, categories, handleSubmit, createIdea }) => (
  <Form onSubmit={handleSubmit(createIdea)}>
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
    <Form.Field>
      <label>Category</label>
      <Field
        placeholder="Category"
        component={SelectField}
        name="category"
        options={optionsMap(categories)}
      />
    </Form.Field>
    <Button primary type="submit" disabled={!valid}>Create Idea</Button>
  </Form>
);

export default reduxForm({
  form: 'createIdea',
  validate: createIdeaValidation,
  asyncValidate: ideaTitleAsyncValidate,
  asyncBlurFields: ['title']
})(CreateIdeaForm);
