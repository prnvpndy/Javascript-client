const useStyles = (theme) => ({
  table: {
    minWidth: 650,
  },
  header: {
    color: 'grey',
  },
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:hover': {
      backgroundColor: 'rgb(200,200,200)',
      cursor: 'pointer',
    },
  },

});
export default useStyles;
