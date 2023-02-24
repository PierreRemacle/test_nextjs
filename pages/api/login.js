const express = require('express');

const bcrypt = require('bcryptjs');

const users = [
  { id: 1, username: 'ADMIN', password: 'LMDPDRW' }
];

export default function handler(req, res) {

    const { username, password } = req.body;


    const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Username or password is incorrect'
    });
  }

  ///const passwordIsValid = bcrypt.compareSync(password, user.password);
  const passwordIsValid = users.find(u => u.password === password);
  if (!passwordIsValid) {
    return res.status(401).json({
      success: false,
      message: 'Username or password is incorrect'
    });
  }

  const token = user.id;
  res.json({
    success: true,
    message: 'User is authorized',
    token
  });
  
}

