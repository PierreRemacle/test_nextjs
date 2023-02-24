const express = require('express');
const router = express.Router();

const users = [
  { username: 'user1', password: 'pass1' },
  { username: 'user2', password: 'pass2' }
];

router.post('/auth', (req, res) => {

  const { username, password } = req.body;
  
  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    req.session.user = user;
    res.send({ success: true });
  } else {
    res.status(401).send({ error: 'Incorrect username or password' });
  }
});

module.exports = router;

