const express = require("express");
const router = express.Router();
const requireSignIn = require("../middlewares/authMiddleware");
const IsAdmin = require("../middlewares/Isadmin");
const {
  CreateProductController,
  GetProductController,
  GetSingleProductController,
  GetProductPhotoController,
  DeleteProductController,
  UpdateProductController,
  ProductFilterController,
  ProductCountController,
  ProductPerController,
  ProductSearchController,
  SimilarProductController,
  CatergoryWiseProductController,
  BraintreeTokenController,
  BraintreePaymentController
} = require("../controllers/ProductController");
const formidable = require("express-formidable");
//routes
//create product
router.post(
  "/create-product",
  requireSignIn,
  IsAdmin,
  formidable(),
  CreateProductController
);

//get All products
router.get("/get-product", GetProductController);

// get single Product
router.get("/getSingle-product/:slug", GetSingleProductController);

//get photo

router.get("/get-productPhoto/:id", GetProductPhotoController);

//delete delete
router.delete(
  "/Delete-product/:id",
  requireSignIn,
  IsAdmin,
  DeleteProductController
);

//update
router.put(
  "/update-product/:id",
  requireSignIn,
  IsAdmin,
  formidable(),
  UpdateProductController
);

// get by filter

router.post("/productfilter", ProductFilterController);

router.get("/product-count", ProductCountController);

router.get("/product-list/:page", ProductPerController);

router.get("/product-search/:Keyword", ProductSearchController);

router.get("/product-similar/:pid/:cid", SimilarProductController);

//catergory wise get product

router.get("/product-CategoryWise/:id", CatergoryWiseProductController);

//payments routes

router.get("/braintree/token",BraintreeTokenController)

//payments
router.post("/braintree/payment",requireSignIn,BraintreePaymentController)


module.exports = router;
