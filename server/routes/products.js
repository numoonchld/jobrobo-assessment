var express = require("express");
var router = express.Router();

/* GET all products. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* POST new product */

module.exports = router;
