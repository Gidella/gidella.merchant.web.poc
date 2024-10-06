/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
      domains: [
        'gidella-test.s3.eu-west-2.amazonaws.com',
        'gidella-stage.s3.eu-west-2.amazonaws.com',
        'ui-avatars.com',
    ],
    },
  };

export default nextConfig;
