import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundImage: 'url(http://sartorialgeek.com/wp-content/uploads/2019/03/tumblr-static-tumblr-static-4s7ywtc5xqioccocksokosgc0-focused-v3-booknerd-40616612-2048-1152.jpg)',
      backgroundSize: 'cover',
      
    },
  },
  paper: {
    marginTop: '15vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid #757575', 
    boxShadow: '5px 7px #b5b5b582', 
    backgroundColor:'#dedbdb', 
    padding:'40px 20px'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(4, 0, 2),
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
  // let token = localStorage.getItem('token');

  const [ token, setToken ] = useState('');
  const [ id, setId ] = useState('');
  localStorage.setItem('token', token);
  localStorage.setItem('id', id);

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
    <Container component="main" style={{maxWidth:'500px'}}>
      <ToastContainer enableMultiContainer/>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Address Book Login
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
              axios('http://localhost:3001/api/login', {
                method: 'post',
                data: state,
                // headers: {
                //   'Authorization': `Bearer ${token}`
                // }
              }).then(function(res) {
                setToken(res.data.token)
                setId(res.data.id)
                window.location.href = '#/addressBook'
              }).catch(() => {
                toast.error("Invalid User Account!", {
                  position: toast.POSITION.TOP_RIGHT
                });
              })
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