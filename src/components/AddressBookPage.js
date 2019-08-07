import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import decode from 'jwt-decode';

//components
import AddContact from './components/Modal/AddContact';
import AddMembers from './components/Modal/AddMembers';
import ContactGroup from './components/AddressBook/ContactGroup';
import EditContact from './components/Modal/EditContact';
import Loader from './components/Loader/Loader';
import NavHeader from './components/AddressBook/NavHeader';
import Toastify from './components/CommonComponents/Toastify'

//material-ui components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Divider from '@material-ui/core/Divider';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//material-ui icons
import AddIcon from '@material-ui/icons/Add';
import ArrowDown from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Visibility';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import GroupIcon from '@material-ui/icons/Group';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';




const useStyles = makeStyles(theme => ({
  action: {
    color: 'white',
  },
  addContactButon: {
    float: 'left',
    marginRight: '25px',
    marginTop: '20px',
    marginBottom: '10px',
  },
  addIcon: {
    float: 'right',
    color: 'white',
  },
  arrow: {
    marginLeft: '5px',
    cursor: 'pointer',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: 'white',
  },
  root: {
    flexGrow: 1,
    overflowX: 'auto',
    width:'100%'
  },
  searchButton: {
    padding: 10,
  },
  searchInput: {
    flex: 1,
  },
  table: {
    minWidth: 700,
  },
  tableTitle: {
    fontWeight:600, 
    fontSize:'0.8rem',
  },
  title: {
    padding: '0 10px',
    letterSpacing: '3px',
    display: 'flex',
    alignItems: 'center'
  },
}));

function createData(first_name, last_name, phone) {
  return { first_name, last_name, phone };
}

const rows = [
  createData('Romeo Aaron', 'Lumibao', '09109xxxxxx'),
  createData('Romeo Aaron', 'Lumibao', '09109xxxxxx'),
  createData('Romeo Aaron', 'Lumibao', '09109xxxxxx'),
  createData('Romeo Aaron', 'Lumibao', '09109xxxxxx'),
  createData('Romeo Aaron', 'Lumibao', '09109xxxxxx'),
  createData('Romeo Aaron', 'Lumibao', '09109xxxxxx'),
  createData('Romeo Aaron', 'Lumibao', '09109xxxxxx'),
  createData('Romeo Aaron', 'Lumibao', '09109xxxxxx'),
];

export default function AddressBook() {
  
   if (localStorage.getItem('token') === null || localStorage.getItem('token').length === 0) {
    window.location.href = '/'
  }

  const user = localStorage.getItem('user');
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openMembers, setOpenMembers] = useState(false);
  const [contactId, setContactId] = useState('');
  const [searchVal, setSearchVal] = useState('');
  const [user_id, setUser_id] = useState(decode(localStorage.getItem('token')).userId);


  const [component, setComponent] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [sortBut, setSortBut] = useState(false);
  const [sortButF, setSortButF] = useState(false);

  const [toastify, setToastify] = useState(false);
  const [toastifyType, setToastifyType] = useState('');

 

  if (component) {
    axios(`http://localhost:3001/api/getContact/${user_id}`, {
      method: 'get',
      // headers: {
      //   'Authorization': `Bearer ${localStorage.getItem('token')}`
      // }
    }).then(function (res) {
      setContacts(res.data)
    })
    setComponent(false);
  }

  function handleCloseMembers() {
    setOpenMembers(false);
  }
  function handleCloseEdit() {
    setOpenEdit(false);
  }
  function handleClose() {
    setOpen(false);
  }
  function handleComponent() {
    setComponent(true)
  }

  let filteredSearch = Object.keys(contacts).filter(function (obj) {
    let fname = contacts[obj].first_name.toLowerCase().indexOf(searchVal.toLowerCase()) !== -1;
    let lname = contacts[obj].last_name.toLowerCase().indexOf(searchVal.toLowerCase()) !== -1;
    if (fname) { return fname } else { return lname }
  })

  const classes = useStyles();
  return (

    <React.Fragment>
      <ToastContainer enableMultiContainer/>
      <NavHeader user={user} />
      {!component?
        
        <Grid container spacing={0} style={{ padding: '50px' }}>
          <ContactGroup setToastify={setToastify} setToastifyType={setToastifyType}/>
          <Grid item xs={12}>
            <Paper className={classes.root}>
              <Typography className={classes.title} >

                <IconButton className={classes.searchButton} aria-label="search">
                  <SearchIcon />
                </IconButton>
                <InputBase className={classes.searchInput} placeholder="Search Contact List" onChange={e => setSearchVal(e.target.value)} />

                <span className={classes.addContactButon}>
                  <Fab size="medium" style={{ backgroundColor: '#833ab4' }} aria-label="add">
                    <AddIcon className={classes.addIcon} onClick={() => setOpen(true)} />
                  </Fab>
                </span>
              </Typography>

              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableTitle}>FIRST NAME {!sortButF ? <ArrowDown className={classes.arrow} onClick={() => {
                      axios(`http://localhost:3001/api/sortContactFname/${user_id}`, {
                        method: 'get',
                      }).then(function (res) {
                        setContacts(res.data)
                        setSortButF(true)
                      })
                    }} /> : <ArrowUpward className={classes.arrow} onClick={() => {
                      axios(`http://localhost:3001/api/sortContactFnameDesc/${user_id}`, {
                        method: 'get',
                      }).then(function (res) {
                        setContacts(res.data)
                        setSortButF(false)
                      })
                    }} />}</TableCell>
                    <TableCell align="right" className={classes.tableTitle}>LAST NAME {!sortBut ? <ArrowDown className={classes.arrow} onClick={() => {
                      axios(`http://localhost:3001/api/sortContactLname/${user_id}`, {
                        method: 'get',
                      }).then(function (res) {
                        setContacts(res.data)
                        setSortBut(true)
                      })
                    }} /> : <ArrowUpward className={classes.arrow} onClick={() => {
                      axios(`http://localhost:3001/api/sortContactLnameDesc/${user_id}`, {
                        method: 'get',
                      }).then(function (res) {
                        setContacts(res.data)
                        setSortBut(false)
                      })
                    }} />}</TableCell>
                    <TableCell align="right" className={classes.tableTitle}>MOBILE NUMBER</TableCell>
                    <TableCell align="right" className={classes.tableTitle}>ACTION </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!component && contacts[0] ?

                    filteredSearch.map(i => (
                      <TableRow key={contacts[i].contact_id}>
                        <TableCell component="th" scope="row">
                          {contacts[i].first_name}
                        </TableCell>
                        <TableCell align="right">{contacts[i].last_name}</TableCell>
                        <TableCell align="right">{contacts[i].mobile_phone}</TableCell>
                        <TableCell align="right">

                          <Fab size="small" onClick={function () {
                            setOpenEdit(true)
                            setContactId(contacts[i].contact_id)
                          }} style={{ backgroundColor: '#874aff' }} className={classes.action}>
                            <EditIcon />
                          </Fab>

                          <Fab size="small" onClick={() => {
                            axios(`http://localhost:3001/api/deleteContact/${contacts[i].contact_id}`, {
                              method: 'delete',
                            }).then(function (res) {
                              setComponent(true);
                              setToastifyType('deleteContact');
                              setToastify(true);
                            })
                          }} style={{ backgroundColor: '#f50057', margin: '0 10px' }} className={classes.action}>
                            <DeleteIcon />
                          </Fab>

                          <Fab size="small" onClick={function () {
                            setOpenMembers(true)
                            setContactId(contacts[i].contact_id)
                          }} style={{ backgroundColor: '#07bc0c' }} className={classes.action}>
                            <GroupAddIcon />
                          </Fab>
                        </TableCell>
                      </TableRow>
                    ))
                    :
                    null
                  }
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
        :
        <React.Fragment>
        <Loader />
        </React.Fragment>
      }

      {toastify? <Toastify setToastify={setToastify} toastifyType={toastifyType}/>:<React.Fragment></React.Fragment>}
      {open ? <AddContact openDialog={open} handleClose={handleClose} handleComponent={handleComponent} setToastify={setToastify} setToastifyType={setToastifyType} /> : <React.Fragment></React.Fragment>}
      {openEdit ? <EditContact openDialog={openEdit} editId={contactId} handleClose={handleCloseEdit} handleComponent={handleComponent} setToastify={setToastify} setToastifyType={setToastifyType} /> : <React.Fragment></React.Fragment>}
      {openMembers ? <AddMembers openDialog={openMembers} handleClose={handleCloseMembers} handleComponent={handleComponent} contactId={contactId} setToastify={setToastify} setToastifyType={setToastifyType}/> : <React.Fragment></React.Fragment>}
    </React.Fragment>
  );
}