import {
	defineConfig,
	presetTypography,
	presetWebFonts,
	presetWind,
} from "unocss";

export default defineConfig({
	presets: [
		presetWind(),
		presetWebFonts({
			provider: "fontshare",
			fonts: {
				display: "Clash Display",
				sans: "General Sans",
			},
		}),
		presetTypography({
			selectorName: "prose-sm",
			cssExtend: {
				"h1,h2,h3,h4": {
					"font-weight": "900",
					"font-family": "Clash Display",
				},
				"p,a,li,ul,ol": {
					"font-family":
						'"General Sans",ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont',
					color: "#D0D0D0",
				},
				strong: {
					color: "#FFFFFF",
					"font-weight": "600",
				},
				a: {
					color: "#F8E42E !important",
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
	shortcuts: {
		"flex-center": "flex items-center justify-center",
		"alert-success": "bg-astro-green/80 text-black",
		"alert-info": "bg-astro-blue text-white",
		"alert-warning": "bg-red-500 text-black",
		"alert-error": "bg-astro-orange text-black",
		alert: "py-4 flex items-center justify-start rounded-md px-3 gap-x-2",
	},
});
