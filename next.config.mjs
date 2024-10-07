/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nissei.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.mobilezone.com.br",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cellshop.com.py",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
