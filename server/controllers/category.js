const Category = require('../models/category.js');

const add = function(req, res, next) {
  console.log('...............', req.decoded);
  console.log('...............', req.body);

  const categoryParam = {
    category: req.body.category,
    type: req.body.type,
    // parentid: req.body.parentid,
    position: req.body.position,
    description: req.body.description,
    is_active: 1,
    meta_description: req.body.meta_description,

    meta_keywords: req.body.meta_keywords,
    // created_by: req.decoded.id
  };

  try {
    const newCategory = new Category(categoryParam);

    newCategory
      .add()
      .then(result => {
        console.log('controller category', result);
        new Category({}).all().then(categoryList => {
          res.send({ categoryList });
        });
      })
      .catch(err => {
        res.status(500);
        res.render('error', { error: err });
      });
  } catch (err) {
    console.log('Error: ', err);

    res.status(500);
    res.send('error', { error: err });
  }
};

const edit = function(req, res, next) {
  console.log('...............', req.decoded);
  console.log('...............', req.body);

  const categoryParam = {
    id: req.body.id,
    category: req.body.category,
    type: req.body.type,
    // parentid: req.body.parentid,
    position: req.body.position,
    description: req.body.description,
    is_active: 1,
    meta_description: req.body.meta_description,

    meta_keywords: req.body.meta_keywords,
    // created_by: req.decoded.id
  };

  try {
    const newCategory = new Category(categoryParam);

    newCategory
      .update()
      .then(result => {
        console.log('controller category', result);
        new Category({}).all().then(categoryList => {
          res.send({ categoryList });
        });
      })
      .catch(err => {
        res.status(500);
        res.render('error', { error: err });
      });
  } catch (err) {
    console.log('Error: ', err);

    res.status(500);
    res.send('error', { error: err });
  }
};

const all = function(req, res, next) {
  try {
    new Category({}).all().then(categoryList => {
      res.send({ categoryList });
    });
  } catch (err) {
    console.log('Error: ', err);
  }
};

module.exports = { add, all, edit };
