<template>
    <transition v-if="isDesktop" name="buyingList">
        <div class="dj-section__content">
            <div class="table-responsive">
                <table class="table mb-0">
                    <thead>
                        <tr>
                            <th></th>
                            <th class="text-grey-4 font-700 size-16 text-uppercase">Produit</th>
                            <th class="text-grey-4 font-700 size-16 text-uppercase text-center">Prix HT</th>
                            <th class="text-grey-4 font-700 size-16 text-uppercase text-center">Quantité</th>
                            <th class="text-grey-4 font-700 size-16 text-uppercase text-center">Montant HT</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody v-for="(buyinglistItem, index) in buyinglistItems" :key="buyinglistItem.id">
                        <BuyingListTableItem
                            :buyinglistItem="buyinglistItem"
                            :buyingListId="buyingListId"
                            :index="index"
                            :isDesktop="isDesktop"
                        />
                    </tbody>
                </table>
                <v-dialog v-model="modalCopyItem" width="500">
                    <DjCard
                        :title="$t('product.buttonAddToBuyingList.chooseMessage')"
                        headerColor="var(--color-secondary)"
                        :withActions="true"
                    >
                        <div v-if="!createNewBuyingList">
                            <div v-for="wishlist in wishlists" :key="wishlist.id" class="wishlist-checkbox-container">
                                <v-checkbox
                                    v-if="wishlist.id !== buyingListId"
                                    v-model="checkedWishlistIds"
                                    :value="wishlist.id"
                                    :label="wishlist.name"
                                    class="v-checkbox-component"
                                />
                            </div>
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

                        <div v-if="!createNewBuyingList" @click="validateToCopyItem">
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
    <transition v-else name="buyingList">
        <div>
            <div
                v-for="(buyinglistItem, index) in buyinglistItems"
                :key="buyinglistItem.id"
                class="shadow rounded p-2 my-4"
            >
                <BuyingListTableItem
                    :buyinglistItem="buyinglistItem"
                    :buyingListId="buyingListId"
                    :index="index"
                    :isDesktop="isDesktop"
                />
            </div>
        </div>
    </transition>
</template>

<script>
import { mapState } from 'vuex';
import DjCard from '@components/molecules/DjCard/DjCard.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjInput from '@components/atoms/DjInput/DjInput.vue';
import BuyingListTableItem from '@modules/buyingList/components/modules/buyingListTableItem.vue';

export default {
    name: 'BuyingListTable',
    components: {
        BuyingListTableItem,
        DjButton,
        DjCard,
        DjInput,
    },
    transition: 'buyingList',
    props: {
        buyinglistItems: {
            type: Array,
            required: true,
            default: () => [],
        },
        buyingListId: {
            type: String,
            required: true,
            default: '',
        },
        isDesktop: {
            type: Boolean,
            required: true,
            default: false,
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
            return this.checkedWishlistIds.length <= 0;
        },
        currentlyBuyingList() {
            for (let index = 0; index < this.selectBuyingList.length; index++) {
                if (this.selectBuyingList[index].idBuyingList === this.buyingListId) {
                    return index;
                }
            }
            return null;
        },
        haveBuyingListName() {
            return !this.buyinglistName;
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
                    const newBuyingListId = {
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
                const addInItem = {
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
        handleCreateWishlist() {
            const buyingListItemRequest = [];
            this.selectBuyingList[this.currentlyBuyingList].buyingListItems.forEach((items) => {
                const addInItem = {
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
