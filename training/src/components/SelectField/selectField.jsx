/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { Select, Error } from './style';

function SelectField(props) {
  const {
    error, onChange, options, defaultText, onBlur,
  } = props;
  return (
    <>
      <Select onChange={onChange} error={error} onBlur={onBlur}>
        {defaultText && <option>{defaultText}</option>}
        {
          options && options.length
                    && options.map(({ value, label }) => <option key={label} value={value}>{label}</option>)
        }

      </Select>
      <Error>{error}</Error>
    </>
  );
}
export default SelectField;
SelectField.propTypes = {
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  defaultText: PropTypes.string,
  onBlur: PropTypes.string.isRequired,
};
SelectField.defaultProps = {
  error: '',
  options: [],
  defaultText: 'Select',
};
