import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

//components
import SelectAddMembers from './SelectAddMembers'

//material-ui core
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';



//material-ui icons
import Close from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import GroupAdd from '@material-ui/icons/GroupAdd';
import SearchIcon from '@material-ui/icons/Search';











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
    searchButton: {
      padding: 10,
      color:'white'
    },
    searchInput: {
      width:'30vh',
      color:'white'
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

    const [searchVal, setSearchVal] = useState('');

    function handleCloseSelect() {
      setOpen(false);
    }
    function handleComponentSelect() {
      setComponent(true)
    }


    if (component) {
        axios(`http://localhost:3001/api/getMembers/${groupId}`, {
          method: 'get',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }).then(function (res) {
          setState(res.data.length);
          setContacts(res.data);
        })
        setComponent(false);
    }

    let filteredSearch = contacts.filter(res => {
      let fname = res.first_name.toLowerCase().indexOf(searchVal.toLowerCase()) !== -1;
      let lname = res.last_name.toLowerCase().indexOf(searchVal.toLowerCase()) !== -1;
      if (fname) { return fname } else { return lname }
    })


    const classes = useStyles();
    return (
        <React.Fragment>
            <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={'lg'} fullWidth={true}>
                <DialogTitle className={classes.dialogTitle}>
                    <GroupAdd className={classes.icon} onClick={()=>{setOpen(true)}}/>
                    <span className={classes.addMembers} onClick={()=>{setOpen(true)}}>View List of Members (Click to Add)</span> 
                    <Close className={classes.closeIcon} onClick={handleClose}/>

                    <div style={{float:'right'}}>
                    <IconButton className={classes.searchButton} aria-label="search">
                      <SearchIcon />
                    </IconButton>
                
                    <InputBase className={classes.searchInput} placeholder="Search Contact List" 
                     onChange={e => setSearchVal(e.target.value)} />
                     </div>



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

                  filteredSearch.map(contact => (
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
                                headers: {
                                  'Authorization': `Bearer ${localStorage.getItem('token')}`
                                }
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