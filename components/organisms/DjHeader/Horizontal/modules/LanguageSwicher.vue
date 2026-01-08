<template>
    <div class="dj-dropdown language">
        <a href="#" @click.prevent>
            <img :src="selectedLocale.image" alt="" />
            {{ selectedLocale.text }}
        </a>
        <ul class="dj-dropdown-menu">
            <li v-for="language in languages" :key="language.id">
                <a href="#" @click.prevent="handleSwitchLanguage(language.code)">
                    <img :src="language.image" alt="" />
                    {{ language.text }}
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'LanguageSwicher',
    computed: {
        currentLocale() {
            return this.$i18n.locale;
        },
        selectedLocale() {
            return this.languages.find((item) => item.code === this.currentLocale);
        },
    },
    data() {
        return {
            languages: [
                {
                    id: 1,
                    code: 'en',
                    image: '/img/flag/en.png',
                    text: 'English',
                },
                {
                    id: 2,
                    code: 'fr',
                    image: '/img/flag/fr.png',
                    text: 'Français',
                },
            ],
        };
    },
    methods: {
        handleSwitchLanguage(locale) {
            this.$router.push(this.switchLocalePath(locale));
            this.$core.useCategories.getCategoriesList(locale.toUpperCase());
        },
    },
};
</script>
