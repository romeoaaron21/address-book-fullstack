import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

//material-ui core
import CircularProgress from '@material-ui/core/CircularProgress';



const useStyles = makeStyles(theme => ({
    loading:{
      display:'flex', 
      justifyContent:'center',
    },
  }));


export default function Loader(){

    const classes = useStyles();
    return(
        <React.Fragment>
            <div className={classes.loading} style={{margin:'40vh 0 2vh 0'}}>
                <CircularProgress thickness={5} size={80}/>
            </div>
            <div className={classes.loading}>Loading Contact Information</div>
        </React.Fragment>
    )
}