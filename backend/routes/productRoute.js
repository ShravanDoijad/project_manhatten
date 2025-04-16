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
  searchProduct,
  handleApprove,
  handleReject
} = require("../controller/productController");
const upload = require("../middleware/multer");
const { adminAuth } = require("../middleware/adminAuth");
const { artistAuth } = require("../middleware/artistAuth");

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
productRouter.get("/list", artistAuth,  listProducts);
productRouter.post("/remove", removeProduct);
productRouter.post("/edit",artistAuth, editProduct);
productRouter.get("/allProducts", allProducts);
productRouter.get("/pendingProduct",adminAuth, pendingProduct);
productRouter.post("/updateProductStatus", updateProductStatus);
productRouter.get("/getNotification", getNotifications);
productRouter.get("/singleProduct", singleProduct);
productRouter.post("/addReview", addReview);
productRouter.post("/getReview", getReview);
productRouter.get("/search", searchProduct );
productRouter.post("/approve", adminAuth,handleApprove );
productRouter.post("/reject", adminAuth, handleReject );


module.exports = productRouter;
