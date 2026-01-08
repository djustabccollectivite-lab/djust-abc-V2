<template functional lang="html">
    <div
        :class="[data.class, data.staticClass, 'dj-text']"
        :style="[data.style, data.staticStyle]"
        v-bind="data.attrs"
        v-on="listeners"
        v-if="text"
        v-html="text"
    >
        <slot />
    </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api';
export default defineComponent({
    name: 'DjText',
    props: {
        text: {
            type: String,
            require: true,
            default: '',
        },
    },
});
</script>

<style lang="scss" scoped>
.dj-text {
    color: var(--color-body);
}
</style>
