<template>
    <component
        :is="type"
        :class="[sizeButton, styleB, fullWidth ? 'dj-btn--fullwidth ' + classGlobal : classGlobal]"
        @click="$emit('click')"
    >
        <template v-if="type == 'button'">
            <i
                v-if="iconDisplayed && iconPosition == 'left'"
                class="mr-2"
                :class="[textDisplayed ? null : 'ml-2', icon]"
            ></i>
            {{ textDisplayed ? text : null }}
            <i v-if="iconDisplayed && iconPosition == 'right'" class="mr-2" :class="icon"></i>
        </template>
        <template>
            <div></div>
        </template>
    </component>
</template>

<script>
export default {
    name: 'DjBtn',
    props: {
        href: {
            type: String,
            default: null,
        },
        to: {
            type: String,
            default: null,
        },
        text: {
            type: String,
            require: true,
            default: 'button',
        },
        iconColor: {
            type: Boolean,
            require: false,
            default: false,
        },
        iconDisplayed: {
            type: Boolean,
            require: false,
            default: false,
        },
        fullWidth: {
            type: Boolean,
            require: false,
            default: false,
        },
        icon: {
            type: String,
            require: false,
            default: '',
        },
        textDisplayed: {
            type: Boolean,
            require: false,
            default: true,
        },
        iconPosition: {
            type: String,
            default: 'left',
            require: false,
            validator: function (value) {
                return ['right', 'left'].indexOf(value) !== -1;
            },
        },
        styleButton: {
            type: String,
            default: 'primary',
            validator: function (value) {
                return ['primary', 'secondary', 'outline'].indexOf(value) !== -1;
            },
        },
        size: {
            type: String,
            default: 'standard',
            validator: function (value) {
                return ['x-small', 'small', 'standard', 'large', 'x-large'].indexOf(value) !== -1;
            },
        },
        shape: {
            type: String,
            default: 'button',
            validator: function (value) {
                return ['button', 'icon'].indexOf(value) !== -1;
            },
        },
    },
    computed: {
        type() {
            if (this.shape == 'icon') {
                return 'a';
            } else {
                return 'button';
            }
        },
        classGlobal() {
            return this.shape == 'button' ? 'dj-btn' : 'dj-btn--icon';
        },
    },
};
</script>
