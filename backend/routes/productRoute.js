const express = require("express");
const productRouter = express.Router();
const {
  addProducts,
  listProducts,
  removeProduct,
  editProduct,
  allProducts,
  pendingProduct,
  updateProductStatus,
  getNotifications,
  singleProduct,
  addReview,
  getReview,
} = require("../controller/productController");
const upload = require("../middleware/multer");
const { adminAuth } = require("../middleware/adminAuth");
productRouter.post(
  "/addProduct",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProducts
);
productRouter.get("/list", adminAuth, listProducts);
productRouter.post("/remove", removeProduct);
productRouter.post("/edit", adminAuth, editProduct);
productRouter.get("/allProducts", allProducts);
productRouter.get("/pendingProduct", pendingProduct);
productRouter.post("/updateProductStatus", updateProductStatus);
productRouter.get("/getNotification", getNotifications);
productRouter.get("/singleProduct", singleProduct);
productRouter.post("/addReview", addReview);
productRouter.get("/getReview", getReview);

module.exports = productRouter;
