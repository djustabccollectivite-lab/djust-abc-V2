<template>
    <div class="input-group">
        <DjRadioButton v-for="option in options" :option="option" :key="option" />
        <slot />
    </div>
</template>

<script>
import DjRadioButton from '@components/atoms/DjRadio/DjRadio.vue';

export default {
    name: 'DjRadionButtonGroup',
    components: {
        DjRadioButton,
    },
    props: {
        options: {
            required: true,
            type: Array,
        },
    },
};
</script>

<style scoped>
.input-group {
    width: 35%;
    margin: 20px auto;
    padding: 15px 20px;
    border: 1px solid black;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
}

label {
    cursor: pointer;
}
</style>
