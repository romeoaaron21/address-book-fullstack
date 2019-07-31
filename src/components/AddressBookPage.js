// // import React from 'react';
// // import MaterialTable from 'material-table';

// // export default function MaterialTableDemo() {

// //   if(localStorage.getItem('token').length === 0 ) {
// //     window.location.href = '#/'
// //   }

// //   const [state, setState] = React.useState({
// //     columns: [
// //       { title: 'Name', field: 'name' },
// //       { title: 'Surname', field: 'surname' },
// //       { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
// //       {
// //         title: 'Birth Place',
// //         field: 'birthCity',
// //         lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
// //       },
// //     ],
// //     data: [
// //       { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
// //       {
// //         name: 'Zerya Betül',
// //         surname: 'Baran',
// //         birthYear: 2017,
// //         birthCity: 34,
// //       },
// //     ],
// //   });

// //   return (
// //     <React.Fragment>
// //     <MaterialTable
// //       title="Editable Example"
// //       columns={state.columns}
// //       data={state.data}
// //       editable={{
// //         onRowAdd: newData =>
// //           new Promise(resolve => {
// //             setTimeout(() => {
// //               resolve();
// //               const data = [...state.data];
// //               data.push(newData);
// //               setState({ ...state, data });
// //             }, 600);
// //           }),
// //         onRowUpdate: (newData, oldData) =>
// //           new Promise(resolve => {
// //             setTimeout(() => {
// //               resolve();
// //               const data = [...state.data];
// //               data[data.indexOf(oldData)] = newData;
// //               setState({ ...state, data });
// //             }, 600);
// //           }),
// //         onRowDelete: oldData =>
// //           new Promise(resolve => {
// //             setTimeout(() => {
// //               resolve();
// //               const data = [...state.data];
// //               data.splice(data.indexOf(oldData), 1);
// //               setState({ ...state, data });
// //             }, 600);
// //           }),
// //       }}
// //     />
// //     </React.Fragment>
// //   );
// // }



// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// // import Paper from '@material-ui/core/Paper';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
// import LogoutIcon from '@material-ui/icons/ExitToApp';
// import Container from '@material-ui/core/Container';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
// import ViewIcon from '@material-ui/icons/Visibility';
// import TextField from '@material-ui/core/TextField';
// import EditIcon from '@material-ui/icons/Edit';
// import DeleteIcon from '@material-ui/icons/DeleteOutline';
// import Modal from '@material-ui/core/Modal';
// // import { Link } from 'react-router-dom';
  
//   function getModalStyle() {
//     const top = 50;
//     const left = 50;
  
//     return {
//       top: `${top}%`,
//       left: `${left}%`,
//       transform: `translate(-${top}%, -${left}%)`,
//     };
//   }
// const useStyles = makeStyles(theme => ({
//     root: {
//         flexGrow: 1,
//     },
//     menuButton: {
//         marginRight: theme.spacing(2),
//     },
//     editButton: {
//         marginRight: theme.spacing(2),
//         color: "#000000"
//     },
//     title: {
//         flexGrow: 1,
//     },
//     bar: {
//         backgroundColor: "#3e5bff",
//     },
//     tableRoot: {
//         marginTop: "8vh",
//     },
//     paperRoot: {
//         width: '100%',
//         marginTop: theme.spacing(3),
//         overflowX: 'auto',
//     },
//     textField: {
//         width: '100%'
//     },
//     paper: {
//         position: 'absolute',
//         width: '90vh',
//         height: '50vh',
//         backgroundColor: '#ffffff',
//         border: '2px solid #000',
//         boxShadow: theme.shadows[5],
//         padding: '2%',
//         outline: 'none',
//       },
//   }));
// export default function MaterialTableDemo() {


//     if(localStorage.getItem('token').length === 0 ) {
//         window.location.href = '#/'
//     }

//     const classes = useStyles();
//     const [modalStyle] = React.useState(getModalStyle);
//     const [open, setOpen] = React.useState(false);
//     const handleOpen = () => {
//         setOpen(true);
//     };
//     const handleClose = () => {
//         setOpen(false);
//     };
//     function userData(first_name, last_name, phone_number, action) {
//         return {first_name, last_name, phone_number, action};
//       }
      
//       const contact = [
//         userData('Boom', 'Camp', '09123456789',
//         <span>
//             <IconButton  
//             className={classes.menuButton} 
//             color="inherit"
//             onClick={handleOpen}
//             >
//             <ViewIcon />
//             </IconButton> 
//             <IconButton  className={classes.editButton} color="inherit">
//                 <DeleteIcon />
//             </IconButton>
//         </span>
//         ),
//         userData('Ice cream sandwich', 237, 9.0, <IconButton  className={classes.menuButton} color="inherit">
//         <ViewIcon />
//         </IconButton>, 4.3),
//         userData('Eclair', 262, 16.0, <IconButton  className={classes.menuButton} color="inherit">
//         <ViewIcon />
//         </IconButton>, 6.0)
//       ];
//       function createData(name, calories, fat, carbs, protein) {
//         return { name, calories, fat, carbs, protein };
//       }
      
//       const rows = [
//         createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//         createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//         createData('Eclair', 262, 16.0, 24, 6.0),
//         createData('Cupcake', 305, 3.7, 67, 4.3),
//         createData('Gingerbread', 356, 16.0, 49, 3.9),
//       ];
      
//   return (
//     <React.Fragment>
//         <div className={classes.root}>
//         <AppBar position="static" className={classes.bar}>
//             <Toolbar>
//             {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
//                 <MenuIcon />
//             </IconButton> */}
//             <Typography variant="h6" className={classes.title}>
//                 Address Book
//             </Typography>
//             <IconButton  className={classes.menuButton} color="inherit">
//                 <LogoutIcon onClick={()=>{
//                     localStorage.clear()
//                     window.location.href = '#/'
//                   }
//                 } />
//             </IconButton>
//             </Toolbar>
//         </AppBar>
//         </div>
//         <Container className={classes.tableRoot}>
//             <Paper className={classes.paperRoot}>  
//             <Table className={classes.table}>
//                 <TableHead>
//                 <TableRow>
//                     <TableCell colSpan={4}>
//                         <TextField
//                             id="standard-with-placeholder"
//                             label="Search"
//                             placeholder="Search"
//                             className={classes.textField}
//                             margin="dense"
//                         />
//                     </TableCell>
//                 </TableRow>
//                 </TableHead>
//                 <TableHead>
//                 <TableRow>
//                     <TableCell>First Name</TableCell>
//                     <TableCell>Last Name</TableCell>
//                     <TableCell>Phone Number</TableCell>
//                     <TableCell>Action</TableCell>
//                 </TableRow>
//                 </TableHead>
//                 <TableBody>
//                 {contact.map(row => (
//                     <TableRow key={row.name}>
//                     <TableCell component="th" scope="row">
//                         {row.first_name}
//                     </TableCell>
//                     <TableCell>{row.last_name}</TableCell>
//                     <TableCell>{row.phone_number}</TableCell>
//                     <TableCell>{row.action}</TableCell>
//                     </TableRow>
//                 ))}
//                 </TableBody>
//             </Table>
//             </Paper>
//         </Container>
//         <div>
//         <Modal
//             aria-labelledby="simple-modal-title"
//             aria-describedby="simple-modal-description"
//             open={open}
//             onClose={handleClose}
//         >
//             <div style={modalStyle} className={classes.paper}>
//                 <Table className={classes.table}>
//                     <TableHead>
//                     <TableRow>
//                         <TableCell colSpan={3}>
//                         </TableCell>
//                         <TableCell colSpan={1} align="right">
//                             <IconButton  className={classes.editButton} color="inherit">
//                                 <EditIcon />
//                             </IconButton>
//                         </TableCell>
//                     </TableRow>
//                     </TableHead>
//                     <TableHead>
//                     <TableRow>
//                         <TableCell>First Name</TableCell>
//                         <TableCell>Last Name</TableCell>
//                         <TableCell>Phone Number</TableCell>
//                         <TableCell>Action</TableCell>
//                     </TableRow>
//                     </TableHead>
//                     <TableBody>
//                     {rows.map(row => (
//                         <TableRow key={row.name}>
//                         <TableCell component="th" scope="row">
//                             {row.first_name}
//                         </TableCell>
//                         <TableCell>{row.last_name}</TableCell>
//                         <TableCell>{row.phone_number}</TableCell>
//                         <TableCell>{row.action}</TableCell>
//                         </TableRow>
//                     ))}
//                     </TableBody>
//                 </Table>
//             </div>
//         </Modal>
//         </div>
        
//     </React.Fragment>
    
//   );
// }


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
import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import LogoutIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflowX: 'auto'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: 'white',
  },
  title: {
    flexGrow: 1,
  },
  table: {
    // minWidth: 650,
    minHeight: 500, 
  },
  blue: {
    background: 'rgb(9,9,121)',
    background: 'linear-gradient(90deg, rgba(9,9,121,1) 35%, rgba(115,168,179,1) 100%)'
  },
  appBar: {
    }
}));

function createData(name, calories, fat, carbs) {
  return { name, calories, fat, carbs };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function AddressBook() {

    if(localStorage.getItem('token') === null || localStorage.getItem('token').length === 0){
        window.location.href = '#/'
    }

  const [dense, setDense] = useState(false);
  const [secondary, setSecondary] = useState(false);
  const classes = useStyles();

  return (
    <React.Fragment>
    <AppBar position="static" style={{
        backgroundColor: 'rgb(131,58,180)',
        background: 'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)'
    }}>
        <Toolbar>
          <Icon className={classes.menuButton}  color="disabled" fontSize="large">
              assignment_ind
          </Icon>
          <Typography variant="h6" className={classes.title} style={{letterSpacing: '5px'}}>
            ADDRESS BOOK
          </Typography>
          <IconButton className={classes.button} onClick={()=>{
              localStorage.clear()
              window.location.href = '#/'}}>
              <LogoutIcon style={{float: 'right', color: 'white'}} fontSize="large" />
          </IconButton>
        </Toolbar>
    </AppBar>
    <Grid container spacing={5} style={{padding: '50px'}}>
        <Grid item xs={12} md={3}>
        <Paper className={classes.root} style={{padding: '10px'}}>
          <Typography style={{padding: '10px', letterSpacing: '5px'}}>
            GROUPS
          </Typography>
          <Divider/>
            <List component="nav" aria-label="main mailbox folders">
                <ListItem button>
                <ListItemAvatar>
                    <Avatar style={{background: '#833ab4'}}>
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
                    <Avatar style={{background: '#833ab4'}}>
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
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <span style={{float: 'left', marginLeft: '15px', marginTop: '15px', marginBottom: '10px'}}>
              <SearchIcon style={{marginTop: '21px', marginRight: '7px', color: 'gray'}} />
              <TextField
                id="standard-search"
                label="Search field"
                type="search"
                />
            </span> 
            <span style={{float: 'left', marginRight: '25px', marginTop: '20px', marginBottom: '10px'}}>
                <Fab size="medium" style={{backgroundColor: '#fcb045'}} aria-label="add">
                    <AddIcon style={{float: 'right', color: 'white'}}/>
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
              {rows.map(row => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">
                      <Fab size="small" style={{backgroundColor: '#833ab4', color: 'white', marginRight: '10px'}} aria-label="add" className={classes.margin}>
                        <EditIcon />
                      </Fab>
                      <Fab size="small" style={{backgroundColor: '#fd1d1d', color: 'white', marginRight: '10px'}} aria-label="add" className={classes.margin}>
                        <DeleteIcon />
                      </Fab>
                      <Fab size="small" style={{backgroundColor: '#fcb045', color: 'white'}} aria-label="add" className={classes.margin}>
                        <GroupAddIcon />
                      </Fab>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        </Grid>
    </Grid>
    </React.Fragment>
  );
}