function addContact(req, res) {
  const db = req.app.get('db');
  const { first_name, last_name, city, country, email, home_phone, mobile_phone, work_phone, postal_code, state, user_id } = req.body;

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
  .catch(err => {
      console.error(err);
  });
}


// function getContact(req, res){
//   const db = req.app.get('db');
//   const { user } = req.body;
//   console.log(req.body)

//   db.query(`SELECT * FROM contacts, addressbook WHERE addressbook.contact_id = contacts.id AND addressbook.user_id = ${user}`)
//   .then(contacts => {
//       res.status(201).json({ ...contacts});
//   })
//   .catch(err => {
//       console.error(err);
//   });

// }

module.exports = {
    addContact,
    // getContact,
}



















