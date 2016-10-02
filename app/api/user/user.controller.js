"use strict";

const models = require('../../models');

exports.index = (req, res) => {
  models.User.findAll()
    .then(users => {
      res.json(users);
    });
};

exports.show = (req, res) => {
  //res.json(users[req.params.id - 1]);
  // id
  const id = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(400)
              .json({error: 'Invalid id'});
  }

  models.User.findOne({
    where: {
      id: id
    }
  }).then(user => {
    if (!user) {
      return res.status(404).json({error: 'no user'});
    }
    res.json(user);
  });
};

exports.destroy = (req, res) => {
  // id
  const id = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(400)
              .json({error: 'Invalid id'});
  }

  models.User.destroy({
    where: {
      id: id
    }
  }).then( (user) => {
    if(!user) {
      return res.status(404).json({error: 'no user'});
    }
    res.status(204).send();
  });
};

exports.create = (req, res) => {
  const name = req.body.name.trim() || false;
  if (!name) {
    return res.status(400)
              .json({error : 'Invalid name'});
  }

  models.User.create({
    name: name
  }).then((newUser) => {
    res.status(201).json(newUser);
  });
};

exports.update = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(400)
              .json({error: 'Invalid id'});
  }

  models.User.findOne({
    where: {
      id: id
    }
  }).then(user => {
    if (!user) {
      return res.status(404).json({error: 'no user'});
    }

    let name = req.body.name || '';
    name = name.toString().trim();
    if(!name.length) {
      return res.status(400).json({error: 'Invalid name'});
    }

    user.name = name;
    user.save().then( () => res.json(user));
  });
}
