const Design = (theme) => ({
  icon: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,

  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  main: {
    marginTop: theme.spacing(15),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input: {
    paddingRight: 5,
  },
});
export default Design;
