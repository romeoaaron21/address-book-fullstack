import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

//material-ui core
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Person from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';

//material-ui icons
import Close from '@material-ui/icons/Close';
import GroupAdd from '@material-ui/icons/Group';


const useStyles = makeStyles(theme => ({
    cancel: {
        backgroundColor: '#ff5151',
        color: 'white',
        margin: '0 5px',
        padding: '10px 20px'
    },
    closeIcon: {
        float: 'right',
        cursor: 'pointer',
    },
    dialogContent: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft:'20px',
        paddingRight:'10px'
    },
    dialogTitle: {
        backgroundColor: '#833ab4',
        color: 'white',
    },
    icon: {
        fontSize: '32px',
        position: 'absolute',
    },
    searchButton: {
        color: 'black'
    },
    searchInput: {
        color: 'black',
    },
    submit: {
        backgroundColor: '#833ab4',
        color: 'white',
        margin: '0 5px',
        padding: '10px 20px',
    },
}));

export default function SelectAddMembers({ handleClose, openDialog, handleComponent, groupId }) {
    const [component, setComponent] = useState(true);
    const [contacts, setContacts] = useState([]);
    const [contactName, setContactName] = useState([]);
    const [searchVal, setSearchVal] = useState('');

    if (component) {
        axios(`http://localhost:3001/api/getAvailableContact/${groupId}`, {
            method: 'get',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(function (res) {
            console.log(res);
            setContacts(res.data)
        })
        setComponent(false);
    }

    const handleToggle = value => () => {
        const currentIndex = contactName.indexOf(value);
        const newChecked = [...contactName];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setContactName(newChecked);
    };

    let filteredSearch = contacts.filter(res => {
        let fname = res.first_name.toLowerCase().indexOf(searchVal.toLowerCase()) !== -1;
        let lname = res.last_name.toLowerCase().indexOf(searchVal.toLowerCase()) !== -1;
        if (fname) { return fname } else { return lname }
      })

    const classes = useStyles();
    return (
        <React.Fragment>
            <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={'xs'} fullWidth={true}>
                <DialogTitle className={classes.dialogTitle}>
                    <GroupAdd className={classes.icon} />
                    <span style={{ marginLeft: '40px' }}>Add Contacts to Selected Group</span>
                    <Close className={classes.closeIcon} onClick={handleClose} />
                </DialogTitle>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <span style={{ float: 'left', marginLeft: '15px', marginTop: '5px', marginBottom: '10px' }}>
                        <TextField
                            id="standard-search"
                            label="Search Contact Name"
                            type="search"
                            style={{ minWidth: '20vw' }}
                            onChange={e => setSearchVal(e.target.value)}
                        />
                        <SearchIcon style={{ marginTop: '16px', marginRight: '7px', color: 'gray' }} />

                    </span>
                </div>

                {filteredSearch.map(contact => (
                    <React.Fragment>
                        <ListItem className={classes.dialogContent} key={contact.id} role={undefined} button onClick={handleToggle(contact.id)}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={contactName.indexOf(contact.id) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                />
                            </ListItemIcon>
                            <ListItemText>{contact.first_name} {contact.last_name}</ListItemText>
                            <ListItemAvatar>
                                    <Avatar style={{backgroundColor:'#4e61cc'}}>
                                        <Person />
                                    </Avatar>
                            </ListItemAvatar>
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))
                }

                <DialogActions>
                    <Button onClick={handleClose} className={classes.cancel}>
                        CANCEL
                    </Button>
                    <Button className={classes.submit} onClick={() => {
                        axios(`http://localhost:3001/api/addAvailableContact/${groupId}`, {
                            method: 'post',
                            data: contactName,
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('token')}`
                            }
                        }).then(function (res) {
                            handleComponent();
                            handleClose();
                        })
                    }} >
                        ADD CONTACT
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}