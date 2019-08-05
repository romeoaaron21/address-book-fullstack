import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

//components
import AddGroup from '../Modal/AddGroup';

//material-ui components
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

//material-ui icons
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import GroupIcon from '@material-ui/icons/Group';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles(theme => ({
    addIcon: {
        backgroundColor: '#833ab4', 
        color: 'white',
    },
    icon: {
        backgroundColor: '#3498db',
    },
    root: {
        flexGrow: 1,
        padding: '10px',
    },
    searchButton: {
        padding: 10,
    },
    searchInput: {
        flex: 1,
    },
    title: {
        padding: '10px', 
        letterSpacing: '3px',
        display:'flex',
        alignItems:'center',
    },
    titleText: {
        paddingRight:'20px', 
        fontWeight:600,
    }    
}));


export default function ContactGroup() {
    const user_id = localStorage.getItem('id');
    const [openGroup, setOpenGroup] = useState(false);
    const [component, setComponent] = useState(true);
    const [groups, setGroups] = useState([])
    const classes = useStyles();

if (component) {
    axios(`http://localhost:3001/api/getGroup/${user_id}`, {
      method: 'get',
    }).then(function (res) {
      setGroups(res.data)
      console.log(res)
    })
    setComponent(false);
}
    
  function handleCloseGroup() {
    setOpenGroup(false);
  }
  function handleComponent() {
    setComponent(true)
  }

    return (
        <React.Fragment>
            <Grid item xs={12} style={{paddingBottom: '50px'}}>
                <Paper className={classes.root} >
                    
                    <Typography className={classes.title} >
                        <span className={classes.titleText}>CONTACT GROUPS</span>
                        <IconButton className={classes.searchButton} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                        <InputBase className={classes.searchInput} placeholder="Search Group Name"/>
                        <Fab size="small" className={classes.addIcon} aria-label="add" >
                            <AddIcon onClick={()=>setOpenGroup(true)}/>
                        </Fab>
                    </Typography>
                    <Divider />

                    <List component="nav">
                    {!component ?
                    Object.keys(groups).map(i => (
                        <React.Fragment>
                    
                        <ListItem button>
                            <ListItemAvatar>
                                <Avatar className={classes.icon}>
                                    <GroupIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={groups[i].name} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon onClick={()=>{
                                        axios(`http://localhost:3001/api/deleteGroup/${groups[i].id}`, {
                                            method: 'delete',
                                          }).then(function (res) {
                                            setComponent(true)
                                            // console.log(res)
                                          })
                                    }}/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />

                        </React.Fragment>
                    ))
                    :
                    null

                    }


                        {/* <ListItem button>
                            <ListItemAvatar>
                                <Avatar className={classes.icon}>
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
                                <Avatar className={classes.icon}>
                                    <GroupIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Sample Group 2" />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem> */}
                    </List>
                </Paper>
            </Grid>

            {openGroup ? <AddGroup openDialog={openGroup} handleClose={handleCloseGroup} handleComponent={handleComponent} /> : <React.Fragment></React.Fragment>}

        </React.Fragment>
        
    )
}