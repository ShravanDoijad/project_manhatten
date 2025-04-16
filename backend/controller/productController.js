const Product = require("../model/productModel");
const {Seller, User} = require("../model/authModel");

const cloudinary = require("../cloudinary");
const jwt = require("jsonwebtoken");
const addProducts = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      sellerName,
      tags,
      price,
      status,
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
      
      !sellerName ||
      !availabilityStatus ||
      !shippingCost ||
      !returnPolicy ||
      !avgRating
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    const token = req.cookies.artistToken
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    const sellerId = decoded._id;
   
    
    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    const images = [image1, image2, image3, image4].filter((item) => item);
    console.log("images", images);
    
    const tagArray = tags.split(",").map(tag => tag.trim());


    let imageUrl =[];
      images.length > 0
        ? imageUrl= await Promise.all(
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
      tags:tagArray,
      price,
      sellerId: sellerId,
      sellerName,
      status,
      discountPrice,
      availabilityStatus,
      shippingCost,
      returnPolicy,
      avgRating,
      images: imageUrl,
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
    const token = req.cookies.artistToken;
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    const sellerId = decoded._id;
    const products = await Product.find({ sellerId: sellerId });
    console.log(products);
    return res.status(200).json({ products });
  } catch (error) {
    return res.status(400).json({ msg: "can list product", error });
  }
};

const removeProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.body.productId);

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
      returnPolicy,
      availabilityStatus,
      discountPrice,
      
    } = req.body;
    await Product.findByIdAndUpdate(productId, {
      price,
      shippingCost,
      returnPolicy,
      availabilityStatus,
      discountPrice,
     
    }, {new: true});
    return res.status(200).json({ msg: "product updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const allProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: "approved" });
    if (!products) {
      return res.status(404).json({ msg: "products not found" });
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
    const token = req.cookies.artistToken;
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    const sellerId = decoded._id;
    const seller = await Seller.findById(sellerId);

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    res.status(200).json({ notifications: seller.notification });
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
    let {productId, message} = req.body;
    const token = req.cookies.token
    
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    console.log(token);
    
    const userId = decoded._id;
    let user = await User.findById(userId)
    let product = await Product.findById(productId)
    if (!product) {
        return res.json({ msg: "no product found" });
      }
      let review  = product.review || []
      let userName= user.name

      review.push({userName:userName ,message: message, date: new Date()})
      
     await product.save()
      res.status(200).json(review)
  
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

const searchProduct =  async (req, res) => {
  try {
      const {category, tags} = req.query
      if (!category) {
          return res.status(400).json({ message: "Category is required" });
      }

      const products = await Product.find({
        $or: [
            { category: { $regex: new RegExp(category, "i") } }, 
            { tags: { $regex: new RegExp(tags, "i") } }      
        ]
    });


      if (products.length === 0) {
          return res.status(404).json({ message: "No products found" });
      }

      res.json(products);
  } catch (error) {
      console.error("Error searching products:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
}

const handleApprove = async (req, res) => {
  try {
    const {productId}= req.body
    const product = await Product.findByIdAndUpdate(productId, { status: "approved" }, { new: true });
  
    
    const seller = await Seller.findById(product.sellerId); 
    if (seller) {
      seller.notification.push({
        message: `Your product "${product.name}" has been approved.`,
        date: new Date(),
      });
      await seller.save();
    }
    res.status(200).json({ message: "Product approved successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to approve product" });
    
  }
}



const handleReject = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.body.productId);
    
    
    const seller = await Seller.findById(product.sellerId); 
    if (seller) {
      seller.notification.push({
        message: `Your product "${product.name}" has been rejected.`,
        date: new Date(),
      });
      
      await seller.save();
     
    }
    res.status(200).json({ message: "Product rejected successfully" });

    
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Failed to reject product" });
    
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
  getReview,
  handleApprove,
  handleReject,
  searchProduct
};
