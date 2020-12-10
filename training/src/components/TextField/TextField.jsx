/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Error, Input } from './style';

// eslint-disable-next-line react/prefer-stateless-function
class TextField extends Component {
  render() {
    const { value, error, onChange } = this.props;
    if (error) {
      return (
        <>
          <Input type="text" value={value} error onChange={onChange} />
          <Error>{error}</Error>
        </>
      );
    }
    return (
      <Input type="text" value={value} onChange={onChange} />
    );
  }
}
export default TextField;

TextField.propTypes = {
  value: propTypes.string.isRequired,
  // disabled: propTypes.bool,
  error: propTypes.string,
  onChange: propTypes.func,

};

TextField.defaultProps = {
  // disabled: false,
  error: '',
  onChange: '',
};
