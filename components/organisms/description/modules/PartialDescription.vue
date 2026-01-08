<template>
    <div class="ps-document" v-if="description" v-html="formatedDescription"></div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api';
export default defineComponent({
    name: 'PartialDescription',
    props: {
        description: {
            type: String,
            require: true,
            default: '',
        },
    },
    data() {
        return {
            formatedDescription: ""
        }
    },
    methods: {
        remplacerRetourALaLigneParBr(texte) {
            return texte.replace(/\n/g, '<br>');
        },
    },
    created() {
        this.formatedDescription = this.remplacerRetourALaLigneParBr(this.description)
    },
});
</script>

<style lang="scss" scoped></style>
