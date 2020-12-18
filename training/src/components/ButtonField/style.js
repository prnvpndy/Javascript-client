import styled, { css } from 'styled-components';

export const Buttons = styled.button`
${(props) => props.types === 'cancel'
        && css`
 background-color: black;
 border: none;
 color: black;
 padding:12px;
 text-align: center;
 text-decoration: none;
 display: inline-block;
 font-size: 16px;
 margin: 4px 2px;
 cursor: pointer;
 border-radius: 6x
`};

${(props) => props.disabled === true
        && props.type === 'submit'
        && css`
background-color: black;
border: none;
color: #B3B6B7;
padding: 12px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 16px;
margin: 4px 2px;
cursor: pointer;
border-radius: 6x
`};

${(props) => props.disabled === false
        && props.type === 'submit'
        && css`
    background-color: #4caf50;
    border: none;
    color: white;
    padding: 12px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 6px;
`}
`;
