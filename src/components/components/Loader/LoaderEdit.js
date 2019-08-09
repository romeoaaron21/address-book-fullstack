import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

//material-ui core
import CircularProgress from '@material-ui/core/CircularProgress';



const useStyles = makeStyles(theme => ({
    loading:{
      display:'flex', 
      justifyContent:'center',
      marginBottom:'7vh'
    },
  }));


export default function LoaderEdit(){

    const classes = useStyles();
    return(
        <React.Fragment>
            <div className={classes.loading} style={{margin:'7vh 0 3vh 0'}}>
                <CircularProgress thickness={5}/>
            </div>
            <div className={classes.loading}>Loading Contact Information</div>
        </React.Fragment>
    )
}