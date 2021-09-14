const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
	reactStrictMode: true,
	images: {
		domains: ["cdn.images.dev.external.hollywood.com"],
	},
	i18n: {
		locales: ["en-us"],
		defaultLocale: "en-us",
	},
});
