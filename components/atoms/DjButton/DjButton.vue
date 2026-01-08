<template>
    <div>
        <button
            v-if="shape === 'button'"
            :disabled="isDisabled"
            class="dj-btn"
            :class="[sizeButton, styleB, isLoading ? 'button--loading' : null, fullWidth ? 'dj-btn--fullwidth' : null]"
            @click="$emit('click')"
        >
            <span class="button__text">
                <i
                    v-if="iconDisplayed && iconPosition == 'left'"
                    class="mr-2"
                    :class="[textDisplayed ? null : 'ml-2', icon]"
                ></i>
                {{ textDisplayed ? text : null }}
                <i v-if="iconDisplayed && iconPosition == 'right'" class="mr-2" :class="icon"></i>
            </span>
        </button>

        <a
            v-if="shape === 'icon'"
            data-toggle="tooltip"
            data-placement="top"
            :aria-disabled="isDisabled"
            :class="[styleB, isLoading ? 'button--loading' : null]"
            class="dj-btn--icon"
            :title="text"
            :style="color ? `color:${color}` : ''"
        >
            <i :class="icon" class="iconColor"></i>
        </a>
    </div>
</template>

<script>
export default {
    name: 'DjButton',
    props: {
        text: {
            type: String,
            require: true,
            default: 'button',
        },
        color: {
            type: String,
            default: '',
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
        isDisabled: {
            type: Boolean,
            default: false,
        },
        isLoading: {
            type: Boolean,
            default: false,
        },
        iconPosition: {
            type: String,
            default: 'left',
            require: false,
            validator: function (value) {
                return ['right', 'left'].includes(value);
            },
        },
        styleButton: {
            type: String,
            default: 'primary',
            validator: function (value) {
                return ['primary', 'secondary', 'outline', 'light', 'slide-primary'].includes(value);
            },
        },
        size: {
            type: String,
            default: 'standard',
            validator: function (value) {
                return ['x-small', 'small', 'standard', 'large', 'x-large'].includes(value);
            },
        },
        shape: {
            type: String,
            default: 'button',
            validator: function (value) {
                return ['button', 'icon'].includes(value);
            },
        },
    },
    computed: {
        styleB() {
            let result = '';
            switch (this.styleButton) {
                case 'primary':
                    result = 'dj-btn--primary';
                    break;
                case 'secondary':
                    result = 'dj-btn--secondary';
                    break;
                case 'outline':
                    result = 'dj-btn--outline';
                    break;
                case 'light':
                    result = 'dj-btn--light';
                    break;
                case 'slide-primary':
                    result = 'dj-btn--slide-primary';
                    break;
                default:
                    result = '';
                    break;
            }
            return result;
        },
        sizeButton() {
            let resultSize = 'dj-btn';
            switch (this.size) {
                case 'x-small':
                    resultSize = 'dj-btn--xsm';
                    break;
                case 'small':
                    resultSize = 'dj-btn--sm';
                    break;
                case 'standard':
                    resultSize = 'dj-btn';
                    break;
                case 'large':
                    resultSize = 'dj-btn--lg';
                    break;
                case 'x-large':
                    resultSize = 'dj-btn--xl';
                    break;
            }
            return resultSize;
        },
    },
};
</script>
<style lang="scss">
//TODO Add Class isDisabled
.dj-btn {
    position: relative;
}

.dj-btn--icon {
    padding: 21 px;
}
</style>
