/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // Note: next dev --turbo は appDir と併用できない
    appDir: true,
  },
  typescript: {
    // Note: そのままだと Type error: 'PageComponent' is declared but never used. というエラーが出るので、
    // Note: ビルド用の tsconfig.json を指定する。
    tsconfigPath: 'tsconfig.build.json',
  },
};

module.exports = nextConfig;
