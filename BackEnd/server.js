import express from "express";
import cors from "cors";
import 'dotenv/config';
import mongoose from "mongoose";
import cloudinaryConfig from "./config/cloudinary.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";
import authRoute from "./routes/auth.js";
import passport from "./config/passport.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

//  Allow both Admin and Store
const allowedOrigins = [
    process.env.ADMIN_URL,
    process.env.CLIENT_URL
]

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}))

// Increase payload size limit for file uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(passport.initialize());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

try {
    cloudinaryConfig();
} catch (e) {
    console.error('❌ Cloudinary failed to initialize:', e.message);
    process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB Atlas')
        app.get('/delete-data', (req, res) => {
            res.send(`
    <h1>Data Deletion Instructions</h1>
    <p>To delete your data, contact us at: abdoalwahedmoaz@gmail.com</p>
  `);
        });

        app.get('/privacy-policy', (req, res) => {
            res.send(`
    <h1>Privacy Policy</h1>
    <p>We collect basic profile information for login purposes only.</p>
    <p>Contact: abdoalwahedmoaz@gmail.com</p>
  `);

        });
        app.get('/terms-of-service', (req, res) => {
            res.send(`
    <h1>Terms of Service</h1>
    <p>By using our service, you agree to our terms and conditions.</p>
    <p>Contact: abdoalwahedmoaz@gmail.com</p>
    `);
        });

        app.get('/', (req, res) => res.send("API is working!"))
        app.use('/api/auth', authRoute)
        app.use('/api/users', userRoute)
        app.use('/api/products', productRoute)
        app.use('/api/cart', cartRoute)
        app.use('/api/orders', orderRoute)

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`)
        })
    })
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err.message)
        process.exit(1)
    })