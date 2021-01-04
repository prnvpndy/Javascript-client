import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string()
    .trim().email().required('Email Address is a required field'),
  password: yup.string()
    .required('Password is required')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, 'Must contain 8 characters, at least one uppercase letter, one lowercase letter and one number'),
});
export default schema;
