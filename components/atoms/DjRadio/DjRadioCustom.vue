<template>
    <label :for="option">
        <input
            type="radio"
            :value="option"
            :id="option"
            @change="$parent.$emit('input', $event.target.value)"
            name="radio-input"
        />
        {{ option }}
    </label>
</template>

<script>
export default {
    name: 'DjRadioButton',
    props: {
        option: {
            required: true,
            type: [String, Number, Boolean, Object],
        },
    },
};
</script>

<style scoped>
label {
    cursor: pointer;
}
</style>
