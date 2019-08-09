import React, { useState } from 'react';
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
import GroupAdd from '@material-ui/icons/Group';


import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export default function SelectAddMembers({ handleClose, openDialog, handleComponent, groupId }) {
    const [component, setComponent] = useState(true);
    const [contacts, setContacts] = useState([]);
    const [contactName, setContactName] = useState([]);

    if (component) {
        axios(`http://localhost:3001/api/getAvailableContact/${groupId}`, {
          method: 'get',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }).then(function (res) {
            console.log(res);
            setContacts(res.data)
        })
        setComponent(false);
    }


    const classes = useStyles();
    return (
        <React.Fragment>
            <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={'xs'} fullWidth={true}>
                <DialogTitle className={classes.dialogTitle}>
                    <GroupAdd className={classes.icon} />
                    <span style={{marginLeft: '40px'}}>Add Contacts to Selected Group</span> 
                    <Close className={classes.closeIcon} onClick={handleClose}/>
                </DialogTitle>

                <DialogContent className={classes.dialogContent}>

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="select-multiple-checkbox">Select Contact Group/s</InputLabel>
                    <Select
                    multiple
                    style={{width:'40vh'}}
                    value={contactName}
                    onChange={e=>setContactName(e.target.value)}
                    MenuProps={MenuProps}
                    >
                    {contacts.map(contact=> (
                        <MenuItem key={contact.id} value={contact.id}>
                        {contact.first_name} {contact.last_name}
                      </MenuItem>
    
                    ))}
                    </Select>
                </FormControl>
                   
                </DialogContent>

                
                <DialogActions>
                    <Button onClick={handleClose} className={classes.cancel}>
                        CANCEL
                    </Button>
                    <Button className={classes.submit} onClick={() => {
                        axios(`http://localhost:3001/api/addAvailableContact/${groupId}`, {
                            method: 'post',
                            data: contactName,
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('token')}`
                              }
                        }).then(function(res) {
                            handleComponent();
                            handleClose();
                        })
                    }} >
                        ADD CONTACT
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}