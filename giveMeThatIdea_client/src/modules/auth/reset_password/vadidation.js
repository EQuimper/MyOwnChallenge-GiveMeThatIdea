export const resetPasswordValidation = values => {
  const errors = {};

  if (!values.password) {
    errors.password = 'Password is Required';
  } else if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm Password is Required';
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Confirm Password must match the password';
  }

  return errors;
};
