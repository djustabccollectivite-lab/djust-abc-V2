<template>
    <DjAccountLayout :idAccountLink="accountLayoutFav">
        <div class="shadow rounded-extra-lg">
            <div class="d-flex align-items-center bg-black navigation-header pl-6">
                <span class="text-white font-700 size-24">
                    {{ $t('buyingList.myLists', { number: nbBuyinglists }) }}
                </span>
            </div>
            <section v-if="isDesktop" class="p-5">
                <div :key="increment">
                    <table class="dj-buyingList-table">
                        <template v-for="(buyingList, key) in buyinglists">
                            <tbody :key="key" class="dj-buyingList-table-body">
                                <tr :key="buyingList.id">
                                    <td class="pl-4 font-700 size-18" @click="toggle(key)">{{ buyingList.name }}</td>
                                    <td class="tdItem text-center" @click="toggle(key)">
                                        {{ buyingList?.buyingListItems.length }} articles
                                    </td>
                                    <td class="tdItem text-center" @click="toggle(key)">
                                        {{ $t('buyingList.created') }} {{ dateFormated(buyingList.createdAt) }}
                                    </td>
                                    <td class="tdItem text-center">
                                        <div @click="showMenuOptions(key)">
                                            <SvgIcon name="cog" />
                                        </div>
                                    </td>
                                </tr>
                                <tr v-if="opened.includes(key)" colspan="5" scope="colgroup">
                                    <td class="productsLists" colspan="5">
                                        <BuyingListTable
                                            :buyinglistItems="buyingList?.buyingListItems"
                                            :buyingListId="buyingList.id"
                                            :isDesktop="isDesktop"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </table>
                </div>
            </section>
            <section v-else class="p-5">
                <v-expansion-panels>
                    <v-expansion-panel
                        v-for="(item, index) in buyinglists"
                        :key="index"
                        class="rounded-xl border overflow-hidden mb-4"
                    >
                        <v-expansion-panel-header hide-actions class="bg-grey rounded-t-xl">
                            <div class="font-700 size-18">
                                <div>{{ item.name }}</div>
                            </div>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <div class="d-flex justify-content-between pb-2">
                                <div>
                                    {{ item?.buyingListItems?.length }} article{{
                                        item?.buyingListItems?.length > 1 ? 's' : ''
                                    }}
                                </div>
                                <div>{{ $t('buyingList.created') }} {{ dateFormated(item.createdAt) }}</div>
                            </div>
                            <div class="d-flex justify-content-between gap-2">
                                <DjButtonAddToCart
                                    :textButton="$t('buyingList.addCartTheList')"
                                    shape="button"
                                    variant="contained"
                                    :products="buyinglists[indexOfWishListSelected]?.buyingListItems"
                                    :iconDisplayed="false"
                                    :fullWidth="false"
                                />
                                <div @click="openDuplicateModal()">
                                    <DjButton
                                        :text="$t('buyingList.duplicateList')"
                                        shape="button"
                                        variant="outlined"
                                        :fullWidth="false"
                                    />
                                </div>
                                <div @click="deleteBuyinglist()">
                                    <DjButton
                                        :text="$t('buyingList.deleteList')"
                                        shape="button"
                                        variant="outlined"
                                        :fullWidth="false"
                                    />
                                </div>
                            </div>
                            <BuyingListTable
                                :buyinglistItems="item?.buyingListItems"
                                :buyingListId="item.id"
                                :isDesktop="isDesktop"
                            />
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </section>
        </div>
        <DjModal v-model="wishListActionModal" max-width="500px">
            <div class="bg-white">
                <div class="text-center py-4 bg-grey font-700 size-18">
                    {{ $t('buyingList.actionModal') }}
                </div>
                <div class="d-flex flex-column align-items-center gap-4 w-full p-5">
                    <DjButtonAddToCart
                        :textButton="$t('buyingList.addCartTheList')"
                        shape="button"
                        variant="outlined"
                        :products="buyinglists[indexOfWishListSelected]?.buyingListItems"
                        :iconDisplayed="false"
                        :fullWidth="true"
                    />
                    <div class="w-full" @click="shareWishListMethod()">
                        <DjButton
                            :text="$t('buyingList.shareTheList')"
                            shape="button"
                            variant="outlined"
                            :fullWidth="true"
                        />
                    </div>
                    <div class="w-full" @click="openDuplicateModal()">
                        <DjButton
                            :text="$t('buyingList.duplicateList')"
                            shape="button"
                            variant="outlined"
                            :fullWidth="true"
                        />
                    </div>
                    <div class="w-full" @click="deleteBuyinglist()">
                        <DjButton
                            :text="$t('buyingList.deleteList')"
                            shape="button"
                            variant="outlined"
                            :fullWidth="true"
                        />
                    </div>
                </div>
            </div>
        </DjModal>
        <DjModal v-model="shareWishListModal" max-width="400px">
            <div class="bg-white">
                <div class="text-center py-4 bg-grey font-700 size-18">
                    {{ $t('buyingList.shareTheList') }}
                </div>
                <div class="d-flex flex-column p-5">
                    <div class="mb-3 textShareWishList">{{ $t('buyingList.duplicateTitleModal') }}</div>
                    <div class="d-flex flex-column align-item-center mb-5">
                        <div v-for="(name, index) in userToShare" :key="name" class="w-full">
                            <DjInput
                                v-model="userToShare[index]"
                                class="w-full"
                                :label="$t('buyingList.duplicateToEmail')"
                                outlined
                            />
                        </div>
                        <div @click="addUserToShareWishList()">
                            <DjButton :text="$t('buyingList.addAnotherEmail')" shape="button" variant="outlined" />
                        </div>
                    </div>
                    <div class="w-full d-flex">
                        <div class="mt-2 mr-2" @click="transferTheWishList()">
                            <DjButton
                                :text="$t('buyingList.buttonToTransfer')"
                                :isDisabled="disableDupplicateButton"
                                shape="button"
                                variant="contained"
                            />
                        </div>
                        <DjInput
                            v-model="nameWishListForShare"
                            class="inputWishListNameToShare"
                            :label="$t('buyingList.nameToTransferWishList')"
                            outlined
                        />
                    </div>
                </div>
            </div>
        </DjModal>
        <DjModal v-model="duplicateWishListModal" max-width="450px">
            <div class="bg-white">
                <div class="text-center py-4 bg-grey font-700 size-18">
                    {{ $t('buyingList.duplicateList') }}
                </div>
                <div class="d-flex flex-column p-5" style="height: 180px">
                    <div class="mb-3 textShareWishList">{{ $t('buyingList.duplicateWishList') }}</div>
                    <div class="w-full d-flex">
                        <div @click="duplicateWishListMethod()">
                            <DjButton
                                class="mt-2 mr-2"
                                :text="$t('buyingList.duplicateButton')"
                                :isDisabled="disableDupplicateButton"
                                variant="contained"
                            />
                        </div>
                        <DjInput
                            v-model="nameWishListForShare"
                            class="inputWishListNameToShare"
                            :label="$t('buyingList.label')"
                            outlined
                            hide-details
                        />
                    </div>
                    <p v-if="duplicateError" class="text-red my-4">
                        {{ $t('notification.product.quotealreadyexist') }}
                    </p>
                </div>
            </div>
        </DjModal>
    </DjAccountLayout>
</template>

<script>
import { mapState } from 'vuex';
import DjAccountLayout from '@components/templates/DjAccountLayout/DjAccountLayout.vue';
import DjButtonAddToCart from '@components/molecules/DjButtonAddToCart/DjButtonAddToCart.vue';
import BuyingListTable from '@modules/buyingList/components/modules/BuyingListTable.vue';
import DjModal from '@components/molecules/DjModal/DjModal.vue';
import DjInput from '@components/atoms/DjInput/DjInput.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import SvgIcon from '@components/atoms/icons/SvgIcon.vue';
import moment from 'moment';

export default {
    name: 'BuyingList',
    components: {
        BuyingListTable,
        DjAccountLayout,
        DjButtonAddToCart,
        DjModal,
        DjInput,
        DjButton,
        SvgIcon,
    },
    data() {
        return {
            accountLayoutFav: 'Favoris',
            opened: [Number(this.$route.query.id)],
            details: false,
            shareWishListModal: false,
            userToShare: [''],
            selectedBuyingList: '',
            wishListActionModal: false,
            indexOfWishListSelected: 0,
            nameWishListForShare: '',
            increment: 1,
            duplicateWishListModal: false,
            duplicateError: false,
            isDesktop: window.innerWidth > 1300,
        };
    },
    computed: {
        ...mapState({
            buyinglists: (state) => state.wishlist.items,
        }),
        nbBuyinglists() {
            return this.buyinglists ? this.buyinglists.length : 1;
        },
        disableDupplicateButton() {
            const buyingListAlreadyExist = this.buyinglists.some(
                (buyingList) => buyingList.name === this.nameWishListForShare,
            );
            this.duplicateError = buyingListAlreadyExist;
            return !this.nameWishListForShare || buyingListAlreadyExist;
        },
    },
    created() {
        this.$nuxt.$on('resetSelect', () => {
            this.opened = [];
        });
        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
        });
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize);
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
        showMenuOptions(index) {
            this.wishListActionModal = true;
            this.indexOfWishListSelected = index;
            this.selectedBuyingList = this.buyinglists[index].id;
        },
        async deleteBuyinglist() {
            this.wishListActionModal = false;
            try {
                await this.$core.useWishlist.deleteBuyingList(this.selectedBuyingList);
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
                this.selectedBuyingList = await this.$core.useWishlist.createBuyinglist({
                    name: this.nameWishListForShare,
                    add: true,
                    productToAdd: this.formatWishlistForRequest(
                        this.buyinglists[this.indexOfWishListSelected]?.buyingListItems,
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
        transferTheWishList() {
            try {
                this.userToShare.forEach(async (email) => {
                    await this.cloneWishList();
                    await this.$core.useWishlist
                        .changeOwnerBuyingList(this.selectedBuyingList, email.toLocaleLowerCase())
                        .then(() => {
                            this.$toast.success(this.$t('buyingList.toastTransferListSuccess'));
                            this.$core.useWishlist
                                .getBuyingList(this.$auth.strategy.token.get())
                                .then(() => this.increment++);
                        })
                        .catch((error) => {
                            this.$core.useWishlist.deleteBuyingList(this.selectedBuyingList);
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
        onResize() {
            this.isDesktop = window.innerWidth > 1300;
        },
    },
};
</script>

<style lang="scss" scoped>
.rounded-extra-lg {
    border-radius: 24px;
}

::v-deep .v-expansion-panel-content__wrap {
    padding: 16px;
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

.dj-buyingList-table-body {
    margin-top: 19px;
    border-radius: 8px;
    border: 1px solid #e5e5e5;
    box-shadow: 0 0 0 2px #e5e5e5;
}

.tdItem {
    height: 60px;
    font-family: var(--font-2nd) !important;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    color: rgba(0, 0, 0, 0.75);
    white-space: nowrap;
}

.inputWishListNameToShare {
    width: 50%;
}
</style>
