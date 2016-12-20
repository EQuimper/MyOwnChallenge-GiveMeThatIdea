import React from 'react';
import { Form, Message } from 'semantic-ui-react'

const SelectField = ({ input, options, placeholder, meta: { touched, error }, ...custom }) => (
  <div>
    {console.log({ input, custom, options })}
    <Form.Select
      placeholder={placeholder}
      options={options}
      {...input}
      {...custom}
      onChange={(e, value) => input.onChange(value.value)}
    />
    {touched && error && <Message size="mini" negative>{error}</Message>}
  </div>
);

export default SelectField;
