const express = require('express');
const router = express.Router();
const passport = require('passport');
const nJwt = require('njwt');
const secureRandom = require('secure-random');
const cache = require('memory-cache');

function createToken(id) {
  // Create a highly random byte array of 256 bytes
  const signingKey = secureRandom(256, { type: 'Buffer' });
  //store the signing key in memory, for checking if jwt token is valid
  cache.put(id, signingKey.toString('base64'));

  const claims = {
    iss: 'url',  // The URL of the service
    sub: id,    // The UID of the user
    scope: 'self'
  };
  const jwt = nJwt.create(claims, signingKey);
  jwt.setExpiration(new Date().getTime() + (20*1000));
  return jwt.compact();
}

router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) return res.redirect('/');
    if (!user) return res.redirect('/');
    else {
      req.login(user, (err) => {
        if (err) return next(err);
        delete user.password;
        res.cookie('jwt.token', createToken(user.id), { httpOnly: true, maxAge: 20*1000 });
        res.json(user);
      });
    }
  })(req, res);
});

router.post('/logout', (req, res, next) => {
  res.redirect('/');
});

module.exports = router;


