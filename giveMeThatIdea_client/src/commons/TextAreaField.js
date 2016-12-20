import React from 'react';
import { Message, Form } from 'semantic-ui-react';

const TextAreaField = ({ placeholder, input, type, meta: { touched, error } }) => (
  <div>
    <Form.TextArea
      {...input}
      placeholder={placeholder}
      type={type}
    />
    {touched && error && <Message size="mini" negative>{error}</Message>}
  </div>
);

export default TextAreaField;
