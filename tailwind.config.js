import type { Config } from 'tailwindcss';

const config = {
   darkMode: ['class'],
   content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
   prefix: '',
   theme: {
   	container: {
   		padding: '2rem',
   		screens: {
   			'2xl': '1400px'
   		}
   	},
   	extend: {
   		screens: {
   			es: {
   				max: '640px'
   			},
   			esmob: {
   				max: '425px'
   			}
   		},
   		colors: {
   			border: {
   				DEFAULT: 'hsl(var(--border))',
   				hover: 'hsl(var(--border-hover))',
   				focused: 'hsl(var(--border-focused))'
   			},
   			input: 'hsl(var(--input))',
   			ring: 'hsl(var(--ring))',
   			background: {
   				DEFAULT: 'hsl(var(--background))',
   				secondary: 'hsl(var(--background-secondary))'
   			},
   			foreground: 'hsl(var(--foreground))',
   			primary: {
   				DEFAULT: 'hsl(var(--primary))',
   				hover: 'hsl(var(--primary-hover))',
   				foreground: 'hsl(var(--primary-foreground))'
   			},
   			secondary: {
   				DEFAULT: 'hsl(var(--secondary))',
   				foreground: 'hsl(var(--secondary-foreground))',
   				hover: 'hsl(var(--secondary-hover))'
   			},
   			destructive: {
   				DEFAULT: 'hsl(var(--destructive))',
   				foreground: 'hsl(var(--destructive-foreground))'
   			},
   			muted: {
   				DEFAULT: 'hsl(var(--muted))',
   				foreground: 'hsl(var(--muted-foreground))'
   			},
   			accent: {
   				DEFAULT: 'hsl(var(--accent))',
   				foreground: 'hsl(var(--accent-foreground))'
   			},
   			popover: {
   				DEFAULT: 'hsl(var(--popover))',
   				foreground: 'hsl(var(--popover-foreground))'
   			},
   			card: {
   				DEFAULT: 'hsl(var(--card))',
   				foreground: 'hsl(var(--card-foreground))'
   			},
   			texture: {
   				DEFAULT: 'hsl(var(--texture))'
   			},
   			chart: {
   				'1': 'hsl(var(--chart-1))',
   				'2': 'hsl(var(--chart-2))',
   				'3': 'hsl(var(--chart-3))',
   				'4': 'hsl(var(--chart-4))',
   				'5': 'hsl(var(--chart-5))'
   			},
   			sidebar: {
   				DEFAULT: 'hsl(var(--sidebar-background))',
   				foreground: 'hsl(var(--sidebar-foreground))',
   				primary: 'hsl(var(--sidebar-primary))',
   				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
   				accent: 'hsl(var(--sidebar-accent))',
   				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
   				border: 'hsl(var(--sidebar-border))',
   				ring: 'hsl(var(--sidebar-ring))'
   			}
   		},
   		borderRadius: {
   			lg: 'var(--radius)',
   			md: 'calc(var(--radius) - 2px)',
   			sm: 'calc(var(--radius) - 4px)'
   		},
   		keyframes: {
   			'accordion-down': {
   				from: {
   					height: '0'
   				},
   				to: {
   					height: 'var(--radix-accordion-content-height)'
   				}
   			},
   			'accordion-up': {
   				from: {
   					height: 'var(--radix-accordion-content-height)'
   				},
   				to: {
   					height: '0'
   				}
   			},
   			marquee: {
   				from: {
   					transform: 'translateX(0)'
   				},
   				to: {
   					transform: 'translateX(calc(-100% - var(--gap)))'
   				}
   			},
   			'marquee-vertical': {
   				from: {
   					transform: 'translateY(0)'
   				},
   				to: {
   					transform: 'translateY(calc(-100% - var(--gap)))'
   				}
   			}
   		},
   		animation: {
   			'accordion-down': 'accordion-down 0.2s ease-out',
   			'accordion-up': 'accordion-up 0.2s ease-out',
   			marquee: 'marquee var(--duration) infinite linear',
   			'marquee-vertical': 'marquee-vertical var(--duration) linear infinite'
   		}
   	}
   },
   // eslint-disable-next-line ts/no-require-imports
   plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
