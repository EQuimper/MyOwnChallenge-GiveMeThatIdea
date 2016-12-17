import axios from 'axios';

export const signupValidation = values => {
  const errors = {};

  if (!values.password) {
    errors.password = 'Password is Required';
  } else if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm Password is Required';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Confirm Password must match the password';
  }

  if (!values.email) {
    errors.email = 'Email is Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};


export const signupAsyncValidate = values => {
  return axios.post('/auth/asyncemail', { email: values.email })
    .then(res => {
      console.log({ res });
      if (res.data.exist) {
        throw { email: res.data.message };
      }
    });
}
