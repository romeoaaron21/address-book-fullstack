const jwt = require('jsonwebtoken');
const secret = require('../secret');


function addContact(req, res) {
  const db = req.app.get('db');
  const { first_name, last_name, city, country, email, home_phone, mobile_phone, work_phone, postal_code, state, user_id } = req.body;
  if(!req.headers.authorization) {
    return res.status(401).end();
  }
  try{
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, secret);
  db.contacts
  .insert({
    first_name, last_name, home_phone, mobile_phone, work_phone, email, city, state, postal_code, country
  })
  .then(function(contact) {
    const contact_id = contact.id
    db.addressbook
      .insert({
          user_id, contact_id
      })
      res.status(201).json({ ...contact});
  })
  }
  catch(err) {
    res.status(500).end()
  };
}


function getContact(req, res){
  const db = req.app.get('db');
  const { user_id } = req.params;
  if(!req.headers.authorization) {
    return res.status(401).end();
  }
  try{
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, secret);

  db.query(`SELECT * FROM contacts, addressbook WHERE addressbook.contact_id = contacts.id AND addressbook.user_id = ${user_id} ORDER BY contacts.first_name ASC`)
  .then(contacts => {
      res.status(201).json({ ...contacts});
  })
  }
  catch(err) {
    res.status(500).end()
  };
}

function deleteContact(req, res){
  const db = req.app.get('db');
  const { contacts_id } = req.params;
  if(!req.headers.authorization) {
    return res.status(401).end();
  }
  try{
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, secret);

  db.query(`DELETE FROM addressbook WHERE contact_id=${contacts_id}`)
  .then(() => {
    db.query(`DELETE FROM group_members WHERE contact_id=${contacts_id}`)
  }).then(() => {
    db.query(`DELETE FROM contacts WHERE id=${contacts_id}`)
  }).then(response => {
    res.status(200).json(response);
  }).catch(err => {
    res.status(500).end()
  });
  }
  catch(err) {
    res.status(500).end()
  };
}

function getContactInfo(req, res){
  const db = req.app.get('db');
  const { contacts_id } = req.params;
  if(!req.headers.authorization) {
    return res.status(401).end();
  }
  try{
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, secret);

  db.query(`SELECT * FROM contacts WHERE id = ${contacts_id}`)
  .then(contacts => {
    res.status(201).json({ ...contacts});
  })
  }
  catch(err) {
    res.status(500).end()
  };
}

function editContact(req, res){
  const db = req.app.get('db');
  const { first_name, last_name, home_phone, mobile_phone, work_phone, postal_code, email, city, country, state } = req.body;
  if(!req.headers.authorization) {
    return res.status(401).end();
  }
  try{
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, secret);

  db.contacts
    .update({id:req.params.contacts_id}, {first_name:first_name, last_name:last_name, home_phone:home_phone, mobile_phone:mobile_phone, work_phone:work_phone, postal_code:postal_code, email:email, city:city, country:country, state:state})
    .then(contacts => res.status(200).json(contacts))
  }
  catch(err) {
        res.status(500).end()
    }
}

function fnameContact(req, res){
  const db = req.app.get('db');
  const { user_id } = req.params;
  if(!req.headers.authorization) {
    return res.status(401).end();
  }
  try{
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, secret);

  db.query(`SELECT * FROM contacts, addressbook WHERE addressbook.contact_id = contacts.id AND addressbook.user_id = ${user_id} ORDER BY contacts.first_name ASC`)
  .then(contacts => {
      res.status(200).json({ ...contacts});
  })
  }
  catch(err) {
    res.status(500).end()
  };
}

function fnameContactDesc(req, res){
  const db = req.app.get('db');
  const { user_id } = req.params;
  if(!req.headers.authorization) {
    return res.status(401).end();
  }
  try{
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, secret);

  db.query(`SELECT * FROM contacts, addressbook WHERE addressbook.contact_id = contacts.id AND addressbook.user_id = ${user_id} ORDER BY contacts.first_name DESC`)
  .then(contacts => {
      res.status(200).json({ ...contacts});
  })
  }
  catch(err) {
    res.status(500).end()
  };
}

function lnameContact(req, res){
  const db = req.app.get('db');
  const { user_id } = req.params;
  if(!req.headers.authorization) {
    return res.status(401).end();
  }
  try{
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, secret);

  db.query(`SELECT * FROM contacts, addressbook WHERE addressbook.contact_id = contacts.id AND addressbook.user_id = ${user_id} ORDER BY contacts.last_name ASC`)
  .then(contacts => {
      res.status(200).json({ ...contacts});
  })
  }
  catch(err) {
    res.status(500).end()
  };
}

function lnameContactDesc(req, res){
  const db = req.app.get('db');
  const { user_id } = req.params;
  if(!req.headers.authorization) {
    return res.status(401).end();
  }
  try{
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, secret);

  db.query(`SELECT * FROM contacts, addressbook WHERE addressbook.contact_id = contacts.id AND addressbook.user_id = ${user_id} ORDER BY contacts.last_name DESC`)
  .then(contacts => {
      res.status(200).json({ ...contacts});
  })
  }catch(err) {
    res.status(500).end()
  };
}

module.exports = {
    addContact,
    getContact,
    deleteContact,
    getContactInfo,
    editContact,
    fnameContact,
    lnameContact,
    fnameContactDesc,
    lnameContactDesc,
}
