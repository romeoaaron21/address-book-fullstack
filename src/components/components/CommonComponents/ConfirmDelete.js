import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

//material-ui core
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


//material-ui icons
import Close from '@material-ui/icons/Close';
import DeleteSweep from '@material-ui/icons/DeleteSweep';


const useStyles = makeStyles(theme => ({
    cancel: {
        backgroundColor: '#ff5151', 
        color: 'white', 
        margin: '0 5px',
        padding: '7px 20px'
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
        backgroundColor: '#f54040', 
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
        padding: '7px 20px',
    },
}));


export default function ConfirmDelete({ handleClose, openDialog, handleComponent, contactId, setToastify, setToastifyType, groupId, setContactId, saveGroupId }) {

    function Delete(){
        if(contactId){
        axios(`http://localhost:3001/api/deleteContact/${contactId}`, {
              method: 'delete',
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
            }).then(function (res) {
                saveGroupId('');
                setContactId('');
                handleComponent();
                handleClose();
                setToastifyType('deleteContact');
                setToastify(true);
            }).catch(() => {
                saveGroupId('');
                setContactId('');
                setToastifyType('deleteContactError');
                setToastify(true);
            })
        }else if(groupId){
               axios(`http://localhost:3001/api/deleteGroup/${groupId}`, {
                    method: 'delete',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
                }).then(function (res) {
                    saveGroupId('');
                    setContactId('');
                    handleComponent();
                    handleClose();
                    setToastifyType('deleteGroup');
                    setToastify(true);
                }).catch(()=>{
                    saveGroupId('');
                    setContactId('');
                    setToastifyType('deleteGroupError');
                    setToastify(true);
                })
        }
    }

    const classes = useStyles();
    return (
        <React.Fragment>
            <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={'xs'} fullWidth={true}>
                <DialogTitle className={classes.dialogTitle}>
                    <DeleteSweep className={classes.icon} />
                    <span style={{marginLeft: '40px'}}>Delete Confirmation</span> 
                    <Close className={classes.closeIcon} onClick={handleClose}/>
                </DialogTitle>

                <form onSubmit={() => Delete()}>
                <DialogContent style={{textAlign:'center', padding:'30px', fontSize:'1.1rem'}}>
                    <span>Are you sure you want to delete this?</span>
                </DialogContent>
                
                <DialogActions>
                    <Button onClick={handleClose} className={classes.cancel}>
                        No
                    </Button>
                    <Button className={classes.submit} type="submit">
                        Yes
                    </Button>
                </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
    )
}