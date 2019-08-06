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


export default function AddContact({ handleClose, openDialog, groupId }) {
    const user_id = decode(localStorage.getItem('token')).userId;
    const [state, setState] = useState((''));


    const [component, setComponent] = useState(true);
    const [contacts, setContacts] = useState([]);


    if (component) {
        axios(`http://localhost:3001/api/getMembers/${groupId}`, {
          method: 'get',
        }).then(function (res) {
        console.log(res)
          setContacts(res.data)
        })
        setComponent(false);
      }




    const classes = useStyles();
    return (
        <React.Fragment>
            <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={'lg'} fullWidth={true}>
                <DialogTitle className={classes.dialogTitle}>
                    <GroupAdd className={classes.icon} />
                    <span style={{marginLeft: '40px'}}>View List of Group Members</span> 
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
                {!component?

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
                                // console.log(res)
                              })
                          }} />
                        </Fab>



                      </TableCell>
                    </TableRow>
                  ))
                  :
                  null
                }
              </TableBody>
            </Table>



            







                </DialogContent>

                
                {/* <DialogActions>
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
                        ADD CONTACT
                    </Button>
                </DialogActions> */}
            </Dialog>
        </React.Fragment>
    )
}