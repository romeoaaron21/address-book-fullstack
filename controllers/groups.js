const jwt = require('jsonwebtoken');
const secret = require('../secret');

function addGroup(req, res) {
    const db = req.app.get('db');
    const { user_id, name } = req.params;
    if(!req.headers.authorization) {
      return res.status(401).end();
    }
    try{
      const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, secret);
  
    db.groups
    .insert({
      user_id, name
    })
    .then(groups=> {
        res.status(201).json({...groups});
    })
    }
    catch(err) {
      res.status(500).end()
    };
}

function getGroup(req, res){
    const db = req.app.get('db');
    const { user_id } = req.params;
    if(!req.headers.authorization) {
      return res.status(401).end();
    }
    try{
      const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, secret);
  
    db.query(`SELECT * FROM groups WHERE user_id=${user_id} ORDER BY name ASC`)
    .then(groups => {
        res.status(200).json([...groups]);
    })
    }
    catch(err) {
      res.status(500).end()
    };
  }

function deleteGroup(req, res){
    const db = req.app.get('db');
    const { group_id } = req.params;
    if(!req.headers.authorization) {
      return res.status(401).end();
    }
    try{
      const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, secret);
  
    db.query(`DELETE FROM groups WHERE id=${group_id}`)
    .then(groups => {
        res.status(200).json({ ...groups});
    }).catch(err => {
      res.status(500).end()
    })
    }
    catch(err) {
      res.status(500).end()
    }
}

function addGroupMembers(req, res){
  const db = req.app.get('db');
  const  groups  = req.body;
  if(!req.headers.authorization) {
    return res.status(401).end();
  }
  try{
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, secret);

    groups.map(group => {
      db.group_members
      .insert({
        contact_id: req.params.contact_id,
        group_id: group
      })
    })
    res.status(201).json('Successfully Added!')
  }
  catch(err) {
    res.status(500).end()
  }
}

function getMembers(req, res){
  const db = req.app.get('db');
  const { group_id } = req.params;
  if(!req.headers.authorization) {
    return res.status(401).end();
  }
  try{
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, secret);

  db.query(`SELECT * FROM contacts, group_members WHERE contacts.id = group_members.contact_id AND group_members.group_id=${group_id} ORDER BY contacts.first_name ASC`)
  .then(members => {
      res.status(200).json([...members]);
  })
  }
  catch(err) {
    res.status(500).end()
  };

}


function deleteMember(req, res){
  const db = req.app.get('db');
  const { contact_id, group_id } = req.params
  if(!req.headers.authorization) {
    return res.status(401).end();
  }
  try{
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, secret);

  db.query(`DELETE FROM group_members USING groups WHERE group_members.group_id=groups.id AND group_members.contact_id=${contact_id} AND group_members.group_id=${group_id}`)
  .then(members => {
      res.status(200).json([...members]);
  })
  }
  catch(err) {
    res.status(500).end()
  };

}

function selectGroup(req, res){
  const db = req.app.get('db');
  const { user_id, contact_id } = req.params
  if(!req.headers.authorization) {
    return res.status(401).end();
  }
  try{
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, secret);

  db.query(`SELECT groups.* FROM groups WHERE user_id=${user_id} AND id NOT IN(SELECT group_id from group_members WHERE contact_id=${contact_id})`)
  .then(groups => {
      res.status(200).json([...groups])
  })
  }
  catch(err) {
    res.status(500).end()
  };
}

function getAvailableContact(req, res){
  const db = req.app.get('db')
  const { group_id } = req.params;
  if(!req.headers.authorization) {
    return res.status(401).end();
  }
  try{
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, secret);

  db.query(`SELECT contacts.* FROM contacts WHERE id NOT IN(SELECT contact_id from group_members, groups WHERE groups.id = group_members.group_id AND groups.id = ${group_id})`)
  .then(contacts => {
      res.status(200).json([...contacts])
  })
  }
  catch(err) {
    res.status(500).end()
  };
}

function addAvailableContact(req, res) {
  const db = req.app.get('db')
  const { group_id } = req.params;
  const contacts = req.body;
  if(!req.headers.authorization) {
    return res.status(401).end();
  }
  try{
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, secret);

  contacts.map(contact => {
    db.group_members
    .insert({
      contact_id: contact,
      group_id: group_id
    })
  })
  res.status(201).json('Successfully Added!')
  }
  catch(err) {
    res.status(500).end()
  };
}

function editGroupName(req, res){
  const db = req.app.get('db');
  const { group_id, group_name } = req.params;
  if(!req.headers.authorization) {
    return res.status(401).end();
  }
  try{
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, secret);

  db.groups
    .update({id:group_id}, {name:group_name})
    .then(group => res.status(200).json(group))
    .catch(err => {
        console.error(err);
        res.status(500).end()
  })
  }
  catch(err) {
    res.status(500).end()
  };
}



module.exports = {
    addGroup,
    getGroup,
    deleteGroup,
    addGroupMembers,
    getMembers,
    deleteMember,
    selectGroup,
    getAvailableContact,
    addAvailableContact,
    editGroupName,
}



















