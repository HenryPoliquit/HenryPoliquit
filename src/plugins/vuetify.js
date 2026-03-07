/**
 * Vuetify Configuration — Editorial Warmth Theme
 * Two themes: warmLight (ivory/cream) and warmDark (espresso/charcoal)
 * Accent: amber gold throughout
 */
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

import '@fontsource/plus-jakarta-sans/400.css'
import '@fontsource/plus-jakarta-sans/600.css'
import '@fontsource/plus-jakarta-sans/700.css'

// ── Light theme: warm ivory + cream surfaces ──────────────────────────────
const warmLight = {
    dark: false,
    colors: {
        primary: '#8B6914',
        'primary-darken-1': '#6B4F0E',
        'primary-lighten-1': '#A67C1A',

        secondary: '#6B6560',
        'secondary-darken-1': '#524E49',
        'secondary-lighten-1': '#857F79',

        accent: '#D4890A',
        'accent-darken-1': '#B5720A',
        'accent-lighten-1': '#E8A030',

        background: '#FAF7F2',
        surface: '#F0EBE1',
        'surface-variant': '#E8E0D0',
        'surface-bright': '#FFFFFF',

        'on-background': '#1C1A18',
        'on-surface': '#1C1A18',
        'on-surface-variant': '#6B6560',
        'on-primary': '#FFFFFF',
        'on-secondary': '#FFFFFF',
        'on-accent': '#1C1A18',

        info: '#5B8DD9',
        success: '#4A7C59',
        warning: '#D4890A',
        error: '#C0392B',
    },
}

// ── Dark theme: deep espresso + warm charcoal surfaces ───────────────────
const warmDark = {
    dark: true,
    colors: {
        primary: '#D4890A',
        'primary-darken-1': '#B5720A',
        'primary-lighten-1': '#E8A030',

        secondary: '#9E9589',
        'secondary-darken-1': '#7A7168',
        'secondary-lighten-1': '#B8B0A7',

        accent: '#F0A832',
        'accent-darken-1': '#D4890A',
        'accent-lighten-1': '#F5C06A',

        background: '#18140F',
        surface: '#221E17',
        'surface-variant': '#2D271E',
        'surface-bright': '#3A3228',

        'on-background': '#F5F0E8',
        'on-surface': '#F5F0E8',
        'on-surface-variant': '#9E9589',
        'on-primary': '#1C1A18',
        'on-secondary': '#F5F0E8',
        'on-accent': '#1C1A18',

        info: '#7BAFD4',
        success: '#6AB07A',
        warning: '#F0A832',
        error: '#E57373',
    },
}

const vuetify = createVuetify({
    components,
    directives,

    theme: {
        defaultTheme: 'warmDark',
        themes: {
            warmLight,
            warmDark,
        },
    },

    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: { mdi },
    },

    defaults: {
        VBtn: {
            variant: 'flat',
            color: 'accent',
            style: 'text-transform: none; letter-spacing: 0.5px; font-weight: 500;',
            elevation: 2,
            rounded: 'lg',
        },
        VAppBar: {
            elevation: 0,
            VBtn: {
                variant: 'text',
                rounded: 'lg',
            },
        },
        VCard: {
            elevation: 2,
            rounded: 'xl',
        },
        VTextField: {
            variant: 'outlined',
            density: 'comfortable',
            color: 'accent',
            rounded: 'lg',
        },
        VTextarea: {
            variant: 'outlined',
            density: 'comfortable',
            color: 'accent',
            rounded: 'lg',
        },
        VSelect: {
            variant: 'outlined',
            density: 'comfortable',
            color: 'accent',
            rounded: 'lg',
        },
        VChip: {
            rounded: 'pill',
            elevation: 0,
        },
        VAvatar: {
            rounded: 'lg',
        },
    },
})

export default vuetify
