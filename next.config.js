/** @type {import('next').NextConfig} */
const webpack = require("webpack");
const nextConfig = {
  images: {
    domains: ['127.0.0.1', '127.0.0.1:8000'],
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
