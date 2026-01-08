<template>
    <figure>
        <div
            :class="[
                'form-group--number',
                size === 'normal' ? 'h-42' : 'h-34',
                isDisabled ? 'quantity-disabled bg-grey-9 rounded' : '',
            ]"
        >
            <button
                v-if="showIncrement"
                type="button"
                class="increment up"
                :disabled="isDisabled"
                @click.prevent="handleIncreaseQuantity"
            >
                <SvgIcon name="quantity-plus" />
            </button>
            <button
                v-if="showIncrement"
                type="button"
                class="increment down"
                :disabled="isDisabled"
                @click.prevent="handleDecreaseQuantity"
            >
                <SvgIcon name="quantity-minus" />
            </button>
            <template v-if="lazy">
                <input
                    v-if="quantityIncrement > 1"
                    v-model.number.lazy="quantity"
                    type="number"
                    class="form-control form-fixer quantity-value"
                    :min="min"
                    :max="max"
                    :step="quantityIncrement"
                    onkeydown="return false;"
                />
                <input
                    v-else
                    v-model.number.lazy="quantity"
                    type="number"
                    class="form-control form-fixer quantity-value"
                    :min="min"
                    :max="max"
                    :step="quantityIncrement"
                />
            </template>
            <template v-else>
                <input
                    v-if="quantityIncrement > 1"
                    v-model.number="quantity"
                    type="number"
                    class="form-control form-fixer quantity-value"
                    :min="min"
                    :max="max"
                    :disabled="isDisabled"
                    :step="quantityIncrement"
                    onkeydown="return false;"
                />
                <input
                    v-else
                    v-model.number="quantity"
                    type="number"
                    class="form-control quantity-value"
                    :min="min"
                    :max="max"
                    :disabled="isDisabled"
                    :step="quantityIncrement"
                />
            </template>
        </div>
    </figure>
</template>

<script>
import SvgIcon from '@components/atoms/icons/SvgIcon.vue';

export default {
    name: 'DjQuantity',
    components: {
        SvgIcon,
    },
    props: {
        quantityValue: {
            type: Number,
            default: null,
        },
        min: {
            type: Number,
            default: 1,
        },
        max: {
            type: Number,
            default: null,
        },
        quantityIncrement: {
            type: Number,
            default: 1,
        },
        showIncrement: {
            type: Boolean,
            default: false,
        },
        lazy: {
            type: Boolean,
            default: false,
        },
        isDisabled: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String,
            default: 'normal',
            validator: function (value) {
                return ['normal', 'small'].includes(value);
            },
        },
    },
    data() {
        let initialQuantity;

        if (this.quantityValue) {
            initialQuantity = this.quantityValue;
        } else if (this.min > this.quantityIncrement) {
            initialQuantity = this.min;
        } else {
            initialQuantity = this.quantityIncrement;
        }

        return {
            quantity: initialQuantity,
        };
    },
    watch: {
        quantity() {
            if (this.isDisabled) {
                return;
            }
            // Emit this information to the parents component
            this.$emit('child-quantity', this.quantity);
        },
        quantityValue() {
            this.quantity = this.quantityValue;
        },
    },
    methods: {
        handleIncreaseQuantity() {
            if (this.isDisabled) {
                return;
            }
            if (this.max === null || this.quantity < this.max) {
                this.quantity += this.quantityIncrement;
            }
        },
        handleDecreaseQuantity() {
            if (this.isDisabled) {
                return;
            }
            if (this.quantity > this.quantityIncrement && this.quantity > this.min) {
                this.quantity -= this.quantityIncrement;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.quantity-disabled {
    cursor: not-allowed;
    opacity: 0.5;
}

.form-group--number {
    max-width: 150px;
}

.h-42 {
    height: 42px;
}

.h-34 {
    height: 34px;
}

.form-control {
    color: var(--color-black);
    background-color: var(--color-white);
    height: 100%;
}

.quantity-value {
    border: 1px solid var(--color-black);
}

.quantity-value::-webkit-outer-spin-button,
.quantity-value::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
.quantity-value[type='number'] {
    -moz-appearance: textfield;
}
</style>
