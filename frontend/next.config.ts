const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.themoviedb.org',
      },
      {
        protocol: 'https',
        hostname: 'media.themoviedb.org',
      },
    ],
  },
};

export default nextConfig;
