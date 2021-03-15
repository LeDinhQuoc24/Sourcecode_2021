// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/lib/util/colors'
// import { preset } from 'vue-cli-plugin-vuetify-preset-basil/preset'


Vue.use(Vuetify)

export default new Vuetify({

    // preset,
    theme: {
        themes: {
            light: {
                primary: colors.red.darken1,
                secondary: colors.grey.darken1,
                accent: colors.shades.black,
                error: colors.red.accent3,
            },

            dark: {
                primary: colors.purple,
            },
        },
    },
    rtl: false,
    breakpoint: {
        thresholds: {
            xs: 370,
            sm: 540,
            md: 800,
            xl: 960,
            lg: 1280,
        },
    },

})
