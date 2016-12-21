export const commentValidation = values => {
  const errors = {};

  if (!values.text) {
    errors.text = 'Comment is Required';
  }

  return errors;
};
