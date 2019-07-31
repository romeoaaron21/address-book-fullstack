const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const secret = require('../secret');

function register(req, res) {
  const db = req.app.get('db');
  const { first_name, last_name, username, password } = req.body;

  argon2
    .hash(password)
    .then(hash => {
      return db.users.insert({
          first_name, last_name, username, password: hash,
        },
        {
          fields: ['id', 'first_name', 'last_name', 'username'],
        }
      );
    })
    .then(user => {
      const token = jwt.sign({ userId: user.id }, secret);
      res.status(201).json({ ...user, token });
    })
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function login(req, res) {
    const db = req.app.get('db');
    const { username, password } = req.body;
  
    db.users
      .findOne({username},
        {
          fields: ['id', 'first_name', 'last_name', 'username', 'password'],
        })
      .then(user => {


        if (!user) {
          throw new Error('Invalid username');
        }
        return argon2.verify(user.password, password).then(valid => {
          if (!valid) {
            throw new Error('Incorrect password');
          }

        // try{
        //     const tokens = req.headers.authorization.split(" ")[1];
        //     jwt.verify(tokens, secret);
        //     res.status(200).json({ data: 'here is the protexted data' });
        // } catch(err) {
        //     console.error(err);
        //     res.status(401).end();
        // }
        
          const token = jwt.sign({ userId: user.id }, secret);
          delete user.password; 
          res.status(200).json({ ...user, token });
        });
      })
      .catch(err => {
        if (
          ['Invalid username', 'Incorrect password'].includes(err.message)
        ) {
          res.status(400).json({ error: err.message });
        } else {
          console.error(err);
          res.status(500).end();
        }
      });
  }

module.exports = {
    register,
    login,
}



















