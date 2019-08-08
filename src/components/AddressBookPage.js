import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import decode from 'jwt-decode';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//components
import AddContact from './components/Modal/AddContact';
import AddMembers from './components/Modal/AddMembers';
import ContactGroup from './components/AddressBook/ContactGroup';
import EditContact from './components/Modal/EditContact';
import Loader from './components/Loader/Loader';
import NavHeader from './components/AddressBook/NavHeader';
import Toastify from './components/CommonComponents/Toastify'

//material-ui components
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';



//material-ui icons
import AddIcon from '@material-ui/icons/Add';
import ArrowDown from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Visibility';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PersonAdd from '@material-ui/icons/PersonAdd';
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
  noContact: {
    cursor:'pointer', 
    textDecoration:'underline', 
    display:'inline-flex', 
    alignItems:'center',
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
    minWidth: 1100,
  },
  tableTitle: {
    fontWeight:600, 
    fontSize:'0.8rem',
    color: 'black',
  },
  title: {
    padding: '0 10px',
    letterSpacing: '3px',
    display: 'flex',
    alignItems: 'center'
  },
}));

// function createData(first_name, last_name, phone) {
//   return { first_name, last_name, phone };
// }

// const rows = [
//   createData('Romeo Aaron', 'Lumibao', '09109xxxxxx'),
//   createData('Romeo Aaron', 'Lumibao', '09109xxxxxx'),
//   createData('Romeo Aaron', 'Lumibao', '09109xxxxxx'),
//   createData('Romeo Aaron', 'Lumibao', '09109xxxxxx'),
//   createData('Romeo Aaron', 'Lumibao', '09109xxxxxx'),
//   createData('Romeo Aaron', 'Lumibao', '09109xxxxxx'),
//   createData('Romeo Aaron', 'Lumibao', '09109xxxxxx'),
//   createData('Romeo Aaron', 'Lumibao', '09109xxxxxx'),
// ];

export default function AddressBook() {
  
   if (localStorage.getItem('token') === null || localStorage.getItem('token').length === 0) {
    window.location.href = '/'
  }

  const user_id = decode(localStorage.getItem('token')).userId;
  const user = localStorage.getItem('user');
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openMembers, setOpenMembers] = useState(false);
  const [contactId, setContactId] = useState('');
  const [searchVal, setSearchVal] = useState('');
  // const [user_id, setUser_id] = useState(decode(localStorage.getItem('token')).userId);


  const [component, setComponent] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [sortBut, setSortBut] = useState(false);
  const [sortButF, setSortButF] = useState(false);

  const [toastify, setToastify] = useState(false);
  const [toastifyType, setToastifyType] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  if (component) {
    axios(`http://localhost:3001/api/getContact/${user_id}`, {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then(function (res) {
      setContacts(res.data)
    }).catch(()=>{
      axios(`http://localhost:3001/api/getContact/${user_id}`, {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
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


  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }



  const classes = useStyles();
  return (

    <React.Fragment>
      <ToastContainer enableMultiContainer/>
      <NavHeader user={user} />
      {!component && filteredSearch?
        
        <Grid container style={{ padding: '50px' }}>
          <ContactGroup setToastify={setToastify} setToastifyType={setToastifyType}/>
          <Grid item xs={12}>
            <Paper className={classes.root}>
              <Paper className={classes.title} >

                <IconButton className={classes.searchButton} aria-label="search">
                  <SearchIcon />
                </IconButton>
                
                <InputBase className={classes.searchInput} placeholder="Search Contact List" 
                onChange={e => setSearchVal(e.target.value)} 
                />

                <span className={classes.addContactButon}>
                  <Fab size="medium" style={{ backgroundColor: '#833ab4' }} aria-label="add">
                  <Tooltip title="Add New Contact Information" placement="top">
                    <AddIcon className={classes.addIcon} onClick={() => setOpen(true)} />
                  </Tooltip>
                  </Fab>
                </span>
              </Paper>

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
                    <TableCell align="right" className={classes.tableTitle}>EMAIL ADDRESS</TableCell>
                    <TableCell align="right" className={classes.tableTitle}>MOBILE NUMBER</TableCell>
                    <TableCell align="right" className={classes.tableTitle}>ACTION </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!component && filteredSearch[0] ?

                    filteredSearch.map(i => (
                      <TableRow key={contacts[i].contact_id}>
                        <TableCell component="th" scope="row">
                          {contacts[i].first_name}
                        </TableCell>
                        <TableCell align="right">{contacts[i].last_name}</TableCell>
                        <TableCell align="right">{contacts[i].email}</TableCell>
                        <TableCell align="right">{contacts[i].mobile_phone}</TableCell>
                        <TableCell align="right">

                          <Fab size="small" onClick={function () {
                            setOpenEdit(true)
                            setContactId(contacts[i].contact_id)
                          }} style={{ backgroundColor: '#874aff' }} className={classes.action}>
                            <Tooltip title="Edit Contact List" placement="top">
                            <EditIcon />
                            </Tooltip>
                          </Fab>

                          <Fab size="small" onClick={() => {
                            axios(`http://localhost:3001/api/deleteContact/${contacts[i].contact_id}`, {
                              method: 'delete',
                            }).then(function (res) {
                              setComponent(true);
                              setToastifyType('deleteContact');
                              setToastify(true);
                            }).catch(() => {
                              setToastifyType('deleteContactError');
                              setToastify(true);
                            })
                          }} style={{ backgroundColor: '#f50057', margin: '0 10px' }} className={classes.action}>
                            <Tooltip title="Delete Contact List" placement="top">
                            <DeleteIcon />
                            </Tooltip>
                          </Fab>

                          <Fab size="small" onClick={() => {
                            setOpenMembers(true)
                            setContactId(contacts[i].contact_id)
                          }} style={{ backgroundColor: '#07bc0c' }} className={classes.action}>
                            <Tooltip title="Add to Contact Group" placement="top">
                            <GroupAddIcon />
                            </Tooltip>
                          </Fab>
                        </TableCell>
                      </TableRow>
                    ))
                    :
                    <TableRow>
                      <TableCell style={{padding:'15vh', fontWeight:'bolder', fontSize:'1.5rem'}} colSpan={4} align="center">
                        <span onClick={() => setOpen(true)} className={classes.noContact}><PersonAdd fontSize="large" style={{marginRight:'10px'}}/> No Contact List</span>
                      </TableCell>
                    </TableRow>
                    
                  }
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredSearch.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                  'aria-label': 'previous page',
                }}
                nextIconButtonProps={{
                  'aria-label': 'next page',
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
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