<template>
    <tr class="trclass">
        <td>
            <v-checkbox
                class="ml-3"
                @click="selectCheckbox()"
                v-model="selectVariant"
                :value="buyinglistItem"
                height="50"
            ></v-checkbox>
        </td>
        <td>
            <ProductCart
                :productId="$core.getCart.getProductId(buyinglistItem)"
                :productSku="$core.getCart.getProductSku(buyinglistItem)"
                :productImage="$core.getCart.getProductImage(buyinglistItem)"
                :productName="$core.getCart.getProductName(buyinglistItem)"
                :supplierName="$core.getCart.getSupplierName(buyinglistItem)"
                :attributs="$core.getCart.getProductAttributes(buyinglistItem)"
                :offerQuantityInStock="checkStatusOfOffer ? $core.getCart.getOfferStock(buyinglistItem) : 0"
            />
        </td>
        <td
            class="price"
            v-html="$core.getCart.getProductUnitPrice(buyinglistItem, $core.getApp.getCurrency(app))"
        ></td>
        <td>
            <DjQuantity
                @child-quantity="quantityValue"
                :quantityIncrement="$core.getCart.getProductPerPack(buyinglistItem)"
                :quantityValue="quantity"
                :displayTitle="false"
                :showIncrement="true"
            />
            <div v-if="minOrder && minOrder > 1" class="minorder">
                {{
                    $tc('product.tabs.offers.minoforder', minOrder, {
                        minOrder,
                    })
                }}
            </div>
        </td>
        <td
            class="price"
            v-html="$core.getCart.getProductTotalPrice(buyinglistItem, $core.getApp.getCurrency(app))"
        ></td>
    </tr>
</template>
<script>
import ProductCart from '@components/organisms/productCard/ProductCart.vue';
import DjButtonAddToCart from '@components/molecules/DjButtonAddToCart/DjButtonAddToCart.vue';
import DjButtonAddToQuote from '@components/molecules/DjButtonAddToQuote/DjButtonAddToQuote.vue';
import DjQuantity from '@components/atoms/DjQuantity/DjQuantity.vue';
import DjButtonAddToBuyingList from '@components/molecules/DjButtonAddToBuyingList/DjButtonAddToBuyingList.vue';
export default {
    name: 'BuyingListTableItem',
    components: { ProductCart, DjButtonAddToCart, DjButtonAddToQuote, DjQuantity, DjButtonAddToBuyingList },
    props: {
        buyinglistItem: {
            type: Object,
            default: () => {},
        },
        buyingListId: {
            type: String,
            require: true,
            default: '',
        },
        index: {
            type: Number,
            default: 0,
        },
    },

    data() {
        return {
            minOrder: 1,
            quantity: 1,
            selectVariant: '',
        };
    },
    created() {
        this.$nuxt.$on('resetSelectItems', () => {
            this.selectVariant = '';
        });
        this.$nuxt.$on('selectAll', (buyingListItems, idList) => {
            if (idList === this.buyingListId) {
                buyingListItems.forEach((buyingList) => {
                    if (buyingList.id === this.buyinglistItem.id) {
                        this.selectVariant = buyingList;
                        this.selectCheckbox();
                    }
                });
            }
        });

        this.quantity = this.buyinglistItem.quantity;
        this.minOrder = this.buyinglistItem.offerInventory.minOrderQuantity;
    },
    methods: {
        quantityValue(params) {
            this.quantity = params;
            const buyingListCart = {
                buyingListtId: this.buyingListId,
                data: [
                    {
                        offerPriceId: this.buyinglistItem.offerPrice.id,
                        quantity: this.quantity,
                    },
                ],
            };
            this.$core.useWishlist.addItemToWishlist(buyingListCart);
        },
        selectCheckbox() {
            if (this.selectVariant) {
                this.selectVariant.index = this.index;
            }
            this.$nuxt.$emit('selectedBuyingListItem', this.index, this.selectVariant, this.buyingListId);
        },
    },

    computed: {
        app() {
            return this.$store.state.app;
        },
        stock() {
            return this.$core.getOffer.getOfferStock(this.buyinglistItem);
        },
        checkStatusOfOffer() {
            return this.buyinglistItem.offerInventory.status !== 'INACTIVE';
        },
    },
};
</script>
<style lang="scss" scoped>
.minorder {
    font-size: 12px;
}
.trclass {
    height: 150px;
}
</style>
