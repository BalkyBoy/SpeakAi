/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname, // ensures Turbopack uses the project root
  },
};

module.exports = nextConfig;