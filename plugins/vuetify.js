import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

const vuetify = new Vuetify({
    theme: {
        themes: {
            light: {
                primary: 'red',
                secondary: '#b0bec5',
                accent: '#8c9eff',
                error: '#b71c1c',
                background: '#f9f9f9', // Not automatically applied
            },
        },
    },
});
