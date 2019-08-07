import React from 'react';

import { toast } from 'react-toastify';


export default function Toastify({setToastify, toastifyType}){
   
    return(
        <React.Fragment>
            {
                toastifyType == 'addContact'?
                toast.success(`Successfully added new contact!`, {
                    position: toast.POSITION.TOP_RIGHT
                })
                :
                toastifyType == 'addGroup'?
                toast.success(`Successfully added new contact group!`, {
                    position: toast.POSITION.TOP_RIGHT
                })
                :
                toastifyType == 'editContact'?
                toast.success(`Successfully edited!`, {
                    position: toast.POSITION.TOP_RIGHT
                })
                :
                toastifyType == 'addMember'?
                toast.success(`Successfully added new member!`, {
                    position: toast.POSITION.TOP_RIGHT
                })
                :
                toastifyType == 'deleteGroup'?
                toast.error(`Successfully deleted!`, {
                    position: toast.POSITION.TOP_RIGHT
                })
                :
                toastifyType == 'deleteMember'?
                toast.error(`Successfully deleted contact member!`, {
                    position: toast.POSITION.TOP_RIGHT
                })
                :
                toastifyType == 'deleteContact'?
                toast.error(`Successfully deleted contact!`, {
                    position: toast.POSITION.TOP_RIGHT
                })
                :
                null
            }
            {setToastify(false)}
        </React.Fragment>
    )
}
