import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**"},
    ],
  },
  async redirects() {
    return [
      {
        source: "/lentes-de-contato-odontologicas",
        destination: "/lentes-de-contato-dental",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
