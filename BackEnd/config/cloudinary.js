import { v2 as cloudinary } from "cloudinary";

const cloudinaryConfig = () => {
    const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;

    if (!CLOUD_NAME || !CLOUD_API_KEY || !CLOUD_API_SECRET) {
        const missing = {
            CLOUD_NAME: CLOUD_NAME ? '✓' : '✗',
            CLOUD_API_KEY: CLOUD_API_KEY ? '✓' : '✗',
            CLOUD_API_SECRET: CLOUD_API_SECRET ? '✓' : '✗'
        };
        console.error('❌ Cloudinary configuration missing:', missing);
        throw new Error('Cloudinary env vars are missing (CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET)');
    }

    cloudinary.config({
        cloud_name: CLOUD_NAME,
        api_key: CLOUD_API_KEY,
        api_secret: CLOUD_API_SECRET
    });

    console.log('✅ Cloudinary configured successfully');
};

export default cloudinaryConfig;