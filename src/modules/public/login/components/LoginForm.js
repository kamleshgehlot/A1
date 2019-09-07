import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  container: {
    backgroundColor: '#fff',
    padding: `${theme.margin * 1.5}px ${theme.margin}px`,
    width: 450,
    borderRadius: 6,
    margin: '0 auto',
  },
  button: {
    borderColor: theme.palette.primary.main,
    marginTop: theme.spacing(4),
    backgroundColor: '#20a8d8',
    color:"white",
  },
  forgotContainer: {
    textAlign: 'right',
    fontSize: theme.typography.pxToRem(12),
    color:"#20a8d8",
    // marginTop: theme.margin * 2,
  },
});

const LoginForm = ({ value, isLoading, onChange, onSubmit, classes }) => {
  const isFormEnabled = Object.values(value).every(item => item !== '');

  function handlePasswordBlur(){
    document.getElementById('login').focus();
  }


  return (
    <form className={classes.container} onSubmit={onSubmit}>
      <TextField
        label="Username"
        value={value.username}
        name="username"
        onChange={onChange}
        margin="normal"
        fullWidth
        autoFocus
        autoComplete="off"
      />
      <TextField
        label="Password"
        value={value.password}
        name="password"
        onChange={onChange}
        margin="normal"
        fullWidth
        type="password"
        onBlur = {handlePasswordBlur}
      />
      <p className={classes.forgotContainer}>
        <Link to="/forgotPassword" >Forgot Password?</Link>
      </p>
      <Button
        onClick={onSubmit}
        variant="outlined"
        color="primary"
        fullWidth
        className={classes.button}
        disabled={!isFormEnabled}
        type="submit"
        id="login"
      >
        {isLoading ? <CircularProgress size={20} /> : 'Login'}
      </Button>
    </form>
  );
};

LoginForm.propTypes = {
  value: PropTypes.object,
  isLoading: PropTypes.bool,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  classes: PropTypes.object, // Material UI Injected
};

export default withStyles(styles)(LoginForm);
