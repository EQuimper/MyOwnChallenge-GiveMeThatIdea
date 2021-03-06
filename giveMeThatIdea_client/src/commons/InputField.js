import React from 'react';
import { Message, Form } from 'semantic-ui-react';

const InputField = ({ placeholder, input, icon, type, meta: { asyncValidating, touched, error } }) => (
  <div>
    <Form.Input
      loading={asyncValidating}
      iconPosition={icon && 'left'}
      icon={icon}
      {...input}
      placeholder={placeholder}
      type={type}
    />
    {touched && error && <Message size="mini" negative>{error}</Message>}
  </div>
);

export default InputField;
