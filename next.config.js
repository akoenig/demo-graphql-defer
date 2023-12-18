/** @type {import('next').NextConfig} */
const { nextFusePlugin } = require("fuse/next/plugin");

const nextConfig = nextFusePlugin()({});

module.exports = nextConfig;
