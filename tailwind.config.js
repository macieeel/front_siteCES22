/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
    content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            animation: {
                page: 'fadeIn 1s both',
            },
            keyframes: {
                fadeIn: {
                    '0%': {
                        opacity: 0,
                        left: '-100px',
                    },
                    '100%': {
                        opacity: 1,
                        left: '0px',
                    },
                },
            },
            colors: {
                primary: '#3f3cbb',
                background: '#F9F8F8',
                'light-gray': '#E7E5E4',
            },
        },
    },
    plugins: [],
}
