import axios from 'axios';
import toastr from 'react-redux-toastr';
import { unauthUser } from '../../../auth/actions';

export const createIdeaValidation = values => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Title is Required';
  } else if (values.title.length < 4) {
    errors.title = 'Title need to be a bit longer';
  }

  if (!values.description) {
    errors.description = 'Description is Required';
  } else if (values.description.length < 30) {
    errors.description = 'Description need to be a bit longer';
  }

  if (!values.category) {
    errors.category = 'Category is Required';
  }

  return errors;
};

export const ideaTitleAsyncValidate = values => {
  return axios.post('/ideas/asyncIdeaTitle', { title: values.title })
    .then(
      res => {
        console.log({ res });
        if (res.data.exist) {
          throw { title: res.data.message };
        }
      },
      err => {
        if (err.response.status === 401) {
          return toastr.error('Unauthorized', 'Plz log again!');
        }
      }
    );
}
