var express = require("express");
var router = express.Router();
const { query, body, validationResult } = require("express-validator");
const fs = require("fs");
const dbFile = "data/db.json";

/* GET all categories. */
router.get("/", function (req, res, next) {
  fs.readFile(dbFile, "utf-8", (err, data) => {
    if (err) throw err;

    const allCategories = JSON.parse(data).categories;

    res.json({
      allCategories,
    });
  });
});

/* POST new category */
router.post("/", function (req, res, next) {
  const category = req.body;

  console.log(category);

  fs.readFile(dbFile, "utf-8", (err, data) => {
    if (err) throw err;
    console.log(data);
    const existingCategories = JSON.parse(data).categories;

    const newCategories = {
      ...JSON.parse(data),
      categories: [category.category, ...existingCategories],
    };

    const newJSONFile = JSON.stringify(newCategories, null, 2);

    fs.writeFile(dbFile, newJSONFile, "utf-8", () => {
      res.json({
        status: "ok",
        newCategories: newCategories.categories,
      });
    });
  });
});

/* POST new sub category */
router.post("/subcategory", function (req, res, next) {
  const newSubCategoryToAdd = req.body;
  console.log(newSubCategoryToAdd);

  fs.readFile(dbFile, "utf-8", (err, data) => {
    if (err) throw err;

    console.log(data);
    const existingSubCategories = JSON.parse(data).subcategories;

    const newSubCategories = {
      ...JSON.parse(data),
      subcategories: [newSubCategoryToAdd, ...existingSubCategories],
    };

    const newJSONFile = JSON.stringify(newSubCategories, null, 4);

    fs.writeFile(dbFile, newJSONFile, "utf-8", () => {
      res.json({
        status: "ok",
        newSubCategories: newSubCategories.subcategories,
      });
    });
  });
});

/* POST new sub-sub-category */
router.post("/subsubcategory", function (req, res, next) {
  console.log(req.body);
});

module.exports = router;
