import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

//material-ui core
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';


//material-ui icons
import Close from '@material-ui/icons/Close';
import GroupAdd from '@material-ui/icons/GroupAdd';


const useStyles = makeStyles(theme => ({
    cancel: {
        backgroundColor: '#ff5151', 
        color: 'white', 
        margin: '0 5px',
        padding: '10px 20px'
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
        margin: '0 5px', 
        padding: '10px 20px',
    },
}));


export default function AddContact({ handleClose, openDialog, handleComponent }) {
    const id = localStorage.getItem('id');
    const [state, setState] = useState((''))

    const classes = useStyles();
    return (
        <React.Fragment>
            <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={'xs'} fullWidth={true}>
                <DialogTitle className={classes.dialogTitle}>
                    <GroupAdd className={classes.icon} />
                    <span style={{marginLeft: '40px'}}>Add New Group to Address Book</span> 
                    <Close className={classes.closeIcon} onClick={handleClose}/>
                </DialogTitle>

                <DialogContent className={classes.dialogContent}>
                    <TextField
                        margin="dense"
                        fullWidth
                        required
                        label="Group Name"
                        type="text"
                        variant="outlined"
                        name="group_name"
                        onChange={e=>{setState(e.target.value)}}
                    />
                </DialogContent>

                
                <DialogActions>
                    <Button onClick={handleClose} className={classes.cancel}>
                        CANCEL
                    </Button>
                    <Button className={classes.submit} onClick={() => {
                        axios(`http://localhost:3001/api/addGroup/${id}/${state}`, {
                            method: 'post',
                        }).then(function(res) {
                            console.log(res)
                            handleComponent();
                            handleClose();
                        })
                    }}>
                        ADD GROUP
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}