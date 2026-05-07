// import Product from "../models/products.js";
import { v2 as cloudinary } from "cloudinary";
import Product from "../models/products.js";
import mongoose from "mongoose";

const addproduct = async (req, res) => {

    try {
        console.log("📝 Incoming product data:", req.body);
        console.log("📸 Incoming files:", req.files ? Object.keys(req.files) : "no files");

        const { name, description, price, category, subcategory, size, bestseller } = req.body;

        // Validate required fields
        if (!name || !description || !price || !category || !subcategory) {
            return res.status(400).json({ error: "Missing required fields: name, description, price, category, subcategory" });
        }

        // Check if at least one image is provided
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ error: "At least one image is required" });
        }

        const image1 = req.files.image1 ? req.files.image1[0] : null;
        const image2 = req.files.image2 ? req.files.image2[0] : null;
        const image3 = req.files.image3 ? req.files.image3[0] : null;
        const image4 = req.files.image4 ? req.files.image4[0] : null;

        const images = [image1, image2, image3, image4].filter(img => img !== null);

        if (images.length === 0) {
            return res.status(400).json({ error: "At least one image is required" });
        }

        console.log(`🖼️  Uploading ${images.length} images to Cloudinary...`);

        const imageUrls = await Promise.all(images.map(async (image, idx) => {
            try {
                console.log(`⬆️  Uploading image ${idx + 1}/${images.length}: ${image.filename}`);
                const result = await cloudinary.uploader.upload(image.path, {
                    resource_type: "image",
                });
                console.log(`✅ Image ${idx + 1} uploaded successfully`);
                return result.secure_url;
            } catch (uploadErr) {
                console.error(`❌ Cloudinary upload error for image ${idx + 1}:`, uploadErr.message);
                throw new Error(`Cloudinary upload failed for image ${idx + 1}: ${uploadErr.message}`);
            }
        }));

        if (!imageUrls || imageUrls.length === 0) {
            return res.status(400).json({ error: "Failed to upload images to Cloudinary" });
        }

        console.log(`✅ All ${imageUrls.length} images uploaded successfully`);

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subcategory,
            size,
            bestseller: bestseller === 'true' || bestseller === true,
            image: imageUrls,
            date: Date.now()
        };

        console.log("💾 Saving product to database:", productData.name);

        const product = new Product(productData);
        await product.save();

        console.log("✅ Product saved successfully:", product._id);
        res.json({ status: "success", data: product });
    } catch (err) {
        console.error("❌ Error adding product:", err);
        res.status(500).json({ error: "Failed to add product", details: err.message });
    }
}
const removeproduct = async (req, res) => {

    try {
        const product = await Product.deleteOne(req.body.id);
        if (product) {
            res.json({ status: "success", msg: "Product removed successfully" });
        } else {
            res.status(404).json({ status: "error", msg: "Product not found", data: product });
        }
    } catch (err) {
        res.status(500).json({ error: "Failed to remove product", err: err.message });
    }
}
const singleproduct = async (req, res) => {
    try {
        const product = await Product.findById(req.body.id);
        if (product) {
            res.json({ status: "success", data: product });
        } else {
            res.status(404).json({ status: "error", msg: "Product not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch product", err: err.message });
    }
}
const listproducts = async (req, res) => {
    try {
        const { cat_prefix, id } = req.query;
        let query = {};

        // If multiple IDs are provided (from cart), fetch by IDs
        if (id) {
            const ids = Array.isArray(id) ? id : [id];
            // Convert string IDs to MongoDB ObjectIds
            const objectIds = ids.map(productId => {
                try {
                    return new mongoose.Types.ObjectId(productId);
                } catch (e) {
                    return null;
                }
            }).filter(id => id !== null);

            if (objectIds.length > 0) {
                query._id = { $in: objectIds };
            }
        }
        // If cat_prefix is provided and not empty, filter by category
        else if (cat_prefix && cat_prefix.trim() !== '') {
            query.category = cat_prefix;
        }

        const products = await Product.find(query);

        // Transform products to match frontend expectations
        const transformedProducts = products.map(product => ({
            id: product._id,           // frontend uses item.id
            title: product.name,       // frontend uses item.title
            img: product.image?.[0] || '', // frontend uses item.img (first image)
            description: product.description,
            price: product.price,
            category: product.category,
            subcategory: product.subcategory,
            image: product.image,      // keep full array too
            size: product.size,
            bestseller: product.bestseller,
            date: product.date
        }));

        res.json({ status: "success", data: transformedProducts });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch products", err: err.message });
    }
}

export { addproduct, removeproduct, singleproduct, listproducts }