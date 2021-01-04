import schema from './DialogSchema';

const hasErrors = () => {
  try {
    schema.validateSync(this.state);
  } catch (err) {
    return true;
  }
  return false;
};
// eslint-disable-next-line consistent-return
const getError = (field) => {
  const { touched } = this.state;
  if (touched[field] && this.hasErrors()) {
    try {
      schema.validateSyncAt(field, this.state);
      return '';
    } catch (err) {
      return err.message;
    }
  }
};
const isTouched = (field) => {
  const { touched } = this.state;
  this.setState({
    touched: {
      ...touched,
      [field]: true,
    },
  });
};
const passwordType = (key) => {
  if (key === 'Password' || key === 'Confirm Password') {
    return 'password';
  }
  return '';
};
export default {
  passwordType, isTouched, getError, hasErrors,
};
