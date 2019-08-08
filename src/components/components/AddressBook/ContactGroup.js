import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import decode from 'jwt-decode';

//components
import AddGroup from '../Modal/AddGroup';
import ViewMembers from '../Modal/ViewMembers';

//material-ui components
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
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
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

//material-ui icons
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import Edit from '@material-ui/icons/Edit';
import GroupIcon from '@material-ui/icons/Group';
import IconButton from '@material-ui/core/IconButton';
import GroupAdd from '@material-ui/icons/GroupAdd';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles(theme => ({
    addIcon: {
        backgroundColor: '#833ab4', 
        color: 'white',
    },
    cancel: {
        backgroundColor: '#ff5151', 
        color: 'white', 
        margin: '15px 0', 
        padding: '7px 30px'
    },
    icon: {
        backgroundColor: '#3498db',
    },
    groupNameEdit: {
        display:'inline-flex', 
        alignItems:'center', 
        padding:'0 20px 0 16px', 
        boxSizing:'border-box',
    },
    noGroup: {
        display:'inline-flex', 
        alignItems:'center',
        fontWeight:'bolder', 
        fontSize:'1.5rem',
        cursor:'pointer', 
        textDecoration:'underline', 
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
    submit: {
        backgroundColor: '#833ab4', 
        color: 'white', 
        margin: '15px', 
        padding: '7px 30px',
    },
    title: {
        padding: '10px', 
        letterSpacing: '3px',
        display:'flex',
        alignItems:'center',
    },
    titleText: {
        paddingRight:'20px', 
        fontWeight:800,
    }    
}));


export default function ContactGroup({setToastify, setToastifyType}) {
    const user_id = decode(localStorage.getItem('token')).userId;
    const [openGroup, setOpenGroup] = useState(false);
    const [openMembers, setOpenMembers] = useState(false);
    const [component, setComponent] = useState(true);
    const [groups, setGroups] = useState([]);
    const [groupId, setGroupId] = useState('');
    const [searchVal, setSearchVal] = useState('');
    const [editId, setEditId] = useState('');
    const [editName, setEditName] = useState(false);
    const [groupName, setGroupName] = useState('');
    const classes = useStyles();

if (component) {
    axios(`http://localhost:3001/api/getGroup/${user_id}`, {
      method: 'get',
    }).then(function (res) {
      setGroups(res.data)
    })
    setComponent(false);
}

  function handleCloseMembers() {
    setOpenMembers(false);
  }
  function handleCloseGroup() {
    setOpenGroup(false);
  }
  function handleComponent() {
    setComponent(true)
  }

  function changeGroupName(e){
      e.preventDefault();

      axios(`http://localhost:3001/api/editGroupName/${editId}/${groupName}`, {
        method: 'patch',
        }).then(function(res){
            setComponent(true)
            setEditName(false)
            setToastifyType('editGroupName');
            setToastify(true);
        })
        .catch(() => {
            setToastifyType('editGroupNameError');
            setToastify(true);
        })
  }

  let filteredSearch = Object.keys(groups).filter(function (obj) {
    return groups[obj].name.toLowerCase().indexOf(searchVal.toLowerCase()) !== -1;
  })

    return (
        <React.Fragment>
            <Grid item xs={12} style={{paddingBottom: '50px'}}>
                <Paper className={classes.root} >
                    
                    <Paper className={classes.title} >
                        <span className={classes.titleText}>CONTACT GROUPS</span>

                        <IconButton className={classes.searchButton} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                        <InputBase className={classes.searchInput} onChange={e=>setSearchVal(e.target.value)} placeholder="Search Group Name"/>

                        
                        <Fab size="small" className={classes.addIcon} aria-label="add" >
                            <Tooltip title="Add New Contact Group" placement="top">
                                <AddIcon onClick={()=>setOpenGroup(true)}/>
                            </Tooltip>
                        </Fab>
                    </Paper>
                    <Divider />

                    <List component="nav">
                    {!component && groups[0]?
                    filteredSearch.map(i => (
                        <React.Fragment key={groups[i].id}>
                    
                       
                            {editName && editId === groups[i].id?
                            <Grid container className={classes.groupNameEdit}>
                                <ListItemAvatar>
                                    <Avatar className={classes.icon}>
                                        <GroupIcon />
                                    </Avatar>
                                </ListItemAvatar>

                                <Grid item xs={12} sm={9}>
                                    <TextField
                                        defaultValue={groups[i].name}
                                        fullWidth
                                        id="outlined-name"
                                        label="Group Name"
                                        margin="dense"
                                        variant="outlined"
                                        onClick={e=>{e.stopPropagation()}}
                                        onChange={(e)=>{setGroupName(e.target.value)}}
                                    />
                                </Grid>

                                <DialogActions>
                                    <Button className={classes.cancel} onClick={()=>{
                                        setGroupName('')
                                        setEditName(false)
                                    }}>
                                        Cancel
                                    </Button>
                                    <Button className={classes.submit} onClick={(e)=>{changeGroupName(e)}}>
                                        Edit Group Name
                                    </Button>
                                </DialogActions>

                            </Grid>

                            :
                            <React.Fragment>
                                 <ListItem button onClick={(e)=>{
                                    setOpenMembers(true)
                                    setGroupId(groups[i].id)}
                                    }>
                                    <ListItemAvatar>
                                        <Avatar className={classes.icon}>
                                            <GroupIcon />
                                        </Avatar>
                                    </ListItemAvatar>

                                <ListItemText primary={groups[i].name} />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="edit" onClick={(e)=>{
                                        e.stopPropagation();
                                        setGroupName(groups[i].name)
                                        setEditId(groups[i].id)
                                        setEditName(true)}}
                                    >
                                        <Tooltip title="Edit Group Name" placement="top">
                                            <Edit />
                                        </Tooltip>
                                    </IconButton>

                                    <IconButton edge="end" aria-label="delete" onClick={()=>{
                                            axios(`http://localhost:3001/api/deleteGroup/${groups[i].id}`, {
                                                method: 'delete',
                                            }).then(function (res) {
                                                setComponent(true)
                                                setToastifyType('deleteGroup');
                                                setToastify(true);
                                            }).catch(()=>{
                                                setToastifyType('deleteGroupError');
                                                setToastify(true);
                                            })
                                        }}>
                                        <Tooltip title="Delete Group" placement="top">
                                            <DeleteIcon />
                                        </Tooltip>
                                    </IconButton>
                                </ListItemSecondaryAction>
                                </ListItem>
                                <Divider />
                                
                            </React.Fragment>
                            }



                            
                        

                        </React.Fragment>
                    ))
                    :
                    <React.Fragment>
                            <ListItem>
                                <ListItemText style={{display:'flex', justifyContent:'center', padding:'5vh'}}>
                                    <span className={classes.noGroup} onClick={()=>setOpenGroup(true)}>
                                        <GroupAdd fontSize="large" style={{marginRight:'10px'}}/>No Contact Group
                                    </span>
                                </ListItemText>
                            </ListItem>
                    </React.Fragment>       
                    }
                    </List>
                </Paper>
            </Grid>

            {openGroup ? <AddGroup openDialog={openGroup} handleClose={handleCloseGroup} handleComponent={handleComponent} setToastify={setToastify} setToastifyType={setToastifyType} /> : <React.Fragment></React.Fragment>}
            {openMembers? <ViewMembers openDialog={openMembers} groupId={groupId} handleClose={handleCloseMembers} handleComponent={handleComponent} setToastify={setToastify} setToastifyType={setToastifyType} /> : <React.Fragment></React.Fragment>}

        </React.Fragment>
        
    )
}