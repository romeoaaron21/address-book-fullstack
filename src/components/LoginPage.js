import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { Link } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [state, setState] = useState({
    username : '',
    password : ''
  })
  const [warning, setWarning] = useState({
    username : false,
    password : false

  })
  const [helper, setHelper] = useState({
    username : '',
    password : ''
  })

  const updateWarning = e => {
    if(e.target.value.length === 0) {
      setWarning({
        ...warning,
        [e.target.name]: true
      })

      setHelper({
        ...helper,
        [e.target.name]: `${e.target.name.charAt(0).toUpperCase() + e.target.name.slice(1)} field is required`
      })
    }
    else{
      setHelper({
        ...helper,
        [e.target.name]: ''
      })
    }
  }

  const updateState = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
    if(e.target.value.length > 0) {
      setWarning({
        ...warning,
        [e.target.name]: false
      })
      setHelper({
        ...helper,
        [e.target.name]: ''
      })
    }
    else{
      setWarning({
        ...warning,
        [e.target.name]: true
      })
      setHelper({
        ...helper,
        [e.target.name]: `${e.target.name.charAt(0).toUpperCase() + e.target.name.slice(1)} field is required`
      })
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            error = {warning.username}
            onBlur={updateWarning}
            onChange={updateState}
            helperText = {helper.username}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            error = {warning.password}
            onBlur={updateWarning}
            onChange={updateState}
            helperText = {helper.password}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <Button
            onClick = {()=> {
              axios.post('http://localhost:3001/api/login', {
                body: state,
              }).then(res => console.log(res))
              }
            }
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/register">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>

  );
}