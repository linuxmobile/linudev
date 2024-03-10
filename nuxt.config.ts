// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			charset: "utf-8",
			viewport: "width=device-width, initial-scale=1",
		},
	},
	content: {
		documentDriven: true,
		highlight: {
			theme: "rose-pine-dawn",
			langs: [
				"nix",
				"vue",
				"css",
				"ts",
				"js",
				"tsx",
				"jsx",
				"bash",
				"zsh",
				"mdc",
				"md",
				"mdx",
			],
		},
	},
	css: ["@unocss/reset/tailwind.css"],
	delayHydration: {
		mode: "mount",
	},
	devtools: {
		enabled: true,
		timeline: {
			enabled: true,
		},
	},
	modules: [
		"@unocss/nuxt",
		"@nuxt/content",
		"@nuxtjs/fontaine",
		"@nuxt/image",
		"nuxt-delay-hydration",
		"@nuxtjs/seo",
	],
	site: {
		url: "https://linu.dev/",
		name: "LinuDev - Un blog sobre programación para novatos",
		description:
			"Un blog sobre programación para novatos, javascript, react, rust, bash, y sobre todo linux.",
		defaultLocale: "es",
	},
	ssr: true,
	runtimeConfig: {
		apiSecret: process.env.NUXT_API_SECRET,
		public: {
			apiBase: process.env.NUXT_PUBLIC_API_BASE,
		},
	},
});
