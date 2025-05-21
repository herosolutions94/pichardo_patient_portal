/** @type {import('next').NextConfig} */
const webpack = require("webpack");
const nextConfig = {
  images: {
    domains: ['127.0.0.1', '127.0.0.1:8000', 'staging.rentaro.com.au','3.129.128.28','admin.pichardomedical.com'],
  },
  reactStrictMode: true,
  webpack: (config, {
    buildId,
    dev,
    isServer,
    defaultLoaders,
    webpack
  }) => {
      config.plugins.push(
          new webpack.ProvidePlugin({
              $: "jquery",
              jQuery: "jquery",
              "window.jQuery": "jquery"
          })
      );
      return config;
  }
}

module.exports = nextConfig
