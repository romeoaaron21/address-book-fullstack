const express = require('express');
const massive = require('massive');
const users = require('../controllers/users')
const contacts = require('../controllers/contacts')
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
    // app.get('/api/addressBook', contacts.getContact);
})

