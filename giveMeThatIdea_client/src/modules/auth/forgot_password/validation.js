import axios from 'axios';

export const forgotPasswordValidation = values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Email is Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

export const forgotPasswordAsyncValidate = values => {
  return axios.post('/auth/asyncemail', { email: values.email })
    .then(res => {
      if (!res.data.exist) {
        const errorMessage = { email: 'Email not exist are you sure this is your?' };
        throw errorMessage;
      }
    });
}
