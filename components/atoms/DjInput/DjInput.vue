<template>
    <v-text-field v-bind="{ ...$props, ...$attrs }" v-on="$listeners">
        <template #label>
            <slot name="label">
                {{ label }}
            </slot>
        </template>
    </v-text-field>
</template>

<script>
export default {
    name: 'DjInput',
    props: {
        label: {
            type: String,
            default: '',
        },
        labelOutside: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped></style>
