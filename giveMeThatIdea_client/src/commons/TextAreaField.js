import React from 'react';
import { Message, TextArea } from 'semantic-ui-react';

const TextAreaField = ({ placeholder, input, type, meta: { touched, error } }) => (
  <div>
    <TextArea
      {...input}
      placeholder={placeholder}
      type={type}
    />
    {touched && error && <Message size="mini" negative>{error}</Message>}
  </div>
);

export default TextAreaField;
