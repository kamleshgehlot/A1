const Category = require('../models/category.js');
const Product = require('../models/product/product.js');

const add = function(req, res, next) {
  console.log('...............', req.decoded);
  console.log('...............', req.body);

  const categoryParam = {
    maincategory: req.body.maincategory,
    category: req.body.category,
    subcategory: req.body.subcategory,
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


const addcategory = function(req, res, next) {
  console.log('...............', req.decoded);
  console.log('...............', req.body);

  const categoryParam = {
    category: req.body.category,
    subcategory: req.body.subcategory,
  };

  try {
    const newCategory = new Category(categoryParam);

    newCategory
      .addcategory()
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


const addsubcategory = function(req, res, next) {
  console.log('...............', req.decoded);
  console.log('...............', req.body);

  const categoryParam = {
    subcategory: req.body.subcategory,
  };

  try {
    const newCategory = new Category(categoryParam);

    newCategory
      .addsubcategory()
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









const addproduct = function(req, res, next) {
  console.log('...............', req.decoded);
  console.log('...............', req.body);

  const categoryParam = {
    maincat:req.body.maincat,
      category:req.body.category,
      subcat:req.body.subcat,
      name:req.body.name,
      color_id:req.body.color_id,
      brand_id:req.body.brand_id,
      buying_price:req.body.buying_price,
      description:req.body.description,
      specification:req.body.specification,
      brought:req.body.brought,
      invoice:req.body.invoice,
      rental:req.body.rental,
      meta_keywords:req.body.meta_keywords,
      meta_description:req.body.meta_description
  };

  try {
    const newProduct = new Product(categoryParam);

    newProduct
      .addproduct()
      .then(result => {
        console.log('controller category', result);
        new Product({}).all().then(categoryList => {
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









const productlist = function(req, res, next) {
  try {
    new Product({}).all().then(productList => {
      res.send({ productList });
    });
  } catch (err) {
    console.log('Error: ', err);
  }
};






const edit = function(req, res, next) {
  console.log('...............', req.decoded);
  console.log('...............', req.body);

  const categoryParam = {
    id: req.body.id,
    name: req.body.name,
    color_id: req.body.color_id,
    brand_id: req.body.brand_id,
    buying_price: req.body.buying_price,
    description: req.body.description,
    specification: req.body.specification,
    brought: req.body.brought,
    invoice: req.body.invoice,
    rental: req.body.rental,
    meta_keywords: req.body.meta_keywords,
    meta_description: req.body.meta_description,
  };

  try {
    const newCategory = new Category(categoryParam);

    newCategory.update().then(result => {
        console.log('controller category', result);
        new Product({}).all().then(productlist => {
        res.send( productlist );
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

module.exports = { add,addcategory,addsubcategory,addproduct, all, edit,productlist };
