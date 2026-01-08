<template>
    <DjAccountLayout :idAccountLink="accountLayoutFav">
        <DjCard headerColor="var(--color-secondary)" :title="$t('buyingList.myLists', { number: nbBuyinglists })">
            <div class="dj-buyingList">
                <div class="dj-buyingList-block">
                    <div class="dj-buyingList-content">
                        <div class="dj-buyingList-responsive" :key="increment">
                            <table class="dj-buyingList-table">
                                <template v-for="(item, index) in buyinglists">
                                    <tbody
                                        class="dj-buyingList-table-body"
                                        :class="opened.includes(index) ? 'activeBL' : null"
                                        :key="index"
                                    >
                                        <tr :key="item.id" class="trBuyingList">
                                            <td class="tdItemFirst" @click="toggle(index)">{{ item.name }}</td>
                                            <td class="tdItem nbArticles" @click="toggle(index)">
                                                {{ item?.buyingListItems.length }} articles
                                            </td>
                                            <td class="tdItem TDdateCreation" @click="toggle(index)">
                                                {{ $t('buyingList.created') }} {{ dateFormated(item.createdAt) }}
                                            </td>
                                            <td class="tdItem actions end">
                                                <span class="buttonsActions">
                                                    <button type="button" class="btnView" @click="dotMenuMethod(index)">
                                                        <i class="icon-cog" aria-hidden="true" />
                                                    </button>
                                                </span>
                                            </td>
                                        </tr>
                                        <tr colspan="5" scope="colgroup" v-if="opened.includes(index)">
                                            <td
                                                class="productsLists"
                                                colspan="5"
                                                scope="colgroup"
                                                v-if="opened.includes(index)"
                                            >
                                                <buying-list-table
                                                    :buyinglistItems="item?.buyingListItems"
                                                    :buyingListId="item.id"
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </template>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </DjCard>
        <DjModal v-model="wishListActionModal" max-width="500px">
            <DjCard headerColor="var(--color-secondary)" :title="$t('buyingList.actionModal')" :withActions="true">
                <div class="action-modal">
                    <DjButtonAddToCart
                        class="iconCart add-to-cart--buyingList mb-3"
                        :textButton="$t('buyingList.addCartTheList')"
                        :fullWidth="true"
                        :styleButton="'secondary'"
                        :products="$core.getWishlist.getBuyingListToOrder(buyinglists[indexOfWishListSelected])"
                        :styleB="'button'"
                        :iconDisplayed="true"
                        :iconColor="true"
                        :colorButton="'black'"
                    />
                    <button
                        type="button"
                        class="btnDelete dj-btn dj-btn--secondary mb-3"
                        @click="shareWishListMethod()"
                    >
                        <i class="icon-paper-plane" aria-hidden="true" />
                        {{ $t('buyingList.shareTheList') }}
                    </button>
                    <button type="button" class="btnDelete dj-btn dj-btn--secondary mb-3" @click="openDuplicateModal()">
                        <i class="icon-copy" aria-hidden="true" />
                        {{ $t('buyingList.duplicateList') }}
                    </button>
                    <button
                        type="button"
                        class="btnDelete dj-btn dj-btn--secondary deletecolor"
                        @click="deleteBuyinglist()"
                    >
                        {{ $t('buyingList.deleteList') }}
                    </button>
                </div>
            </DjCard>
        </DjModal>
        <DjModal v-model="shareWishListModal" max-width="400px">
            <DjCard headerColor="var(--color-secondary)" :title="$t('buyingList.shareTheList')" :withActions="true">
                <div class="modalShare">
                    <div class="mb-3 textShareWishList">{{ $t('buyingList.duplicateTitleModal') }}</div>
                    <div class="topBlockModal mb-5">
                        <div class="inputEmail" v-for="(name, index) in userToShare" :key="index">
                            <DjInput
                                v-model="userToShare[index]"
                                class="inputShareWishList"
                                :label="$t('buyingList.duplicateToEmail')"
                                outlined
                            />
                        </div>
                        <div @click="addUserToShareWishList()">
                            <DjButton
                                :text="$t('buyingList.addAnotherEmail')"
                                styleButton="secondary"
                                :size="'standard'"
                            />
                        </div>
                    </div>
                    <div class="bottomBlockModal">
                        <div @click="transferTheWishList()">
                            <DjButton
                                class="mt-2 mr-2"
                                :text="$t('buyingList.buttonToTransfer')"
                                :isDisabled="showButtonTransfer"
                                styleButton="secondary"
                                :size="'standard'"
                            />
                        </div>
                        <DjInput
                            class="inputWishListNameToShare"
                            v-model="nameWishListForShare"
                            :label="$t('buyingList.nameToTransferWishList')"
                            outlined
                        />
                    </div>
                </div>
            </DjCard>
        </DjModal>
        <DjModal v-model="duplicateWishListModal" max-width="400px">
            <DjCard headerColor="var(--color-secondary)" :title="$t('buyingList.duplicateList')" :withActions="true">
                <div class="modalShare">
                    <div class="mb-3 textShareWishList">{{ $t('buyingList.duplicateWishList') }}</div>
                    <div class="bottomBlockModal">
                        <div @click="duplicateWishListMethod()">
                            <DjButton
                                class="mt-2 mr-2"
                                :text="$t('buyingList.duplicateButton')"
                                :isDisabled="showButtonTransfer"
                                styleButton="secondary"
                                :size="'standard'"
                            />
                        </div>
                        <DjInput
                            class="inputWishListNameToShare"
                            v-model="nameWishListForShare"
                            :label="$t('buyingList.label')"
                            outlined
                        />
                    </div>
                </div>
            </DjCard>
        </DjModal>
    </DjAccountLayout>
</template>

<script>
import { mapState } from 'vuex';
import DjAccountLayout from '@components/templates/DjAccountLayout/DjAccountLayout.vue';
import DjButtonAddToCart from '@components/molecules/DjButtonAddToCart/DjButtonAddToCart.vue';
import DjCard from '@components/molecules/DjCard/DjCard.vue';
import BuyingListTable from '@modules/buyingList/components/modules/BuyingListTable.vue';
import DjModal from '@components/molecules/DjModal/DjModal.vue';
import DjInput from '@components/atoms/DjInput/DjInput.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import moment from 'moment';

export default {
    name: 'Buyinglist',
    components: { BuyingListTable, DjAccountLayout, DjCard, DjButtonAddToCart, DjModal, DjInput, DjButton },
    computed: {
        ...mapState({
            buyinglists: (state) => state.wishlist.items,
        }),
        nbBuyinglists() {
            return this.buyinglists ? this.buyinglists.length : 1;
        },
        showButtonTransfer() {
            return !this.nameWishListForShare;
        },
    },
    created() {
        this.$nuxt.$on('resetSelect', () => {
            this.opened = [];
        });
    },
    methods: {
        toggle(id) {
            const index = this.opened.indexOf(id);
            if (index > -1) {
                this.opened.splice(index, 1);
            } else {
                this.opened.push(id);
            }
        },
        dotMenuMethod(index) {
            this.wishListActionModal = true;
            this.indexOfWishListSelected = index;
            this.selectedbuyingList = this.buyinglists[index].id;
        },
        async deleteBuyinglist() {
            this.wishListActionModal = false;
            try {
                await this.$core.useWishlist.deleteBuyingList(this.selectedbuyingList);
                this.$toast.success(this.$t('buyingList.toastDeleteListSuccess'));
            } catch (error) {
                this.$toast.error(this.$t('notification.error'));
            }
        },
        dateFormated(date) {
            return moment(String(date)).format('DD/MM/YYYY');
        },
        addUserToShareWishList() {
            this.userToShare.push('');
        },
        shareWishListMethod() {
            this.userToShare = [''];
            this.nameWishListForShare = '';
            this.shareWishListModal = true;
        },
        formatWishlistForRequest(wishlists) {
            return wishlists.map((wishlist) => {
                return {
                    offerPriceId: wishlist.offerPrice.id,
                    quantity: wishlist.quantity,
                };
            });
        },
        async cloneWishList() {
            try {
                this.selectedbuyingList = await this.$core.useWishlist.createBuyinglist({
                    name: this.nameWishListForShare,
                    add: true,
                    productToAdd: this.formatWishlistForRequest(
                        this.buyinglists[this.indexOfWishListSelected]?.buyingListItems
                    ),
                });
            } catch (error) {
                this.$toast.error(this.$t('buyingList.toastDuplicateListError'));
            }
        },
        async duplicateWishListMethod() {
            try {
                await this.cloneWishList();
                this.duplicateWishListModal = false;
                this.wishListActionModal = false;
                this.$toast.success(this.$t('buyingList.toastDuplicateListSuccess'));
            } catch (error) {
                this.$toast.error(this.$t('buyingList.toastDuplicateListError'));
            }
        },
        openDuplicateModal() {
            this.nameWishListForShare = '';
            this.duplicateWishListModal = true;
        },
        async transferTheWishList() {
            try {
                this.userToShare.forEach(async (email) => {
                    await this.cloneWishList();
                    await this.$core.useWishlist
                        .changeOwnerBuyingList(this.selectedbuyingList, email.toLocaleLowerCase())
                        .then((val) => {
                            this.$toast.success(this.$t('buyingList.toastTransferListSuccess'));
                            this.$core.useWishlist
                                .getBuyingList(this.$auth.strategy.token.get())
                                .then(() => this.increment++);
                        })
                        .catch((error) => {
                            this.$core.useWishlist.deleteBuyingList(this.selectedbuyingList);
                            if (error) {
                                this.$toast.error(error);
                            } else {
                                this.$toast.error(this.$t('buyingList.toastTransferListError'));
                            }
                        });
                });
                this.wishListActionModal = false;
                this.shareWishListModal = false;
            } catch (error) {}
        },
    },
    data() {
        return {
            accountLayoutFav: 'Fav',
            opened: [Number(this.$route.query.id)],
            details: false,
            panel: [Number(this.$route.query.id)],
            shareWishListModal: false,
            userToShare: [''],
            selectedbuyingList: '',
            wishListActionModal: false,
            indexOfWishListSelected: 0,
            nameWishListForShare: '',
            increment: 1,
            duplicateWishListModal: false,
        };
    },
};
</script>

<style lang="scss" scoped>
.details {
    display: none;
}
.butt {
    z-index: 111111111;
}
.dj-section--shoppingps-whishlist {
    margin-top: 5rem;
}

.dj-buyingList {
    display: flex;
    flex-direction: column;
}
.dj-buyingList-block {
    overflow-x: auto;
    margin-bottom: -0.5rem;
    margin-left: -1rem;
    margin-right: -1rem;

    @media (min-width: 640px) {
        margin-left: -1.5rem;
        margin-right: -1.5rem;
    }

    @media (min-width: 1024px) {
        margin-left: -2rem;
        margin-right: -2rem;
    }
}
.dj-buyingList-content {
    display: inline-block;
    padding-bottom: 0.5rem;
    vertical-align: middle;
    min-width: 100%;

    @media (min-width: 768px) {
        padding-left: 1.5rem;
        padding-right: 1.5rem;
    }
    @media (min-width: 1024px) {
        padding-left: 2rem;
        padding-right: 2rem;
    }
}
.dj-buyingList-responsive {
    overflow: hidden;
    @media (min-width: 768px) {
        border-radius: 0.5rem;
    }
}
.dj-buyingList-table {
    min-width: 100%;
    border-top-width: 1px;
    border-collapse: separate;
    border-spacing: 2px 13px;
    thead {
        //background:rgb(238 238 238);
        border-radius: 5px;
    }
}
.thItem {
    padding-top: 2rem;
    padding-bottom: 2rem;
    padding-right: 0.75rem;
    padding-left: 1rem;
    font-family: var(--font-1st);
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
    text-transform: uppercase;
    color: #4d4d4f;
    text-align: left;

    @media (min-width: 640px) {
        padding-left: 1.5rem;
    }
}
.thItemLast {
    position: relative;
    padding-top: 2rem;
    padding-bottom: 2rem;
    padding-left: 0.75rem;
    padding-right: 1rem;
    font-family: var(--font-1st);
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
    text-transform: uppercase;
    color: #4d4d4f;
    @media (min-width: 640px) {
        padding-right: 1.5rem;
    }
}
.dj-buyingList-table-body {
    margin-top: 19px;
    border-radius: 8px;
    border: 1px solid #e5e5e5;
    box-shadow: 0 0 0 2px #e5e5e5;
    .activeBL {
        background-color: darkblue;
    }
}
.tdItemFirst {
    @media (max-width: 480px) {
        font-weight: 700;
        font-size: 16px;
    }
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-right: 0.75rem;
    padding-left: 1rem;
    font-family: var(--font-1st);
    font-style: normal;
    font-weight: bold;
    font-size: 17px;
    line-height: 18px;
    color: #000000;
    white-space: nowrap;

    @media (min-width: 640px) {
        padding-left: 1.5rem;
    }
}
.tdItemLast {
    position: relative;
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 0.75rem;
    padding-right: 1rem;

    text-align: right;
    white-space: nowrap;

    @media (min-width: 640px) {
        padding-right: 1.5rem;
    }
}
.tdItem {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    font-family: var(--font-2nd) !important;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    color: rgba(0, 0, 0, 0.75);
    white-space: nowrap;
}
.dateCreation {
    text-align: center;
}
.TDdateCreation {
    text-align: center;
}
.nbArticles {
    text-align: center;
}
.actions {
    text-align: center;
}

.buttonsActions {
    display: inline-flex;
    position: relative;
    z-index: 0;
    .btnView {
        display: inline-flex;
        position: relative;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        background-color: #ffffff;
        align-items: center;
        i {
            font-size: 30px;
            color: black;
            font-weight: 400;
        }
    }
    .btnDelete {
        display: inline-flex;
        position: relative;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        margin-left: -1px;
        background-color: #ffffff;
        align-items: center;
        i {
            font-size: 30px;
            color: black;
            font-weight: 400;
        }
    }
}
.responsivtHead {
    @media (max-width: 480px) {
        display: none;
    }
}
.trBuyingList {
    @media (max-width: 480px) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
.modalShare {
    display: flex;
    flex-direction: column;
}
.topBlockModal {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.bottomBlockModal {
    width: 100%;
    display: flex;
}
.inputShareWishList {
    width: 100%;
}
.textShareWishList {
    font-weight: 500;
}
.inputWishListNameToShare {
    width: 50%;
}
.inputEmail {
    width: 100%;
}
.action-modal {
    display: flex;
    flex-direction: column;
    button {
        font-size: 20px !important;
    }
}
.end {
    float: inline-end;
}
.deletecolor {
    color: #ec0101 !important;
    border: transparent !important;
    &:hover {
        background: #e5e5e5 !important;
    }
}
</style>
