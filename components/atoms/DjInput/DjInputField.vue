<template>
    <div
        v-will-change="'font-size'"
        class="dj-input dj-input--outline"
        :class="{
            'has-text': !!value,
            invalid: !valid,
        }"
        :data-testid="name"
    >
        <div class="dj-input__wrapper" :class="errorMessage !== '' ? 'dj-input__wrapper__error' : null">
            <input
                :id="idWithoutWhitespace"
                v-focus
                v-bind="$attrs"
                :value="value"
                :required="required"
                :disabled="disabled"
                :name="name"
                :class="{ 'dj-input--is-password': isPassword }"
                :type="inputType"
                v-on="listeners"
            />
            <label :class="{ 'display-none': !label }" class="dj-input__label will-change" :for="name">
                <slot name="label" v-bind="{ label }">{{ label }}</slot>
            </label>
            <slot
                v-bind="{
                    icon,
                    isPasswordVisible,
                    switchVisibilityPassword,
                }"
                name="icon"
            >
                <DjButton v-if="icon" class="dj-input__button sf-button--pure" @click="$emit('click:icon')">
                    <DjIcon :color="icon.color" :size="icon.size" :icon="icon.icon" class="dj-input__icon"> </DjIcon>
                </DjButton>
                <DjButton
                    v-else-if="hasShowPassword"
                    :class="{ 'display-none': !isPassword }"
                    class="dj-input__password-button"
                    type="button"
                    aria-label="switch-visibility-password"
                    :aria-pressed="isPasswordVisible.toString()"
                    @click="switchVisibilityPassword"
                >
                    <DjIcon
                        class="dj-input__password-icon"
                        :class="{
                            hidden: !isPasswordVisible,
                        }"
                        icon="show_password"
                        size="1.5rem"
                    ></DjIcon>
                </DjButton>
            </slot>
        </div>
        <div class="dj-input__error-message">
            <transition name="sf-fade">
                <slot name="error-message" v-bind="{ errorMessage }">
                    <div :class="{ 'display-none': valid }">{{ errorMessage }}</div></slot
                >
            </transition>
        </div>
    </div>
</template>
<script>
import DjIcon from '@components/atoms/DjIcon/DjIcon.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import { focus, willChange } from '@/utilities/directives.js';
export default {
    name: 'SfInput',
    directives: {
        focus,
        willChange,
    },
    components: { DjIcon, DjButton },
    inheritAttrs: false,
    props: {
        value: {
            type: [String, Number],
            default: '',
        },
        label: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            default: 'text',
        },
        icon: {
            type: Object,
            default: () => {},
        },
        valid: {
            type: Boolean,
            default: true,
        },
        errorMessage: {
            type: String,
            default: '',
        },
        required: {
            type: Boolean,
            default: false,
            description: 'Native input required attribute',
        },
        disabled: {
            type: Boolean,
            default: false,
            description: 'Native input disabled attribute',
        },
        hasShowPassword: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isPasswordVisible: false,
            inputType: '',
            isNumberTypeSafari: false,
        };
    },
    computed: {
        listeners() {
            return {
                ...this.$listeners,
                input: (event) => this.$emit('input', event.target.value),
            };
        },
        isPassword() {
            return this.type === 'password' && this.hasShowPassword;
        },
        idWithoutWhitespace() {
            return this.name.replace(/\s/g, '');
        },
    },
    watch: {
        type: {
            immediate: true,
            handler: function (type) {
                let inputType = type;
                // Safari has bug for number input
                if (typeof window !== 'undefined' || typeof document !== 'undefined') {
                    const ua = navigator.userAgent.toLocaleLowerCase();
                    if (ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1 && type === 'number') {
                        this.isNumberTypeSafari = true;
                        inputType = 'text';
                    }
                }
                this.inputType = inputType;
            },
        },
        value: {
            immediate: true,
            handler: function (value) {
                if (!this.isNumberTypeSafari) return;
                if (isNaN(value)) {
                    this.$emit('input');
                }
            },
        },
    },
    methods: {
        switchVisibilityPassword() {
            if (this.type !== 'password') return;
            this.isPasswordVisible = !this.isPasswordVisible;
            this.inputType = this.isPasswordVisible ? 'text' : 'password';
        },
    },
};
</script>
<style lang="scss"></style>
