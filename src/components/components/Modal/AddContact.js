import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import decode from 'jwt-decode';

//material-ui core
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
        float: 'right',
        cursor: 'pointer',
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
        fontSize: '32px',
        position: 'absolute',
    },
    submit: {
        backgroundColor: '#833ab4',
        color: 'white',
        margin: '0 15px 0 15px',
        padding: '10px 30px',
    },
}));


export default function AddContact({ handleClose, openDialog, handleComponent, setToastify, setToastifyType }) {
    const user_id = decode(localStorage.getItem('token')).userId;
    const [state, setState] = useState({
        first_name: '',
        last_name: '',
        home_phone: '',
        mobile_phone: '',
        work_phone: '',
        postal_code: '',
        email: '',
        city: '',
        country: '',
        state: '',
        user_id: user_id,
    })

    const updateState = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    function addContacts(e) {
        e.preventDefault();
        axios('http://localhost:3001/api/addContact', {
            method: 'post',
            data: state,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(function (res) {
            console.log(res);
            handleComponent();
            handleClose();
            setToastifyType('addContact');
            setToastify(true);
        }).catch(()=>{
            setToastifyType('addContactError');
            setToastify(true);
          })
    }

    const classes = useStyles();
    return (
        <React.Fragment>
            <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={'sm'} fullWidth={true}>
                <DialogTitle className={classes.dialogTitle}>
                    <PersonAdd className={classes.icon} />
                    <span style={{ marginLeft: '40px' }}>Add New Contact to Address Book</span>
                    <Close className={classes.closeIcon} onClick={handleClose} />
                </DialogTitle>

                <form onSubmit={e => addContacts(e)}>
                    <Grid container className={classes.dialogContent}>
                        <Grid item xs={12} sm={6} className={classes.dialogText}>
                            <TextField
                                margin="dense"
                                required
                                label="First Name"
                                type="text"
                                variant="outlined"
                                name="first_name"
                                onChange={updateState}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} className={classes.dialogText}>
                            <TextField
                                margin="dense"
                                label="Last Name"
                                type="text"
                                variant="outlined"
                                name="last_name"
                                onChange={updateState}
                                required
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} className={classes.dialogText}>
                            <TextField
                                margin="dense"
                                fullWidth
                                label="Email Address"
                                variant="outlined"
                                name="email"
                                onChange={updateState}
                                type="email"
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={4} className={classes.dialogText}>
                            <TextField
                                margin="dense"
                                label="Home Phone"
                                type="text"
                                variant="outlined"
                                name="home_phone"
                                onChange={updateState}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} className={classes.dialogText}>
                            <TextField
                                margin="dense"
                                label="Mobile Phone"
                                type="number"
                                variant="outlined"
                                name="mobile_phone"
                                onChange={updateState}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} className={classes.dialogText}>
                            <TextField
                                margin="dense"
                                label="Work Phone"
                                type="text"
                                variant="outlined"
                                name="work_phone"
                                onChange={updateState}
                                required
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={8} className={classes.dialogText}>
                            <TextField
                                margin="dense"
                                label="City"
                                type="text"
                                variant="outlined"
                                name="city"
                                onChange={updateState}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} className={classes.dialogText}>
                            <TextField
                                margin="dense"
                                label="Postal Code"
                                type="number"
                                variant="outlined"
                                name="postal_code"
                                onChange={updateState}
                                required
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} className={classes.dialogText}>
                            <TextField
                                margin="dense"
                                label="State / Province"
                                type="text"
                                variant="outlined"
                                name="state"
                                onChange={updateState}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.dialogText}>
                            <TextField
                                margin="dense"
                                label="Country"
                                type="text"
                                variant="outlined"
                                name="country"
                                onChange={updateState}
                                required
                                fullWidth
                            />
                        </Grid>
                    </Grid>


                    <DialogActions>
                        <Button onClick={handleClose} className={classes.cancel}>
                            CANCEL
                    </Button>
                        <Button className={classes.submit} type="submit">
                            ADD CONTACT
                    </Button>
                    </DialogActions>
                </form>




            </Dialog>
        </React.Fragment>
    )
}