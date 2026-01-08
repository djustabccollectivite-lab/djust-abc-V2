<template>
    <div>
        <button
            v-if="'button' === shape"
            :disabled="isDisabled"
            :class="[
                'button px-3',
                buttonStyle,
                color,
                isDisabled ? 'btn-disabled' : '',
                fullWidth ? 'w-full' : '',
                rounded ? 'btn-rounded' : '',
            ]"
        >
            <SvgIcon
                v-if="iconDisplayed && 'left' === iconPosition"
                :name="icon"
                :class="['mr-2 relative-top', textDisplayed ? '' : 'ml-2']"
                :color="iconColor"
            />
            {{ textDisplayed ? text : null }}
            <SvgIcon
                v-if="iconDisplayed && 'right' === iconPosition"
                :name="icon"
                class="relative-top"
                :color="iconColor"
            />
            <span v-if="true === isLoading" class="loader">
                <v-progress-circular :size="20" :width="3" indeterminate></v-progress-circular>
            </span>
        </button>
        <a
            v-if="'icon' === shape"
            data-toggle="tooltip"
            data-placement="top"
            :aria-disabled="isDisabled"
            :title="text"
            :class="['dj-btn--icon', buttonStyle, 'shadow-btn', isDisabled ? 'btn-disabled' : '']"
            :style="color ? `color:${color}` : ''"
        >
            <SvgIcon :name="icon" :color="iconColor" />
        </a>
    </div>
</template>

<script>
import SvgIcon from '@components/atoms/icons/SvgIcon.vue';

export default {
    name: 'DjButton',
    components: { SvgIcon },
    props: {
        shape: {
            type: String,
            default: 'button',
            validator: function (value) {
                return ['button', 'icon'].includes(value);
            },
        },
        variant: {
            type: String,
            default: 'primary',
            validator: function (value) {
                return ['contained', 'outlined', 'light'].includes(value);
            },
        },
        text: {
            type: String,
            required: true,
            default: '',
        },
        color: {
            type: String,
            default: '',
        },
        iconDisplayed: {
            type: Boolean,
            required: false,
            default: false,
        },
        fullWidth: {
            type: Boolean,
            required: false,
            default: false,
        },
        rounded: {
            type: Boolean,
            required: false,
            default: false,
        },
        icon: {
            type: String,
            required: false,
            default: '',
        },
        textDisplayed: {
            type: Boolean,
            required: false,
            default: true,
        },
        isDisabled: {
            type: Boolean,
            default: false,
        },
        iconPosition: {
            type: String,
            default: 'left',
            required: false,
            validator: function (value) {
                return ['right', 'left'].includes(value);
            },
        },
        iconColor: {
            type: String,
            required: false,
            default: '',
        },
        isLoading: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    computed: {
        buttonStyle() {
            let result = '';
            switch (this.variant) {
                case 'contained':
                    result = 'btn-contained';
                    break;
                case 'outlined':
                    result = 'btn-outlined';
                    break;
                case 'light':
                    result = '';
                    break;
                default:
                    result = '';
                    break;
            }
            return result;
        },
    },
};
</script>

<style lang="scss" scoped>
.button {
    height: 42px;
    border-radius: 4px;
}

.btn-contained {
    background-color: var(--color-primary);
    font-weight: 700;
    color: var(--color-black);
}

.btn-outlined {
    border: 1px solid var(--color-black);
    font-weight: 700;
    color: var(--color-black);
}

.btn-rounded {
    border-radius: 21px;
}
.loader {
    position: absolute;
    margin-left: 10px;
}
.btn-disabled {
    background-color: var(--color-grey-nuance-6);
    cursor: not-allowed;
    color: var(--color-grey);
}
.dj-btn--icon {
    border-radius: 3px;
}
.shadow-btn {
    box-shadow: var(--shadow-card);
}
</style>
