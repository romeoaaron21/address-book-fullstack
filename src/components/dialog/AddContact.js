import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import axios from 'axios';



export default function AddContact({handleClose, openDialog}) {
    const id = localStorage.getItem('id');
    const [ state, setState ] = useState({
        first_name:'',
        last_name:'',
        home_phone:'',
        mobile_phone:'',
        work_phone:'',
        postal_code:'',
        email:'',
        city:'',
        country:'',
        state:'',
        user_id: id,
    })

    const updateState = e => {
        setState({
          ...state,
          [e.target.name]: e.target.value
        });
      };


    return (
        <React.Fragment>
            <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={'md'} fullWidth={true}>
                <DialogTitle id="form-dialog-title">Add New Contact to Address Book</DialogTitle>

                <DialogContent style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <TextField
                        style={{ width: '31%' }}
                        required
                        autoFocus
                        margin="dense"
                        label="First Name"
                        type="text"
                        variant="outlined"
                        name="first_name"
                        onChange={updateState}
                    />
                    <TextField
                        style={{ width: '31%' }}
                        autoFocus
                        margin="dense"
                        label="Last Name"
                        type="text"
                        variant="outlined"
                        name="last_name"
                        onChange={updateState}
                    />
                    <TextField
                        style={{ width: '34%' }}
                        autoFocus
                        margin="dense"
                        label="Email Address"
                        type="text"
                        variant="outlined"
                        name="email"
                        onChange={updateState}
                    />
                </DialogContent>

                <DialogContent style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <TextField
                        style={{ width: '27%' }}
                        autoFocus
                        margin="dense"
                        label="Home Phone"
                        type="text"
                        variant="outlined"
                        name="home_phone"
                        onChange={updateState}
                    />
                    <TextField
                        style={{ width: '27%' }}
                        autoFocus
                        margin="dense"
                        label="Mobile Phone"
                        type="text"
                        variant="outlined"
                        name="mobile_phone"
                        onChange={updateState}
                    />
                    <TextField
                        style={{ width: '27%' }}
                        autoFocus
                        margin="dense"
                        label="Work Phone"
                        type="text"
                        variant="outlined"
                        name="work_phone"
                        onChange={updateState}
                    />
                    <TextField
                        style={{ width: '15%' }}
                        autoFocus
                        margin="dense"
                        label="Postal Code"
                        type="text"
                        variant="outlined"
                        name="postal_code"
                        onChange={updateState}
                    />
                </DialogContent>

                <DialogContent style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <TextField
                        style={{ width: '31%' }}
                        required
                        autoFocus
                        margin="dense"
                        label="City"
                        type="text"
                        variant="outlined"
                        name="city"
                        onChange={updateState}
                    />
                    <TextField
                        style={{ width: '31%' }}
                        autoFocus
                        margin="dense"
                        label="State / Province"
                        type="text"
                        variant="outlined"
                        name="state"
                        onChange={updateState}
                    />
                    <TextField
                        style={{ width: '34%' }}
                        autoFocus
                        margin="dense"
                        label="Country"
                        type="text"
                        variant="outlined"
                        name="country"
                        onChange={updateState}
                    />
                </DialogContent>


                <DialogActions>
                    <Button onClick={handleClose} style={{ backgroundColor: '#ff5151', color: 'white', margin: '15px 0', padding: '10px 30px' }}>
                        Cancel
          </Button>
                    <Button style={{ backgroundColor: '#833ab4', color: 'white', margin: '15px', padding: '10px 30px' }} onClick={() => {
                        axios('http://localhost:3001/api/addContact', {
                                    method: 'post',
                                    data: state,
                                }).then(function(res){
                                    console.log(res);
                                    window.location.reload();
                                    // window.location.href=window.location.href
                                    // setToken(res.data.token)
                                    // window.location.href = '#/addressBook';
                                })
                                }}>
                        Add Contact
          </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}