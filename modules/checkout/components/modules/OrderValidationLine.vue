<template>
    <div class="dj-product-item">
        <div class="dj-product-info">
            <div class="dj-product-img">
                <img
                    v-if="line.orderLogisticLineProductDto.thumbnail"
                    :src="line.orderLogisticLineProductDto.thumbnail"
                    :alt="productName"
                    class="image"
                />
                <img v-else :src="line.orderLogisticLineProductDto.mainImageUrl" :alt="productName" class="image" />
            </div>

            <div class="dj-product-details">
                <div class="title__h3 dj-product-name">
                    <DjLink :to="localePath('/product/' + productSku)">{{
                        line.orderLogisticLineProductDto.name
                    }}</DjLink>
                </div>
                <p class="dj-product-price" v-html="productTotalPrice"></p>

                <p class="dj-product-description">
                    {{ line.orderLogisticLineProductDto.description }}
                </p>
            </div>
        </div>

        <div class="dj-order-info">
            <dl class="dj-order-address">
                <div>
                    <dt class="titleText">{{ $t('checkout.orderValidation.shippingAddress') }}</dt>
                    <dd class="addressList">
                        <span class="address">{{ orderLogistic.shippingAddressSnapshot.fullName }}</span>
                        <span class="address">{{ orderLogistic.shippingAddressSnapshot.address }}</span>
                        <span class="address">{{ orderLogistic.shippingAddressSnapshot.city }}</span>
                    </dd>
                </div>
                <div>
                    <dt class="titleText">
                      {{ $t('checkout.orderValidation.details') }}
                    </dt>
                    <dd class="shippinginfo">
                        <span>
                          {{ $t('checkout.orderValidation.shippingType') }}: <b> {{ orderLogistic.shippingType }}</b>
                        </span>
                        <br />
                        <span>
                          {{ $t('checkout.orderValidation.supplier') }}: <b>{{ orderLogistic.supplierSnapshot.name }}</b>
                        </span>
                    </dd>
                </div>
            </dl>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ProductOrder from '@components/organisms/productCard/ProductOrder.vue';
import DjLink from '@components/atoms/DjLink/DjLink.vue';
export default {
    components: { ProductOrder, DjLink },
    props: {
        line: {
            type: Object,
            require: true,
            default: () => {},
        },
        orderLogistic: {
            type: Object,
            require: true,
            default: () => {},
        },
    },
    computed: {
        ...mapState({
            currency: (state) => state.app.currency,
        }),
        productUnitPrice() {
            return this.$core.getOrder.getProductUnitPrice(this.line, this.currency);
        },
        productTotalPrice() {
            return this.$core.getOrder.getProductTotalPrice(this.line, this.currency);
        },
        productQuantity() {
            return this.$core.getOrder.getQuantity(this.line, this.currency);
        },
        productImage() {
            return this.$core.getProduct.getProductMainImage(this.line.orderLogisticLineProductDto);
        },
        productName() {
            return this.$core.getProduct.getProductTitle(this.line.orderLogisticLineProductDto);
        },
        productSku() {
            return this.$core.getProduct.getProductSku(this.line.orderLogisticLineProductDto);
        },
        productDescription() {
            return this.$core.getProduct.getProductDescription(this.line.orderLogisticLineProductDto);
        },
    },
};
</script>

<style lang="scss" scoped>
.price {
    text-align: center;
}
.price-address {
    text-align: center;
    width: 110px;
}

.dj-product-item {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;

    @media (min-width: 640px) {
        padding-left: 1.5rem;
        padding-right: 1.5rem;
    }

    @media (min-width: 1024px) {
        display: grid;
        padding: 2rem;
        grid-template-columns: repeat(12, minmax(0, 1fr));
        column-gap: 2rem;
    }
    .dj-product-info {
        @media (min-width: 640px) {
            display: flex;
        }

        @media (min-width: 1024px) {
            grid-column: span 7 / span 7;
        }
        .dj-product-img {
            overflow: hidden;
            flex-shrink: 0;
            width: 100%;
            border-radius: 0.5rem;

            @media (min-width: 640px) {
                width: 10rem;
                height: 10rem;
            }
            .image {
                object-fit: cover;
                object-position: center;
                width: 100%;
                height: 100%;

                @media (min-width: 640px) {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .dj-product-details {
            margin-top: 1.5rem;
            @media (min-width: 640px) {
                margin-top: 0;
                margin-left: 1.5rem;
            }
            .dj-product-name {
                color: #111827;
                font-size: 1.4rem;
                line-height: 1.5rem;
                font-weight: 700;
            }
            .dj-product-price {
                margin-top: 0.5rem;
                color: #111827;
                font-size: 1.8rem;
                line-height: 1.25rem;
                font-weight: 500;
            }
            .dj-product-description {
                margin-top: 0.75rem;
                color: #6b7280;
                font-size: 1rem;
                line-height: 1.25rem;
            }
        }
    }
    .dj-order-info {
        margin-top: 1.5rem;
        @media (min-width: 1024px) {
            margin-top: 0;
            grid-column: span 5 / span 5;
        }
        .dj-order-address {
            display: grid;
            font-size: 1rem;
            line-height: 1.25rem;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            column-gap: 1.5rem;
            .title {
                color: var(--color-primary);
                font-weight: 500;
                font-size: 1.5rem;
            }
            .addressList {
                margin-top: 0.75rem;
                color: #6b7280;
                font-size: 1.25rem;
                line-height: 2.5rem;
                .address {
                    display: block;
                    font-size: 1.25rem;
                    line-height: 2.5rem;
                }
            }
            .shippinginfo {
                margin-top: 0.75rem;
                color: #6b7280;
                font-size: 1.25rem;
                line-height: 2.5rem;
            }
        }
    }
}
.titleText {
    color: var(--color-body);
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 1.25rem;
}
</style>
