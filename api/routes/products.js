const express = require("express");
// Router handle login requests
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require('../middleware/check-auth');
const ProductsController = require("../controllers/products")

// Used to parse bodies like body-parser
const multer = require("multer");



// Implementing Storage Strategy with the help of multer
const storage = multer.diskStorage({
  //Where function is stored
  destination: function(req, file, cb) {
   // cb is callback
   cb(null, './uploads/');
  },
 filename: function(req, file, cb) {
   cb(null, new Date().toISOString() + file.originalname); 
 }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Storage Strategy
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // 1 megabyte times 5
  },
  fileFilter: fileFilter
});

const Product = require("../models/product");

router.get("/",  ProductsController.products_get_all);

router.post("/",checkAuth ,upload.single('productImage'), ProductsController.products_create_product);

router.delete("/:productId", checkAuth,(req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Product deleted',
          request: {
              type: 'POST',
              url: 'http://localhost:3000/products',
              body: { name: 'String', price: 'Number' }
          }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;