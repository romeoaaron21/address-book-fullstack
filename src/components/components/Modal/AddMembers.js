import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
import GroupAdd from '@material-ui/icons/Group';


import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';



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

export default function AddMembers({ handleClose, openDialog, handleComponent, contactId, setToastify, setToastifyType }) {
    const user_id = decode(localStorage.getItem('token')).userId;
    const [component, setComponent] = useState(true);
    const [groups, setGroups] = useState([]);
    const [groupName, setGroupName] = useState([]);


    if (component) {
        axios(`http://localhost:3001/api/selectGroup/${user_id}/${contactId}`, {
          method: 'get',
        }).then(function (res) {
            console.log(res)
          setGroups(res.data)
        })
        setComponent(false);
        
    }

    const classes = useStyles();
    return (
        <React.Fragment>
            <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={'xs'} fullWidth={true}>
                <DialogTitle className={classes.dialogTitle}>
                    <GroupAdd className={classes.icon} />
                    <span style={{marginLeft: '40px'}}>Add Contact to Selected Group</span> 
                    <Close className={classes.closeIcon} onClick={handleClose}/>
                </DialogTitle>

                <DialogContent className={classes.dialogContent}>

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="select-multiple-checkbox">Select Contact Group/s</InputLabel>
                    <Select
                    multiple
                    style={{width:'40vh'}}
                    value={groupName}
                    onChange={e=>setGroupName(e.target.value)}
                    MenuProps={MenuProps}
                    >
                    {groups.map(group=> (
                        <MenuItem key={group.id} value={group.id}>
                        {group.name}
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
                        axios(`http://localhost:3001/api/addGroupMembers/${contactId}`, {
                            method: 'post',
                            data: groupName,
                        }).then(function(res) {
                            handleComponent();
                            handleClose();
                            setToastifyType('addMember');
                            setToastify(true)
                        }).catch(() => {
                            setToastifyType('addMemberError');
                            setToastify(true)
                        })
                    }}
                    >
                        ADD CONTACT
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}