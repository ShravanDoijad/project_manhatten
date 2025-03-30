const Product = require("../model/productModel");
const Seller = require("../model/authModel");
const cloudinary = require("../cloudinary");
const addProducts = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      sellerId,
      sellerName,
      tags,
      price,
      discountPrice,
      availabilityStatus,
      shippingCost,
      returnPolicy,
      avgRating,
    } = req.body;

    if (
      !name ||
      !description ||
      !category ||
      !tags ||
      !price ||
      !discountPrice ||
      !availabilityStatus ||
      !shippingCost ||
      !returnPolicy ||
      !avgRating
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    const images = [image1, image2, image3, image4].filter((item) => item);
    console.log("images", images);

    let imageUrl =
      images.length > 0
        ? await Promise.all(
            images.map(async (item) => {
              let result = await cloudinary.uploader.upload(item.path, {
                resource_type: "image",
              });
              return result.secure_url;
            })
          )
        : [];

    const product = await Product.create({
      name,
      description,
      category,
      tags,
      price,
      sellerId,
      sellerName,
      discountPrice,
      availabilityStatus,
      shippingCost,
      returnPolicy,
      avgRating,
      image: imageUrl,
    });
    console.log("product", product);
    return res.status(200).json(product);
  } catch (error) {
    console.log("can not get products", error);
    res.status(401).json({ msg: "Can't get all product" });
  }
};

const listProducts = async (req, res) => {
  try {
    const { sellerId } = req.body;
    const products = await Product.find({ sellerId: sellerId });
    console.log(products);
    return res.status(200).json({ products });
  } catch (error) {
    return res.status(400).json({ msg: "can list product", error });
  }
};

const removeProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.body._id);

    res.status(200).json({ msg: "product removed successfully" });
  } catch (error) {
    return res.status(400).json({ msg: error });
  }
};

const editProduct = async (req, res) => {
  try {
    const {
      productId,
      price,
      shippingCost,
      description,
      availabilityStatus,
      discountPrice,
      avgRating,
    } = req.body;
    await Product.findByIdAndUpdate(productId, {
      price,
      shippingCost,
      description,
      availabilityStatus,
      discountPrice,
      avgRating,
    });
    return res.status(200).json({ msg: "product updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const allProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: "approved" });
    if (!products) {
      return res.status(404).json({ message: "products not found" });
    }
    res.status(200).json(products);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ msg: "internel server error" });
  }
};

const pendingProduct = async (req, res) => {
  try {
    const pendProduct = await Product.find({ status: "pending" });
    if (!pendProduct) {
      return res.status(404).json({ message: "pendProduct not found" });
    }
    res.status(200).json(pendProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "can not get pending products" });
  }
};

const updateProductStatus = async (req, res) => {
  try {
    const { productId, status, adminId } = req.body;

    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.status = status;
    await product.save();

    if (status === "rejected") {
      const seller = await Seller.findById(product.sellerId);
      if (seller) {
        seller.notifications.push({
          message: `Your product "${product.name}" was rejected by the admin.`,
        });
        await seller.save();
      }
    }

    res.status(200).json({ message: `Product ${status} successfully` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update product status" });
  }
};

const getNotifications = async (req, res) => {
  try {
    const { sellerId } = req.body;
    const seller = await Seller.findById(sellerId);

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    res.status(200).json({ notifications: seller.notifications });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.json({ msg: "no product found" });
    }
    return res.json({ msg: "product listed successfully", product });
  } catch (error) {
    log("error", error);
    res.status(500).json({ msg: "can not get product" });
  }
};

const addReview = async (req, res) => {
  try {
    let {productId, message, userId} = req.body;

    let product = await Product.findById(productId)
    if (!product) {
        return res.json({ msg: "no product found" });
      }
      let review  = product.review || {}
      if (!review[userId]) {
        review[userId]=[];
      }

      review[userId].push(message)
      
     await product.save()
      res.status(200).json(product)
  
  } catch (error) {
    console.log(error);
    res.status(500).json({msg :"can't add review"})
    
  }
}

const getReview = async (req, res) => {
  try {
    const {productId} = req.body;
    const product  = await Product.findById(productId)
    res.status(200).json(product.review)

  } catch (error) {
    console.log("error", error)
    res.status(500).json("can not get reviews")
  }
}

module.exports = {
  addProducts,
  editProduct,
  listProducts,
  allProducts,
  removeProduct,
  pendingProduct,
  updateProductStatus,
  getNotifications,
  singleProduct,
  addReview,
  getReview
};
