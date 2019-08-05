const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const secret = require('../secret');

function addGroup(req, res) {
    const db = req.app.get('db');
    const { user_id, name } = req.params;
  
    db.groups
    .insert({
      user_id, name
    })
    .then(groups=> {
        res.status(201).json({...groups});
    })
    .catch(err => {
        console.error(err);
    });
}

function getGroup(req, res){
    const db = req.app.get('db');
    const { user_id } = req.params;
  
    db.query(`SELECT * FROM groups WHERE user_id=${user_id} ORDER BY name ASC`)
    .then(groups => {
        res.status(200).json([...groups]);
    })
    .catch(err => {
      res.status(500).end()
    });
  }

function deleteGroup(req, res){
    const db = req.app.get('db');
    const { group_id } = req.params;
    console.log(group_id)
  
    db.query(`DELETE FROM groups WHERE id=${group_id}`)
    .then(groups => {
        res.status(200).json({ ...groups});
    })
    .catch(err => {
      res.status(500).end()
    });
}

function addGroupMembers(req, res){
  const db = req.app.get('db');
  const  groups  = req.body;
  
  groups.map(group => {
    db.group_members
    .insert({
      contact_id: req.params.contact_id,
      group_id: group
    })
  })
  res.status(201).json('Successfully Added!')
}

function getMembers(req, res){
  const db = req.app.get('db');
  const { group_id } = req.params

  db.query(`SELECT * FROM contacts, group_members WHERE contacts.id = group_members.contact_id AND group_members.group_id=${group_id} ORDER BY contacts.first_name ASC`)
  .then(members => {
      res.status(200).json([...members]);
  })
  .catch(err => {
    res.status(500).end()
  });

}


function deleteMember(req, res){
  const db = req.app.get('db');
  const { contact_id, group_id } = req.params

  db.query(`DELETE FROM group_members USING groups WHERE group_members.group_id=groups.id AND group_members.contact_id=${contact_id} AND group_members.group_id=${group_id}`)
  .then(members => {
      res.status(200).json([...members]);
  })
  .catch(err => {
    res.status(500).end()
  });

}


module.exports = {
    addGroup,
    getGroup,
    deleteGroup,
    addGroupMembers,
    getMembers,
    deleteMember,
}



















