const express = require("express");
const router = express.Router();
const userController = require("../api/controllers/user.controller");

// const db = require("../models/db");

// router.get("/", (req, res) => {
//   db.query("SELECT * FROM users", (err, data) => {
//     res.json(data);
//   });
// });

router.get("/users", userController.getAll);
router.get("/users/:id", userController.getOne);

module.exports = router;
