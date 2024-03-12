import { defineConfig, presetTypography, presetWind } from "unocss";

export default defineConfig({
	presets: [
		presetWind(),
		presetTypography({
			selectorName: "prose-sm",
			cssExtend: {
				"h1,h2,h3,h4": {
					"font-weight": "900",
					"font-family": "Clash Display",
				},
				"h1 a, h2 a, h3 a, h4 a": {
					color: "#e0def4 !important",
					"font-weight": "900",
					"font-family": "Clash Display",
				},
				"p,a,li,ul,ol": {
					color: "#e0def4",
				},
				strong: {
					color: "#b4637a",
					"font-weight": "600",
				},
				a: {
					color: "#ea9d34 !important",
					"font-weigth": "700",
					"text-decoration": "none",
				},
				em: {
					"font-style": "italic",
				},
				pre: {
					"background-color": "rgba(25, 23, 36, 0.3) !important",
				},
				code: {
					"text-wrap": "nowrap !important",
				},
				img: {
					"border-radius": "0.3rem",
				},
			},
		}),
	],
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
		},
		backgroundImage: {
			"gradient-purple": "linear-gradient(90deg, #3245FF 0%, #F041FF 100%)",
			"gradient-green": "linear-gradient(90deg, #4AF2C8 0%, #2F4CB3 100%)",
			"gradient-red": "linear-gradient(90deg, #FF7D54 0%, #FF2E2E 100%)",
			"gradient-orange": "linear-gradient(90deg, #F8E42E 0%, #FF7D54 100%)",
		},
	},
	safelist:
		"col-span-4 col-span-5 alert alert-info alert-warning alert-success alert-error".split(
			" ",
		),
	shortcuts: {
		"flex-center": "flex items-center justify-center",
		"alert-success": "bg-astro-green/80 text-black",
		"alert-info": "bg-astro-blue text-white",
		"alert-warning": "bg-red-500 text-black",
		"alert-error": "bg-astro-orange text-black",
		alert: "flex items-center justify-start rounded-md px-3 gap-x-2 max-w-2xl",
	},
});
