<template>
    <transition name="buyingList">
        <div class="dj-section__content">
            <div class="table-responsive">
                <div class="buying-panel-button mb-5">
                    <v-checkbox
                        v-if="buyinglistItems?.length > 0"
                        class="ml-4"
                        @click="selectAll()"
                        v-model="selectAllBuyingList"
                        :label="$t('buyingList.selectAll')"
                        height="50"
                    >
                    </v-checkbox>
                    <div v-if="selectBuyingList[currentlyBuyingList]?.buyingListItems[0]" class="actionBuyingList">
                        <div @click.prevent="modalCopyItem = true">
                            <DjButton
                                :text="$t('buyingList.copy')"
                                class="mr-5 mt-5"
                                :iconDisplayed="true"
                                icon="icon-paper-plane"
                                iconPosition="left"
                                :styleButton="'secondary'"
                            />
                        </div>
                        <div @click.prevent="handleRemoveItemFromWishlist()">
                            <DjButton
                                :text="$t('account.address.delete')"
                                class="mr-5 mt-5"
                                :iconDisplayed="true"
                                icon="icon-trash2"
                                iconPosition="left"
                                :styleButton="'secondary'"
                            />
                        </div>
                        <DjButtonAddToCart
                            :styleButton="'secondary'"
                            :products="$core.getWishlist.getBuyingListToOrder(selectBuyingList[currentlyBuyingList])"
                            :styleB="'button'"
                            class="mr-5 mt-5"
                        />
                        <DjButtonAddToQuote
                            v-if="$core.useQuote.IsActive()"
                            :quotesLines="productForQuotes"
                            class="mr-5 mt-5"
                            :styleButton="'secondary'"
                        />
                    </div>
                </div>
                <table class="table dj-table--whishlist">
                    <tbody v-for="(buyinglistItem, index) in buyinglistItems" :key="buyinglistItem.id">
                        <BuyingListTableItem
                            :buyinglistItem="buyinglistItem"
                            :buyingListId="buyingListId"
                            :index="index"
                        />
                    </tbody>
                </table>
                <v-dialog v-model="modalCopyItem" width="500">
                    <DjCard
                        :title="$t('product.buttonAddToBuyingList.chooseMessage')"
                        headerColor="var(--color-secondary)"
                        :withActions="true"
                    >
                        <div
                            v-if="!createNewBuyingList"
                            v-for="wishlist in wishlists"
                            :key="wishlist.id"
                            class="wishlist-checkbox-container"
                        >
                            <v-checkbox
                                v-if="wishlist.id !== buyingListId"
                                v-model="checkedWishlistIds"
                                :value="wishlist.id"
                                :label="wishlist.name"
                                class="v-checkbox-component"
                            />
                        </div>
                        <div v-if="createNewBuyingList">
                            <DjInput
                                v-model="buyinglistName"
                                :label="$t('buyingList.label')"
                                class="mr-4 mb-5"
                                dense
                                outlined
                                hide-details
                            />
                            <a @click="createNewBuyingList = false">
                                {{ $t('product.buttonAddToBuyingList.selectMessage') }}
                            </a>
                            <div @click="handleCreateWishlist()">
                                <DjButton
                                    :isDisabled="haveBuyingListName"
                                    :text="$t('product.buttonAddToBuyingList.createButton')"
                                    class="mr-5 mt-5"
                                    :iconDisplayed="true"
                                    iconPosition="left"
                                    :styleButton="'secondary'"
                                    :fullWidth="true"
                                />
                            </div>
                        </div>
                        <a v-if="!createNewBuyingList" @click="createNewBuyingList = true">
                            {{ $t('product.buttonAddToBuyingList.createMessage') }}
                        </a>

                        <div @click="validateToCopyItem" v-if="!createNewBuyingList">
                            <DjButton
                                :isDisabled="disabledModalButtonValidate"
                                :text="$t('account.quotes.validate')"
                                class="mr-5 mt-5"
                                :iconDisplayed="true"
                                iconPosition="left"
                                :styleButton="'secondary'"
                                :fullWidth="true"
                            />
                        </div>
                    </DjCard>
                </v-dialog>
            </div>
        </div>
    </transition>
</template>

<script>
import { mapState } from 'vuex';
import DjCard from '@components/molecules/DjCard/DjCard.vue';
import DjButtonAddToCart from '@components/molecules/DjButtonAddToCart/DjButtonAddToCart.vue';
import DjButtonAddToQuote from '@components/molecules/DjButtonAddToQuote/DjButtonAddToQuote.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjInput from '@components/atoms/DjInput/DjInput.vue';
import BuyingListTableItem from '@modules/buyingList/components/modules/buyingListTableItem.vue';
export default {
    name: 'BuyingListTable',
    transition: 'buyingList',
    components: {
        DjButtonAddToCart,
        DjButtonAddToQuote,
        BuyingListTableItem,
        DjButton,
        DjCard,
        DjInput,
    },
    props: {
        buyinglistItems: {
            type: Array,
            require: true,
            default: () => [],
        },
        buyingListId: {
            type: String,
            require: true,
            default: '',
        },
    },
    data() {
        return {
            selectBuyingList: [],
            modalCopyItem: false,
            checkedWishlistIds: [],
            selectAllBuyingList: false,
            createNewBuyingList: false,
            buyinglistName: '',
        };
    },
    computed: {
        ...mapState({
            wishlists: (state) => state.wishlist.items,
        }),
        app() {
            return this.$store.state.app;
        },
        disabledModalButtonValidate() {
            if (this.checkedWishlistIds.length > 0) return false;
            return true;
        },
        currentlyBuyingList() {
            for (let index = 0; index < this.selectBuyingList.length; index++) {
                if (this.selectBuyingList[index].idBuyingList === this.buyingListId) {
                    return index;
                }
            }
        },
        haveBuyingListName() {
            if (this.buyinglistName) {
                return false;
            }
            return true;
        },
        productForQuotes() {
            const masterQuote = [];
            this.selectBuyingList[this.currentlyBuyingList].buyingListItems.forEach((item) => {
                masterQuote.push({
                    productVariantId: item.offerInventory.variant.id,
                    quantity: item.quantity,
                });
            });
            return masterQuote;
        },
    },
    created() {
        this.$nuxt.$on('selectedBuyingListItem', (index, val, buyingListId) => {
            if (val) {
                let findIt = false;
                this.selectBuyingList.forEach((buyingList) => {
                    if (buyingList?.idBuyingList === buyingListId) {
                        buyingList.buyingListItems.push(val);
                        findIt = true;
                    }
                });
                if (!findIt) {
                    let newBuyingListId = {
                        idBuyingList: buyingListId,
                        buyingListItems: [val],
                    };
                    this.selectBuyingList.push(newBuyingListId);
                }
            } else {
                let findIndex;
                for (let i = 0; i < this.selectBuyingList.length; i++) {
                    if (this.selectBuyingList[i].idBuyingList === buyingListId) {
                        findIndex = i;
                    }
                }
                if (Number.isInteger(findIndex)) {
                    this.selectBuyingList[findIndex]?.buyingListItems?.forEach((buyingListItem, indexOfEach) => {
                        if (buyingListItem?.index === index) {
                            this.selectBuyingList[findIndex]?.buyingListItems.splice(indexOfEach, 1);
                        }
                    });
                }
                if (this.selectAllBuyingList) {
                    this.selectAllBuyingList = false;
                }
            }
        });
    },
    methods: {
        handleRemoveItemFromWishlist() {
            const itemsIds = [];
            this.selectBuyingList[this.currentlyBuyingList].buyingListItems.forEach((item) => {
                itemsIds.push(item.id);
            });
            this.$core.useWishlist.deleteItemToWishlist({
                data: [itemsIds],
                buyingListId: this.selectBuyingList[this.currentlyBuyingList].idBuyingList,
            });
            this.resetSelect();
            this.$toast.success(this.$t('notification.product.rmWishlist1'));
        },
        validateToCopyItem() {
            const buyingListItemRequest = [];
            this.selectBuyingList[this.currentlyBuyingList].buyingListItems.forEach((items) => {
                let addInItem = {
                    offerPriceId: items.offerPrice.id,
                    quantity: items.quantity,
                };
                buyingListItemRequest.push(addInItem);
            });
            this.checkedWishlistIds.forEach((wishListId) => {
                this.$core.useWishlist.addItemToWishlist({
                    buyingListtId: wishListId,
                    data: buyingListItemRequest,
                });
            });
            this.resetSelect();
            this.modalCopyItem = false;
        },
        resetSelect() {
            this.selectBuyingList = [];
            this.checkedWishlistIds = [];
            this.$nuxt.$emit('resetSelect');
            this.$nuxt.$emit('resetSelectItems');
        },
        selectAll() {
            if (this.selectAllBuyingList) {
                this.selectBuyingList = [];
                this.$nuxt.$emit('selectAll', this.buyinglistItems, this.buyingListId);
            } else {
                this.selectBuyingList = [];
                this.checkedWishlistIds = [];
                this.$nuxt.$emit('resetSelectItems');
            }
        },
        handleCreateWishlist() {
            const buyingListItemRequest = [];
            this.selectBuyingList[this.currentlyBuyingList].buyingListItems.forEach((items) => {
                let addInItem = {
                    offerPriceId: items.offerPrice.id,
                    quantity: items.quantity,
                };
                buyingListItemRequest.push(addInItem);
            });
            this.$core.useWishlist.createBuyinglist({
                name: this.buyinglistName,
                add: true,
                productToAdd: buyingListItemRequest,
            });
            this.modalCopyItem = false;
            this.resetSelect();
        },
    },
};
</script>
<style scoped>
.buyingList-enter-active,
.buyingList-leave-active {
    transition: opacity 0.5s;
}
.buyingList-enter,
.buyingList-leave-active {
    opacity: 0;
}
.buying-panel-button {
    display: flex;
    flex-direction: row;
    border-top: solid 0.3px #d9d9d9;
    justify-content: space-between;
}
.actionBuyingList {
    display: flex;
    flex-direction: row;
}
</style>
