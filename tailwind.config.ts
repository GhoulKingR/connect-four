import type {Config} from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundColor: {
                purple: '#7945FF',
                yellow: '#FFCE67',
                'dark-purple': '#5C2DD5',
                red: '#FD6687',
            },
            textColor: {
                purple: '#7945FF',
            },
            fontSize: {
                'head-m': '24px',
                'head-l': '56px',
                'head-s': '20px',
                body: '16px',
            },
            screens: {
                lg: '1064px',
            },
        },
    },
    plugins: [],
};
export default config;
