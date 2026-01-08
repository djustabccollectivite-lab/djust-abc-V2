<template lang="html">
    <div class="dj-footer__links">
        <p v-for="categorie in categories" :key="categorie.id">
            <strong>{{ categorie.name }}:</strong>
            <nuxt-link v-for="item in categorie.childrenCategories" :to="'/shop/' + item.id" :key="item.id">
                {{ item.text }}
            </nuxt-link>
        </p>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'FooterLinks',
    computed: {
        ...mapState({
            categories: (state) => state.categories.categories,
        }),
    },
    data() {
        return {};
    },
};
</script>
