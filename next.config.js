/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Thêm các package cần transpile
  transpilePackages: ['@douyinfe/semi-ui', '@douyinfe/semi-icons', '@douyinfe/semi-illustrations'],

  // Cấu hình Webpack
  webpack: (config, { isServer }) => {

    // Bỏ qua module fs trên client-side
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }

    // Thêm rule để xử lý các module ESM
    config.module.rules.push({
      test: /\.js$/,
      include: /node_modules\/@mdx-js\/mdx/,
      type: 'javascript/auto',
    });

    // Tối ưu hóa build để tránh vấn đề out of memory
    config.optimization = {
      ...config.optimization,
      minimize: true,
      nodeEnv: 'production',
    };

    return config;
  },
};

module.exports = nextConfig;
