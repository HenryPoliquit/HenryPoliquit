/**
 * Vuetify Configuration — "Rate Card" theme
 *
 * The site is set like an insurance premium rate card: issued-document stock,
 * hairline rules, figures in tabular mono. Oxblood is the issuer stamp and is
 * spent only on links and the one figure that matters. Green means a thing is
 * genuinely running — it is never decorative.
 *
 * THIS FILE IS THE PALETTE — swap colors here only.
 * (Theme names stay warmLight/warmDark: the `portfolio-theme` localStorage key
 * and the Navbar toggle depend on those strings.)
 */
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

// ── Light: grey-green document stock, oxblood stamp ───────────────────────
const warmLight = {
    dark: false,
    colors: {
        primary: '#6E242C',
        'primary-darken-1': '#571B22',
        'primary-lighten-1': '#8C2F39',

        secondary: '#5A6259',
        'secondary-darken-1': '#434A43',
        'secondary-lighten-1': '#7B837A',

        accent: '#8C2F39',
        'accent-darken-1': '#6E242C',
        'accent-lighten-1': '#A94551',

        background: '#E8EAE3',
        surface: '#DDE0D6',
        'surface-variant': '#C3C8BC',
        'surface-bright': '#F2F4EE',

        'on-background': '#141A18',
        'on-surface': '#141A18',
        'on-surface-variant': '#5A6259',
        'on-primary': '#F2F4EE',
        'on-secondary': '#F2F4EE',
        'on-accent': '#F2F4EE',

        info: '#8C2F39',
        success: '#2E6F4E',
        warning: '#8A6A1E',
        error: '#A32B27',
    },
}

// ── Dark: the same document under a lamp ──────────────────────────────────
const warmDark = {
    dark: true,
    colors: {
        primary: '#D0757E',
        'primary-darken-1': '#B85C66',
        'primary-lighten-1': '#DE9199',

        secondary: '#909C93',
        'secondary-darken-1': '#737F76',
        'secondary-lighten-1': '#AFB9B1',

        accent: '#D0757E',
        'accent-darken-1': '#B85C66',
        'accent-lighten-1': '#DE9199',

        background: '#101411',
        surface: '#171C18',
        'surface-variant': '#28302A',
        'surface-bright': '#222922',

        'on-background': '#E8EAE3',
        'on-surface': '#E8EAE3',
        'on-surface-variant': '#909C93',
        'on-primary': '#101411',
        'on-secondary': '#101411',
        'on-accent': '#101411',

        info: '#D0757E',
        success: '#5FA37E',
        warning: '#D9A441',
        error: '#E0796F',
    },
}

// Components are auto-imported by vite-plugin-vuetify (see vite.config.js).
const vuetify = createVuetify({
    directives,

    theme: {
        defaultTheme: 'warmDark',
        themes: {
            warmLight,
            warmDark,
        },
    },

    // mdi-svg: icon paths are imported per-use from @mdi/js and tree-shaken,
    // instead of shipping the ~1.2 MB @mdi/font webfont for ~20 glyphs.
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: { mdi },
    },

    // A rate card has no rounded corners and no drop shadows. Typography and
    // rules do the work; see `.v-btn` in assets/style.css for the label styling.
    defaults: {
        VBtn: {
            variant: 'flat',
            color: 'accent',
            elevation: 0,
            rounded: 0,
        },
        VAppBar: {
            elevation: 0,
            VBtn: { variant: 'text', rounded: 0 },
        },
        VCard: {
            elevation: 0,
            rounded: 0,
        },
        VTextField: {
            variant: 'outlined',
            density: 'comfortable',
            color: 'accent',
            rounded: 0,
        },
        VTextarea: {
            variant: 'outlined',
            density: 'comfortable',
            color: 'accent',
            rounded: 0,
        },
        VSelect: {
            variant: 'outlined',
            density: 'comfortable',
            color: 'accent',
            rounded: 0,
        },
        VChip: {
            rounded: 0,
            elevation: 0,
        },
        VAvatar: {
            rounded: 0,
        },
    },
})

export default vuetify
