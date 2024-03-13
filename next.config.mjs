/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			{
				source: "/",
				destination: "/cart",
				permanent: false,
			},
		]
	},
}

export default nextConfig
