const express = require('express');
const massive = require('massive');
const users = require('../controllers/users')
const contacts = require('../controllers/contacts')
const groups = require('../controllers/groups')
const cors = require("cors");



massive({
    host: 'localhost',
    port: 5432,
    database: 'abookdb',
    user: 'postgres',
    password: 'abookdb',
})
.then(db => {
    const PORT = 3001;
    const app = express();

    app.set('db', db);
    app.use(express.json());
    app.use(cors());

    app.listen(PORT, () => {
        console.log(`Running on port ${PORT}`)
    })

    app.post('/api/register', users.register);
    app.post('/api/login', users.login);

    app.post('/api/addContact', contacts.addContact);
    app.get('/api/getContact/:user_id', contacts.getContact);
    app.delete('/api/deleteContact/:contacts_id', contacts.deleteContact);
    app.get('/api/getContactInfo/:contacts_id', contacts.getContactInfo)
    app.patch('/api/editContact/:contacts_id', contacts.editContact)
    app.get('/api/sortContactFname/:user_id', contacts.fnameContact)
    app.get('/api/sortContactLname/:user_id', contacts.lnameContact)
    app.get('/api/sortContactFnameDesc/:user_id', contacts.fnameContactDesc)
    app.get('/api/sortContactLnameDesc/:user_id', contacts.lnameContactDesc)

    app.post('/api/addGroup/:user_id/:name', groups.addGroup)
    app.get('/api/getGroup/:user_id', groups.getGroup)
    app.delete('/api/deleteGroup/:group_id', groups.deleteGroup)
    app.post('/api/addGroupMembers/:contact_id', groups.addGroupMembers)
    app.get('/api/getMembers/:group_id', groups.getMembers)
    app.delete('/api/deleteMember/:contact_id/:group_id', groups.deleteMember)
    app.get('/api/selectGroup/:user_id/:contact_id', groups.selectGroup)
})