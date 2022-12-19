/** @type {import("tailwindcss").Config} */
module.exports = {
	content: [
		"./src/**/*.{ts,tsx}",
		"../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				display: ["IBM Plex Mono", "Menlo", "monospace"],
				body: ["IBM Plex Mono", "Menlo", "monospace"],
			},
			colors: {
				primary: {
					50: "#f9fafb",
					100: "#f3f4f6",
					200: "#e5e7eb",
					300: "#d1d5db",
					400: "#9ca3af",
					500: "#6b7280",
					600: "#4b5563",
					700: "#374151",
					800: "#1f2937",
					900: "#111827",
				},
				secondary: {
					50: "#f0fdfa",
					100: "#ccfbf1",
					200: "#99f6e4",
					300: "#5eead4",
					400: "#2dd4bf",
					500: "#14b8a6",
					600: "#0d9488",
					700: "#0f766e",
					800: "#115e59",
					900: "#134e4a",
				},
			},
			transitionProperty: {
				abs: "top, right, bottom, left",
				filter: "filter",
			},
			keyframes: {
				wiggle: {
					"0%, 100%": { transform: "rotate(-3deg)" },
					"50%": { transform: "rotate(3deg)" },
				},
				shake: {
					"0%, 100%": { transform: "translateX(0)" },
					"25%": { transform: "translateX(5px) rotate(6deg)" },
					"75%": { transform: "translateX(-5px) rotate(-6deg)" },
				},
				up: {
					"0%": { transform: "translateY(0)" },
					"100%": { transform: "translateY(-5px)" },
				},
				strikeThrough: {
					"0%": {
						transform: "translateY(-1rem)",
						opacity: 0.3,
					},
					"50%": { opacity: 1 },
					"100%": { transform: "translateY(0)" },
				},
			},
			animation: {
				wiggle: "wiggle 1s ease-in-out infinite",
				shake: "shake 300ms ease-in-out infinite",
				// FIXME: stop `up` animation and end it when `shake` animation ends
				upShake:
					"up 75ms ease-in forwards, shake 300ms 75ms ease-in-out forwards",
				strikeThrough: "strikeThrough 150ms ease-in-out forwards",
			},
		},
	},
	corePlugins: {
		aspectRatio: false,
	},
	plugins: [
		require("@tailwindcss/aspect-ratio"),
		require("@tailwindcss/forms"),
		require("@tailwindcss/line-clamp"),
		require("@tailwindcss/typography"),
		require("tailwind-scrollbar")({ nocompatible: true }),
	],
};
