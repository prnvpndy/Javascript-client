import React from 'react';
import { TextField } from '../../components';
import { Div } from '../../components/TextField/style';
// import { banners, DEFAULT_BANNER_IMAGE } from '../../config/constants';

function TextFieldDemo() {
  return (
    <>
      <Div>

        <p><b>Name</b></p>
        <TextField input type="text" />
        <p><b>Select the game you Play</b></p>

      </Div>
    </>
  );
}
export default TextFieldDemo;
