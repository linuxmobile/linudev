// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
	unocss: {
		attributify: true,
		wind: true,
		typography: true,
		theme: {
			fontFamily: {
				sans: "General Sans",
				display: "Clash Display",
			},
			colors: {
				astro: {
					blue: "#152AEE",
					purple: "#9000FF",
					pink: "#FF19F4",
					orange: "#FF7D54",
					yellow: "#F8E42E",
					green: "#49DE78",
					aqua: "#1DE9D7",
				},
				backgroundImage: {
					"gradient-purple": "linear-gradient(90deg, #3245FF 0%, #F041FF 100%)",
					"gradient-green": "linear-gradient(90deg, #4AF2C8 0%, #2F4CB3 100%)",
					"gradient-red": "linear-gradient(90deg, #FF7D54 0%, #FF2E2E 100%)",
					"gradient-orange": "linear-gradient(90deg, #F8E42E 0%, #FF7D54 100%)",
				},
			},
		},
		shortcuts: {
			"flex-center": "flex items-center justify-center",
		},
	},
	css: ["@unocss/reset/tailwind.css"],
	modules: ["@unocss/nuxt", "@nuxt/content", "@nuxtjs/fontaine"],
	devtools: {
		enabled: true,
		timeline: {
			enabled: true,
		},
	},
});