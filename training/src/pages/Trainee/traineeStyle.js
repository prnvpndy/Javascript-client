const useStyles = (theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  dialog: {
    textAlign: 'right',
  },
});
const style = (theme) => ({
  root: {
    display: 'flex',
    height: 160,
    margin: theme.spacing(5),
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 170,
    backgroundColor: '#545454',
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    marginLeft: theme.spacing(5),
  },
  back: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    color: 'black',
    marginLeft: theme.spacing(80),
  },
});
export default { useStyles, style };
