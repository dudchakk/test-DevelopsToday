import type { Config } from 'tailwindcss'

export default {
	content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
	plugins: [],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
			},
		},
	},
} satisfies Config
