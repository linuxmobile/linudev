// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	ssr: true,
	runtimeConfig: {
		apiSecret: process.env.NUXT_API_SECRET,
		public: {
			apiBase: process.env.NUXT_PUBLIC_API_BASE,
		},
	},
	app: {
		head: {
			charset: "utf-8",
			viewport: "width=device-width, initial-scale=1",
		},
	},
	content: {
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
	modules: [
		"@unocss/nuxt",
		"@nuxt/content",
		"@nuxtjs/fontaine",
		"@nuxt/image",
		"nuxt-delay-hydration",
	],
	delayHydration: {
		mode: "mount",
	},
	devtools: {
		enabled: true,
		timeline: {
			enabled: true,
		},
	},
});
