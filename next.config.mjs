/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "firebasestorage.googleapis.com",
            "lh3.googleusercontent.com",
            "localhost",
            "avatars.githubusercontent.com",
            "pbs.twimg.com",
            "platform-lookaside.fbsbx.com",
            "scontent.fisb17-1.fna.fbcdn.net",
            'pixelscape-main-bucket.s3.eu-north-1.amazonaws.com'
        ],
    }
};

export default nextConfig;
