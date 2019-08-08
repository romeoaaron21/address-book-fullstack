import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

//components
import SelectAddMembers from './SelectAddMembers'

//material-ui core
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PersonAdd from '@material-ui/icons/PersonAdd';


//material-ui icons
import Close from '@material-ui/icons/Close';
import GroupAdd from '@material-ui/icons/GroupAdd';




import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/DeleteForever';





const useStyles = makeStyles(theme => ({
    action: {
        color: 'white',
    },
    addMembers: {
        cursor:'pointer',
        marginLeft: '40px',
    },
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
        float:'right', 
        cursor:'pointer',
    },
    noContact: {
      cursor:'pointer', 
      display:'inline-flex', 
      alignItems:'center',
    },
    submit: {
        backgroundColor: '#833ab4', 
        color: 'white', 
        margin: '0 5px', 
        padding: '10px 20px',
    },
}));


export default function AddContact({ handleClose, openDialog, groupId, setToastify, setToastifyType }) {
    const [state, setState] = useState((''));

    const [open, setOpen] = useState(false);


    const [component, setComponent] = useState(true);
    const [contacts, setContacts] = useState([]);

    function handleCloseSelect() {
      setOpen(false);
    }
    function handleComponentSelect() {
      setComponent(true)
    }


    if (component) {
        axios(`http://localhost:3001/api/getMembers/${groupId}`, {
          method: 'get',
        }).then(function (res) {
          setState(res.data.length);
          setContacts(res.data);
        })
        setComponent(false);
    }




    const classes = useStyles();
    return (
        <React.Fragment>
            <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={'lg'} fullWidth={true}>
                <DialogTitle className={classes.dialogTitle}>
                    <GroupAdd className={classes.icon} onClick={()=>{setOpen(true)}}/>
                    <span className={classes.addMembers} onClick={()=>{setOpen(true)}}>View List of Members (Click to Add)</span> 
                    <Close className={classes.closeIcon} onClick={handleClose}/>
                </DialogTitle>

                <DialogContent className={classes.dialogContent}>

                <Table className={classes.table}>
               <TableHead>
                 <TableRow>
                   <TableCell>FIRST NAME</TableCell>
                  <TableCell align="right">LAST NAME</TableCell>
                  <TableCell align="right">MOBILE NUMBER</TableCell>
                  <TableCell align="right">ACTION </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!component && state!==0?

                  contacts.map(contact => (
                    <TableRow key={contact.id}>
                      <TableCell component="th" scope="row">
                        {contact.first_name}
                      </TableCell>
                      <TableCell align="right">{contact.last_name}</TableCell>
                      <TableCell align="right">{contact.mobile_phone}</TableCell>
                      <TableCell align="right">


                        <Fab size="small" style={{ backgroundColor: '#f50057', margin: '0 10px' }} className={classes.action}>
                          <DeleteIcon onClick={()=> {
                              axios(`http://localhost:3001/api/deleteMember/${contact.contact_id}/${contact.group_id}`, {
                                method: 'delete',
                              }).then(function (res) {
                                setComponent(true)
                                setToastifyType('deleteMember');
                                setToastify(true);
                                // console.log(res)
                              }).catch(() => {
                                setToastifyType('deleteMemberError');
                                setToastify(true);
                              })
                          }} />
                        </Fab>



                      </TableCell>
                    </TableRow>
                  ))
                  :
                    <TableRow>
                      <TableCell style={{padding:'10vh', fontWeight:'bolder', fontSize:'1.5rem'}} colSpan={4} align="center">
                        <span className={classes.noContact} onClick={()=>{setOpen(true)}}><PersonAdd fontSize="large" style={{marginRight:'10px'}}/> No Member List</span>
                      </TableCell>
                    </TableRow>
                }
              </TableBody>
            </Table>

                </DialogContent>

            </Dialog>



            {open ? <SelectAddMembers openDialog={open} handleClose={handleCloseSelect} handleComponent={handleComponentSelect} groupId={groupId} /> : <React.Fragment></React.Fragment>}
        </React.Fragment>
    )
}