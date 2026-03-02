/**
 * Vuetify Configuration - Modern Tech Theme
 * Professional dark theme with charcoal and cyan accents
 */
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

// Self-hosted fonts via @fontsource (no external CDN dependency)
import '@fontsource/plus-jakarta-sans/400.css'
import '@fontsource/plus-jakarta-sans/600.css'
import '@fontsource/plus-jakarta-sans/700.css'

// Modern Tech Theme - Dark & Professional
const customTheme = {
    dark: false,
    colors: {
        // Primary - Charcoal/Dark Gray
        primary: '#2C3E50',
        'primary-darken-1': '#1A252F',
        'primary-lighten-1': '#34495E',

        // Secondary - Darker charcoal
        secondary: '#1A252F',
        'secondary-darken-1': '#0F1419',
        'secondary-lighten-1': '#2C3E50',

        // Accent - Vibrant Cyan
        accent: '#00BCD4',
        'accent-darken-1': '#0097A7',
        'accent-lighten-1': '#4DD0E1',

        // Additional accent colors
        info: '#00BCD4',
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',

        // Surface colors
        background: '#ECEFF1',
        surface: '#FFFFFF',
        'surface-variant': '#F5F5F5',

        // Text colors
        'on-background': '#212121',
        'on-surface': '#212121',
        'on-primary': '#FFFFFF',
        'on-secondary': '#FFFFFF',
        'on-accent': '#FFFFFF',
    },
}

const vuetify = createVuetify({
    components,
    directives,

    theme: {
        defaultTheme: 'customTheme',
        themes: {
            customTheme,
        },
    },

    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },

    defaults: {
        global: {
            style: 'font-family: "Plus Jakarta Sans", sans-serif',
        },
        VBtn: {
            variant: 'flat',
            color: 'primary',
            style: 'text-transform: none; letter-spacing: 0.5px; font-weight: 500;',
            elevation: 2,
            rounded: 'lg',
        },
        VAppBar: {
            elevation: 0,
            VBtn: {
                variant: 'text',
                color: 'white',
                rounded: 'lg',
            },
        },
        VToolbar: {
            VBtn: {
                variant: 'text',
                rounded: 'lg',
            },
        },
        VCard: {
            elevation: 3,
            rounded: 'lg',
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
            rounded: 'lg',
            elevation: 1,
        },
        VAvatar: {
            rounded: 'lg',
        },
    },
})

export default vuetify
