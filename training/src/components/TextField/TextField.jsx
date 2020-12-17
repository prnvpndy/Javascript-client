import React, { Component } from 'react';
import { Error, Input } from './style'
class TextField extends Component {
    render() {
        const { value, disabled, error }= this.props;
        const inputProps = {};
        if (error) {
            inputProps.error = error;
        }
        if (disabled) {
            inputProps.disabled = disabled;
        }
        if(value) {
            inputProps.value = value;
        }
        return (
            <>
            <Input type="text" {...inputProps} />
            {error && <Error>{error}</Error>}
            </>
            );
    }

    }
export  default TextField;