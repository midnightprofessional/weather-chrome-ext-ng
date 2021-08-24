module.exports = {
    mode: 'jit',
    purge: {
        enabled: true,
        // enabled: process.env.TAILWIND_MODE === 'build',
        content: ['./projects/ng/src/**/*.{html,ts}']
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        container: {
            padding: '2rem',
        },
        fontFamily: {
            'sans': ['Open Sans', 'ui-sans-serif', 'system-ui'],
        },
        extend: {
            width: {
                '112': '39em',
            },
            height: {
                '112': '39em',
            },
        },
    },
    variants: {},
    plugins: [require('daisyui')]
};