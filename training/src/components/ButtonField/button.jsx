import React from 'react';
import PropTypes from 'prop-types';
import { Buttons } from './style';

export default function ButtonField(props) {
  const {
    color, style, value, disabled, onClick,
  } = props;
  return (
    <>
      <Buttons
        type={value}
        color={color}
        disabled={disabled}
        onClick={onClick}
        style={style}
      >
        {value}
      </Buttons>
    </>
  );
}
ButtonField.propTypes = {
  color: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.objectOf(PropTypes.string),
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
ButtonField.defaultProps = {
  color: '',
  disabled: false,
  style: {},
};
