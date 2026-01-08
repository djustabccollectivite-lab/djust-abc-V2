<template>
    <figure>
        <figcaption v-if="displayTitle">{{ $t('product.quantity') }}:</figcaption>
        <div
            v-if="buttonRound === false"
            class="quantity_to_cart form-group--number"
        >
            <button
                v-if="showIncrement"
                type="button"
                class="increment up"
                :disabled="isDisabled"
                @click.prevent="handleIncreaseQuantity"
            >
                +
            </button>
            <button
                v-if="showIncrement"
                type="button"
                class="increment down"
                :disabled="isDisabled"
                @click.prevent="handleDescreaseQuantity"
            >
                -
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
                >
                <input
                    v-else
                    v-model.number.lazy="quantity"
                    type="number"
                    class="form-control form-fixer quantity-value"
                    :min="min"
                    :max="max"
                    :step="quantityIncrement"
                >
            </template>
            <template v-else>
                <input
                    v-if="quantityIncrement > 1"
                    v-model.number="quantity"
                    type="number"
                    class="form-control form-fixer quantity-value"
                    :min="min"
                    :max="max"
                    :step="quantityIncrement"
                    onkeydown="return false;"
                >
                <input
                    v-else
                    v-model.number="quantity"
                    type="number"
                    class="form-control form-fixer quantity-value"
                    :min="min"
                    :max="max"
                    :step="quantityIncrement"
                >
            </template>
        </div>
        <div
            v-if="buttonRound === true"
            class="quantityRound"
        >
            <button
                v-if="showIncrement"
                type="button"
                class="increment-style"
                :disabled="isDisabled"
                @click.prevent="handleDescreaseQuantity"
            >
                <i class="iconsize icon-circle-minus" />
            </button>
            <template v-if="lazy">
                <input
                    v-if="quantityIncrement > 1"
                    v-model.number.lazy="quantity"
                    type="number"
                    class="input-bordernone qt-round"
                    :min="min"
                    :max="max"
                    :step="quantityIncrement"
                    onkeydown="return false;"
                >
                <input
                    v-else
                    v-model.number.lazy="quantity"
                    type="number"
                    class="input-bordernone qt-round"
                    :min="min"
                    :max="max"
                    :step="quantityIncrement"
                >
            </template>
            <template v-else>
                <input
                    v-if="quantityIncrement > 1"
                    v-model.number="quantity"
                    type="number"
                    class="input-bordernone qt-round"
                    :min="min"
                    :max="max"
                    :step="quantityIncrement"
                    onkeydown="return false;"
                >
                <input
                    v-else
                    v-model.number="quantity"
                    type="number"
                    class="input-bordernone qt-round"
                    :min="min"
                    :max="max"
                    :step="quantityIncrement"
                >
            </template>
            <button
                v-if="showIncrement"
                type="button"
                class="increment-style"
                :disabled="isDisabled"
                @click.prevent="handleIncreaseQuantity"
            >
                <i class="iconsize icon-plus-circle" />
            </button>
        </div>
    </figure>
</template>

<script>
export default {
    name: 'DjQuantity',
    props: {
        displayTitle: {
            type: Boolean,
            default: true,
        },
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
        buttonRound: {
            type: Boolean,
            default: false,
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
            // Emit this information to the parents component
            this.$emit('child-quantity', this.quantity);
        },
    },
    methods: {
        handleIncreaseQuantity() {
            if (this.max === null || this.quantity < this.max) {
                this.quantity += this.quantityIncrement;
            }
        },
        handleDescreaseQuantity() {
            if (this.quantity > this.quantityIncrement && this.quantity > this.min) {
                this.quantity -= this.quantityIncrement;
            }
        },
    },
};
</script>
