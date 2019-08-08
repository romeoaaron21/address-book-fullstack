import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

//components
import LoaderEdit from '../Loader/LoaderEdit'

//material-ui components
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

//material-ui icons
import Close from '@material-ui/icons/Close';
import PersonAdd from '@material-ui/icons/PersonAdd';


const useStyles = makeStyles(theme => ({
    cancel: {
        backgroundColor: '#ff5151', 
        color: 'white', 
        margin: '15px 0', 
        padding: '10px 30px'
    },
    closeIcon: {
        float:'right', 
        cursor:'pointer',
    },
    dialogContent: {
        padding: '10px 20px'
    },
    dialogText: {
        padding: '5px 5px',
    },
    dialogTitle: {
        backgroundColor: '#833ab4', 
        color: 'white',
    },
    icon: {
        fontSize:'32px', 
        position:'absolute',
    },
    submit: {
        backgroundColor: '#833ab4', 
        color: 'white', 
        margin: '15px', 
        padding: '10px 30px',
    },
}));




export default function EditContact({handleClose, openDialog, editId, handleComponent, setToastify, setToastifyType}) {
    const [ showId, setShowId ] = useState(true);
    const [ state, setState ] = useState({
        first_name:'',
        last_name:'',
        home_phone:'',
        mobile_phone:'',
        work_phone:'',
        postal_code:'',
        email:'',
        city:'',
        country:'',
        state:'',
    })
    const updateState = e => {
        setState({
          ...state,
          [e.target.name]: e.target.value
        });
      };

      if(showId){
        axios(`http://localhost:3001/api/getContactInfo/${editId}`, {
            method: 'get',
        }).then(function(res) {
            console.log(res)
            setState({
                id:res.data[0].id,
                first_name:res.data[0].first_name,
                last_name:res.data[0].last_name,
                home_phone:res.data[0].home_phone,
                mobile_phone:res.data[0].mobile_phone,
                work_phone:res.data[0].work_phone,
                postal_code:res.data[0].postal_code,
                email:res.data[0].email,
                city:res.data[0].city,
                country:res.data[0].country,
                state:res.data[0].state,
            });
        })
        setShowId(false);
      }

    function editContacts(e){
        e.preventDefault();
            axios(`http://localhost:3001/api/editContact/${editId}`, {
                        method: 'patch',
                        data: state,
                    }).then(function(res){
                        console.log(res);
                        handleComponent();
                        handleClose();
                        setToastifyType('editContact');
                        setToastify(true);
                    }).catch(() => {
                        setToastifyType('editContactError');
                        setToastify(true);
                    })
                    
    } 

    const classes = useStyles();
    return (
        <React.Fragment>
            <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={'sm'} fullWidth={true}>
            {!showId && state.id?
            <React.Fragment>

                <DialogTitle className={classes.dialogTitle}>
                    <PersonAdd className={classes.icon} />
                    <span style={{marginLeft: '40px'}}>Edit Contact Information of {state.first_name.charAt(0).toUpperCase() + state.first_name.slice(1)}</span> 
                    <Close className={classes.closeIcon} onClick={handleClose}/>
                </DialogTitle>
                <form onSubmit={e=>editContacts(e)}>
                
                <Grid container className={classes.dialogContent}>
                <Grid item xs={12} sm={6} className={classes.dialogText}>
                    <TextField
                        fullWidth
                        required
                        margin="dense"
                        label="First Name"
                        type="text"
                        variant="outlined"
                        name="first_name"
                        onChange={updateState}
                        defaultValue={state.first_name}
                    />
                    </Grid>

                    <Grid item xs={12} sm={6} className={classes.dialogText}>
                    <TextField
                        fullWidth
                        required
                        margin="dense"
                        label="Last Name"
                        type="text"
                        variant="outlined"
                        name="last_name"
                        onChange={updateState}
                        defaultValue={state.last_name}
                    />
                    </Grid>

                    <Grid item xs={12} sm={12} className={classes.dialogText}>
                    <TextField
                        fullWidth
                        required
                        margin="dense"
                        label="Email Address"
                        type="email"
                        variant="outlined"
                        name="email"
                        onChange={updateState}
                        defaultValue={state.email}
                    />
                    </Grid>

                    <Grid item xs={12} sm={4} className={classes.dialogText}>
                    <TextField
                        fullWidth
                        required
                        margin="dense"
                        label="Home Phone"
                        type="text"
                        variant="outlined"
                        name="home_phone"
                        onChange={updateState}
                        defaultValue={state.home_phone}
                    />
                    </Grid>
                    <Grid item xs={12} sm={4} className={classes.dialogText}>
                    <TextField
                        fullWidth
                        required
                        margin="dense"
                        label="Mobile Phone"
                        type="number"
                        variant="outlined"
                        name="mobile_phone"
                        onChange={updateState}
                        defaultValue={state.mobile_phone}
                    />
                    </Grid>
                    <Grid item xs={12} sm={4} className={classes.dialogText}>
                    <TextField
                        fullWidth
                        required
                        margin="dense"
                        label="Work Phone"
                        type="text"
                        variant="outlined"
                        name="work_phone"
                        onChange={updateState}
                        defaultValue={state.work_phone}
                    />
                    </Grid>

                    <Grid item xs={12} sm={8} className={classes.dialogText}>
                    <TextField
                        fullWidth
                        required
                        margin="dense"
                        label="City"
                        type="text"
                        variant="outlined"
                        name="city"
                        onChange={updateState}
                        defaultValue={state.city}
                    />
                </Grid>

                <Grid item xs={12} sm={4} className={classes.dialogText}>
                    <TextField
                        fullWidth
                        required
                        margin="dense"
                        label="Postal Code"
                        type="number"
                        variant="outlined"
                        name="postal_code"
                        onChange={updateState}
                        defaultValue={state.postal_code}
                    />
                    </Grid>

                    <Grid item xs={12} sm={6} className={classes.dialogText}>
                    <TextField
                        fullWidth
                        required
                        margin="dense"
                        label="State / Province"
                        type="text"
                        variant="outlined"
                        name="state"
                        onChange={updateState}
                        defaultValue={state.state}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.dialogText}>
                    <TextField
                        fullWidth
                        required
                        margin="dense"
                        label="Country"
                        type="text"
                        variant="outlined"
                        name="country"
                        onChange={updateState}
                        defaultValue={state.country}
                    />
                </Grid>
                </Grid>
                
                
                


                <DialogActions>
                    <Button onClick={handleClose} className={classes.cancel}>
                        Cancel
          </Button>
                    <Button className={classes.submit} type="submit">
                        Edit Contact Information
          </Button>
                </DialogActions>
                </form>
                </React.Fragment>
                :
                <LoaderEdit />
                }
            </Dialog>
        </React.Fragment>
    )
}