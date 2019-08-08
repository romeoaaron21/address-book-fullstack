import React from 'react';

import { toast } from 'react-toastify';


export default function Toastify({setToastify, toastifyType}){
   
    return(
        <React.Fragment>
            {
                toastifyType === 'addContact'?
                toast.success(`Successfully added new contact!`, {
                    position: toast.POSITION.TOP_RIGHT
                })
                :
                toastifyType === 'addGroup'?
                toast.success(`Successfully added new contact group!`, {
                    position: toast.POSITION.TOP_RIGHT
                })
                :
                toastifyType === 'editContact'?
                toast.success(`Successfully edited!`, {
                    position: toast.POSITION.TOP_RIGHT
                })
                :
                toastifyType === 'addMember'?
                toast.success(`Successfully added new member!`, {
                    position: toast.POSITION.TOP_RIGHT
                })
                :
                toastifyType === 'deleteGroup'?
                toast.success(`Successfully deleted!`, {
                    position: toast.POSITION.TOP_RIGHT
                })
                :
                toastifyType === 'deleteMember'?
                toast.success(`Successfully deleted contact member!`, {
                    position: toast.POSITION.TOP_RIGHT
                })
                :
                toastifyType === 'deleteContact'?
                toast.success(`Successfully deleted contact!`, {
                    position: toast.POSITION.TOP_RIGHT
                })
                :

                
                toastifyType === 'addContactError'?
                toast.error(`Failed to add new contact!`, {
                    position: toast.POSITION.TOP_RIGHT
                })
                :
                toastifyType === 'addGroupError'?
                toast.error(`Failed to add new contact group!`, {
                    position: toast.POSITION.TOP_RIGHT
                })
                :
                toastifyType === 'editContactError'?
                toast.error(`Failed to edit contact information!`, {
                    position: toast.POSITION.TOP_RIGHT
                })
                :
                toastifyType === 'addMemberError'?
                toast.error(`Failed to add new member!`, {
                    position: toast.POSITION.TOP_RIGHT
                })
                :
                toastifyType === 'deleteGroupError'?
                toast.error(`Failed to delete group. Remove all members first!`, {
                    position: toast.POSITION.TOP_RIGHT
                })
                :
                toastifyType === 'deleteMemberError'?
                toast.error(`Failed to deleted contact member!`, {
                    position: toast.POSITION.TOP_RIGHT
                })
                :
                toastifyType === 'deleteContactError'?
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
