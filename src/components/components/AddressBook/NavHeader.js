import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

//material-ui components
import AppBar from '@material-ui/core/AppBar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

//material-ui icons
import LogoutIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles(theme => ({
    bar: {
      backgroundImage: 'linear-gradient(to right, #ff37a9, #ff2cb6, #ff20c5, #ff14d5, #ff0de6, #fe0bed, #fc0bf3, #fa0dfa, #f60af6, #f206f2, #ef03ef, #eb00eb)',
    },
    icon: {
      color: 'white',
    },
    menuButton: {
      marginRight: theme.spacing(2),
      color: 'white',
    },
    title: {
      flexGrow: 1,
      marginLeft: theme.spacing(2),
      letterSpacing: '2px',
    },
      
}));

export default function NavHeader({user}){
    const classes = useStyles();
    return(
        <React.Fragment>
          <AppBar position="static" className={classes.bar} >
              <Toolbar>
                <Icon className={classes.icon} fontSize="large">account_box</Icon>
                <Typography variant="h6" className={classes.title}>Welcome {user}!</Typography>
                <IconButton onClick={() => {
                      localStorage.clear()
                      window.location.href = '#/'}}
                >
                  <LogoutIcon className={classes.icon} fontSize="large" />
                </IconButton>
              </Toolbar>
            </AppBar>
          </React.Fragment>
    )
}