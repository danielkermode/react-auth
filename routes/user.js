const express = require('express');
const router = express.Router();
const knex = require('../database/config');
const db = require('../database/utils')(knex);
const bcrypt = require('bcryptjs');
const cache = require('memory-cache');
const nJwt = require('njwt');

router.post('/', (req, res, next) => {
  //create a new user
  const data = req.body;
  bcrypt.hash(data.password, 10, (err, hash) => {
    data.password = hash;
    db.add('users', data, (err, resp) => {
      if(err) {
        console.error(err);
        res.json(err);
      } else {
        res.json({ id: resp });
      }
    });
  });
});

router.get('/:id', isAuthenticated, (req, res, next) => {
  //get a user by id
  const id = req.params.id;
  db.findOne('users', { id }, (err, resp) => {
    if(resp) {
      res.json({ username: resp.username });
    } else {
      res.sendStatus(404);
    }
  });
});

function isAuthenticated(req, res, next) {
  const keyStore = cache.get(req.params.id);
  const signingKey = keyStore && Buffer.from(keyStore, 'base64');
  if(req.cookies['jwt.token']) {
    nJwt.verify(req.cookies['jwt.token'], signingKey || new Buffer([]), (err, verifiedJwt) => {
      if(err) {
        // Token has expired, has been tampered with, etc
        console.log(err.message);
        res.sendStatus(403);
      } else {
        // Token is verified
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
}

module.exports = router;
