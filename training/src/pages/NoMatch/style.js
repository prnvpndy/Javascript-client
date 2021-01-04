import { createMuiTheme } from '@material-ui/core';

const styles = () => ({
  Text: {
    color: 'grey',
  },
});

const theme = createMuiTheme({
  typography: {
    htmlFontSize: 10,
    fontFamily: [
      'Arial',
    ].join(','),
  },
});
export default { styles, theme };
