/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "localhost",
            'pixelscape-main-bucket.s3.eu-north-1.amazonaws.com'
        ],
    }
};

export default nextConfig;
