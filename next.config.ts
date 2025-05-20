import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "placehold.co",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "fakeimg.pl",
				port: "",
				pathname: "/**",
			},
		],
	},
	webpack: (config, { isServer }) => {
		// Exclude problematic directories and add performance hints
		config.watchOptions = {
			...config.watchOptions,
			ignored: [
				'**/node_modules',
				'**/.next',
				'**/C:/Users/**',
				'**/C:/Program Files/**',
				'**/C:/ProgramData/**',
				'**/C:/Windows/**',
			],
			poll: false,
		};
		
		// Add performance hints
		config.performance = {
			...config.performance,
			hints: false,
		};

		// Optimize for production
		if (!isServer) {
			config.optimization = {
				...config.optimization,
				minimize: true,
			};
		}

		return config;
	},
};

export default nextConfig;
