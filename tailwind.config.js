/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{vue,js,ts,jsx,tsx}",
        "./components/**/*.{vue,js,ts,jsx,tsx}",
        "./layouts/**/*.{vue,js,ts,jsx,tsx}",
        "./pages/**/*.{vue,js,ts,jsx,tsx}",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
        "./app.vue"
    ],
    theme: {
        fontSize: 16,
        screens: {
            sm: '375px',
            md: '768px',
            lg: '1024px',
            xl: '1240px',
        },
        extend: {
            margin: {
                '60': '60px',
                '100': '100px',
            },
            padding: {
                '100': '100px',
                '60': '60px',
            },
            fontFamily: {
                sans: ['Onest', 'Manrope', 'sans-serif'],
                onest: ['Onest', 'sans-serif'],
                manrope: ['Manrope', 'sans-serif'],
            },
            container: {
                center: true,
                padding: '20px',
                screens: {
                    DEFAULT: '1272px',
                    sm: '640px',
                    md: '768px',
                    lg: '1024px',
                    xl: '1240px',
                },
            },
            // Цвета сайта
            colors: {
                // Голубые
                darkGreyBlue: '#495965',
                lightGreyBlue: '#6C7684',
                // Коричневые
                brown: '#7A5946',
                darkBrown: '#664938',
                lightBrown: '#CABCB5',
                // Серые
                grey: '#E8E8E8',
                darkGrey: '#D9D9D9',
                lightGrey: '#F3F4F8',
                // Серые
                green: '#9EC24B',
                dark: '#222222',
            },
            fontSize: {
                // Headline
                'headline-1': ['48px', '1.2'],
                'headline-2': ['38px', '1.2'],
                'headline-3': ['32px', '1.2'],
                'headline-4': ['24px', '1.2'],
                'headline-5': ['20px', '1.2'],
                'headline-6': ['26px', '1.2'],
                // Body
                'body-1': ['18px', '1.4'],
                'body-2': ['16px', '1.4'],
                'body-3': ['16px', '1.4'],
                'body-4': ['14px', '1.4'],
                'body-5': ['12px', '1.4'],
                'body-6': ['10px', '1.4'],
            },
            fontWeight: {
                regular: '400',
                medium: '500',
                semibold: '600',
                bold: '700',
            },
            borderRadius: {
                'xs': '2px',
                'sm': '4px',
                'md': '8px',
                'lg': '12px',
                'xl': '16px',
                '2xl': '24px',
                '3xl': '32px',
                'full': '9999px',
                'card': '20px',
                'mobile': '15px',
            },
        },
    },
    plugins: [],
}