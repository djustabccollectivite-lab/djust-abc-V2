<template lang="html">
    <client-only>
        <Validation />
    </client-only>
</template>

<script>
import Validation from '@components/templates/auth/validation.vue';

export default {
    name: 'ValidationPage',
    auth: false,

    transition: 'zoom',
    layout(context) {
        return context.$config.mode == 'private' ? 'blank' : context.store.state.app.layoutType;
    },
    components: {
        Validation,
    },
};
</script>

<style lang="scss" scoped>
.dj-tab-list {
    padding-left: 0;
}
</style>
