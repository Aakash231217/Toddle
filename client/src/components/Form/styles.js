import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    boxShadow: '0 1px 3px rgba(0, 0, 0.1, 0.1)',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '100%',
    margin: '10px 0',
    '& input': {
      backgroundColor: '#FFFFFF',
      padding: '8px 12px',
      borderRadius: 5,
      border: '1px solid #CED4DA',
    },
    '& label': {
      display: 'block',
      marginBottom: 8,
      fontSize: 14,
      fontWeight: 'bold',
    },
  },
  buttonSubmit: {
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#2196F3',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#1976D2',
    },
  },
  buttonClear: {
    marginTop: 10,
    backgroundColor: '#E0E0E0',
    color: '#000',
    '&:hover': {
      backgroundColor: '#BDBDBD',
    },
  },
}));
