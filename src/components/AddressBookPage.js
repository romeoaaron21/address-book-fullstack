import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
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
import GroupIcon from '@material-ui/icons/Group';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Visibility';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import LogoutIcon from '@material-ui/icons/ExitToApp';

import AddContact from './dialog/AddContact';
import EditContact from './dialog/EditContact';
import axios from 'axios';



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: 'white',
  },
  title: {
    flexGrow: 1,
    letterSpacing: '2px',
  },
  table: {
  },
  action: {
    color: 'white',
  }
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
    window.location.href = '#/'
  }
  const user_id = localStorage.getItem('id');
  const user = localStorage.getItem('user');
  const [ open, setOpen ] = useState(false);
  const [ openEdit, setOpenEdit ] = useState(false);
  const [ editId, setEditId ] = useState('');
  const [ search, setSearch ] = useState('');

  const [ component, setComponent ] = useState(true);
  const [ contacts, setContacts ] = useState([]);
 
if(component){
  axios(`http://localhost:3001/api/getContact/${user_id}`, {
      method: 'get',
  }).then(function(res) {
    setContacts(res.data)
  })
  setComponent(false);
}

  function handleCloseEdit() {
    setOpenEdit(false);
  }
  function handleClose() {
    setOpen(false);
  }

  function handleComponent(){
    setComponent(true)
  }

  const classes = useStyles();



  return (
    
    <React.Fragment>
      

      <AppBar position="static" style={{
        backgroundImage: 'linear-gradient(to right, #ff5cff, #f550f8, #ea44f1, #e037ea, #d527e3, #d423e1, #d41edf, #d319dd, #dc24df, #e52de1, #ed36e4, #f63ee6)'
      }}>
        <Toolbar>
          <Icon className={classes.menuButton} color="disabled" fontSize="large">
            account_box
          </Icon>
          <Typography variant="h6" className={classes.title}>
            Welcome {user}!
          </Typography>
          <IconButton className={classes.button} onClick={() => {
            localStorage.clear()
            window.location.href = '#/'
          }}>
            <LogoutIcon style={{ float: 'right', color: 'white' }} fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Grid container spacing={5} style={{ padding: '50px' }}>
        <Grid item xs={12} md={3}>
          <Paper className={classes.root} style={{ padding: '10px' }}>
            <Typography style={{ padding: '10px', letterSpacing: '3px' }}>
              CONTACT GROUPS
          </Typography>
            <Divider />
            <List component="nav" aria-label="main mailbox folders">
              <ListItem button>
                <ListItemAvatar>
                  <Avatar style={{ background: '#833ab4' }}>
                    <GroupIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Sample Group 1" />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemAvatar>
                  <Avatar style={{ background: '#833ab4' }}>
                    <GroupIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Sample Group 2" />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={9}>
          <Paper className={classes.root}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ float: 'left', marginLeft: '15px', marginTop: '15px', marginBottom: '10px' }}>
                <SearchIcon style={{ marginTop: '21px', marginRight: '7px', color: 'gray' }} />
                <TextField
                  id="standard-search"
                  label="Search field"
                  type="search"
                  onChange={e => setSearch(e.target.value)}
                />
              </span>
              <span style={{ float: 'left', marginRight: '25px', marginTop: '20px', marginBottom: '10px' }}>
                <Fab size="medium" style={{ backgroundColor: '#833ab4' }} aria-label="add">
                  <AddIcon style={{ float: 'right', color: 'white' }} onClick={()=>setOpen(true)} />
                </Fab>
              </span>
            </div>
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
                // console.log(contacts)
                // Object.keys(contacts).map(i => console.log(contacts[i].last_name))
                

                Object.keys(contacts).map(i => (
                  <TableRow key={contacts[i].contact_id}>
                     <TableCell component="th" scope="row">
                       {contacts[i].first_name}
                     </TableCell>
                     <TableCell align="right">{contacts[i].last_name}</TableCell>
                     <TableCell align="right">{contacts[i].mobile_phone}</TableCell>
                     <TableCell align="right">


                       <Fab size="small" onClick={function() {
                        setOpenEdit(true)
                        setEditId(contacts[i].contact_id)
                      }
                      } 
                        
                       style={{ backgroundColor: '#874aff' }} className={classes.action}>
                         <EditIcon />
                       </Fab>


                       <Fab size="small" onClick={()=>{
                         axios(`http://localhost:3001/api/deleteContact/${contacts[i].contact_id}`, {
                          method: 'delete',
                          }).then(function(res){
                            setComponent(true)
                            // console.log(res)
                          })
                       }} style={{ backgroundColor: '#f50057',  margin: '0 10px' }} className={classes.action}>
                         <DeleteIcon />
                       </Fab>


                       <Fab size="small" style={{ backgroundColor: '#07bc0c' }} className={classes.action}>
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


      {open ? <AddContact openDialog={open} handleClose={handleClose} handleComponent={handleComponent}/> : <React.Fragment></React.Fragment>}
      {openEdit ? <EditContact openDialog={openEdit} editId={editId} handleClose={handleCloseEdit} handleComponent={handleComponent}/> : <React.Fragment></React.Fragment>}

      
    </React.Fragment>
  );
}