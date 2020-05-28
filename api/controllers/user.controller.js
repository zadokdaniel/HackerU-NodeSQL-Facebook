const User = require("../models/User.model");

exports.getAll = (req, res) => {
  User.findAll((err, data) => {
    if (err) {
      res.json(err);
    }
    res.json(data);
  });
};

exports.getOne = (req, res) => {
  User.findOne(req.params.id, (err, data) => {
    res.json(data);
  });
};

exports.updateOne = (req, res) => {
  if (!req.body) {
    res.status(400).json({
      error: {
        code: "empty_body",
        message: "body cannot be empty",
      },
    });
  }
};
