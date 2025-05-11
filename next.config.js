/** @type {import('next').NextConfig} */
const nextConfig = {
  // 기존 설정
  // reactStrictMode: true,
  // swcMinify: true,

  // MSW 관련 파일들을 프로덕션 빌드에 포함
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
};

module.exports = nextConfig;
