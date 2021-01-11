import schema from './DialogSchema';

const hasErrors = (state) => {
  try {
    schema.validateSync(state);
  } catch (err) {
    return true;
  }
  return false;
};
const passwordType = (key) => {
  if (key === 'Password' || key === 'Confirm Password') {
    return 'password';
  }
  return '';
};
export { hasErrors, passwordType };
