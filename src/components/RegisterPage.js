import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


import {Link} from 'react-router-dom';
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [warning, setWarning] = useState({
    first_name : false,
    last_name : false,
    username : false,
    password : false
  })
  const [state, setState] = useState({
      first_name : '',
      last_name : '',
      username : '',
      password : ''
  })
  const [helper, setHelper] = useState({
      first_name : '',
      last_name : '',
      username : '',
      password : ''
  })

  const [ token, setToken ] = useState('');
  localStorage.setItem('token', token);

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
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} required>
              <TextField
                error = {warning.first_name}
                onBlur={updateWarning}
                onChange={updateState}
                helperText = {helper.first_name}
                autoComplete="fname"
                name="first_name"
                variant="outlined"
                required
                fullWidth
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error = {warning.last_name}
                onBlur={updateWarning}
                onChange={updateState}
                helperText = {helper.last_name}
                variant="outlined"
                required
                fullWidth
                label="Last Name"
                name="last_name"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error = {warning.username}
                onBlur={updateWarning}
                onChange={updateState}
                helperText = {helper.username}
                variant="outlined"
                required
                fullWidth
                label="Username"
                name="username"
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error = {warning.password}
                onBlur={updateWarning}
                onChange={updateState}
                helperText = {helper.password}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            onClick = {()=> {
              axios('http://localhost:3001/api/register', {
                method: 'post',
                data: state,
              }).then(res => setToken(res.data.token))
              }
            }
    
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}