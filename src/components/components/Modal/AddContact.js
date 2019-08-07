import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import decode from 'jwt-decode';

//material-ui core
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
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
        display: 'flex', 
        justifyContent: 'space-between',
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

    function addContacts(e){
        e.preventDefault();
            axios('http://localhost:3001/api/addContact', {
                method: 'post',
                data: state,
            }).then(function (res) {
                console.log(res);
                handleComponent();
                handleClose();
                setToastifyType('addContact');
                setToastify(true);
            })
    }

    const classes = useStyles();
    return (
        <React.Fragment>
            <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={'sm'} fullWidth={true}>
                <DialogTitle className={classes.dialogTitle}>
                    <PersonAdd className={classes.icon} />
                    <span style={{marginLeft: '40px'}}>Add New Contact to Address Book</span> 
                    <Close className={classes.closeIcon} onClick={handleClose}/>
                </DialogTitle>

                <form onSubmit={e=>addContacts(e)}>
                <DialogContent className={classes.dialogContent} >
                    <TextField
                        margin="dense"
                        style={{ width: '48.5%' }}
                        required
                        label="First Name"
                        type="text"
                        variant="outlined"
                        name="first_name"
                        onChange={updateState}
                    />
                    <TextField
                        margin="dense"
                        style={{ width: '48.5%' }}
                        label="Last Name"
                        type="text"
                        variant="outlined"
                        name="last_name"
                        onChange={updateState}
                        required
                    />
                </DialogContent>

                <DialogContent className={classes.dialogContent}>
                    <TextField
                        margin="dense"
                        fullWidth
                        label="Email Address"
                        type="text"
                        variant="outlined"
                        name="email"
                        onChange={updateState}
                        type="email"
                        required
                    />
                </DialogContent>

                <DialogContent className={classes.dialogContent}>
                    <TextField
                        margin="dense"
                        style={{ width: '32%' }}
                        label="Home Phone"
                        type="text"
                        variant="outlined"
                        name="home_phone"
                        onChange={updateState}
                        required
                    />
                    <TextField
                        margin="dense"
                        style={{ width: '32%' }}
                        label="Mobile Phone"
                        type="number"
                        variant="outlined"
                        name="mobile_phone"
                        onChange={updateState}
                        required
                    />
                    <TextField
                        margin="dense"
                        style={{ width: '32%' }}
                        label="Work Phone"
                        type="text"
                        variant="outlined"
                        name="work_phone"
                        onChange={updateState}
                        required
                    />
                </DialogContent>

                <DialogContent className={classes.dialogContent}>
                    <TextField
                        margin="dense"
                        style={{ width: '60%' }}
                        label="City"
                        type="text"
                        variant="outlined"
                        name="city"
                        onChange={updateState}
                        required
                    />
                    <TextField
                        margin="dense"
                        style={{ width: '38%' }}
                        label="Postal Code"
                        type="number"
                        variant="outlined"
                        name="postal_code"
                        onChange={updateState}
                        required
                    />
                </DialogContent>

                <DialogContent className={classes.dialogContent}>
                    <TextField
                        margin="dense"
                        style={{ width: '48.5%' }}
                        label="State / Province"
                        type="text"
                        variant="outlined"
                        name="state"
                        onChange={updateState}
                        required
                    />
                    <TextField
                        margin="dense"
                        style={{ width: '48.5%' }}
                        label="Country"
                        type="text"
                        variant="outlined"
                        name="country"
                        onChange={updateState}
                        required
                    />
                </DialogContent>
                

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