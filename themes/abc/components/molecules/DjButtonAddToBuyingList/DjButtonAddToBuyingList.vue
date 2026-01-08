<template>
    <div class="bg-white">
        <div @click.prevent="chooseWishlist">
            <DjButton
                :text="$t('product.buttonAddToBuyingList.button')"
                :shape="shape"
                :iconDisplayed="true"
                :variant="variant"
                :isDisabled="isDisabled"
                :icon="shape === 'icon' ? 'heart-big' : 'heart-small'"
                :fullWidth="fullWidth"
                :iconColor="iconColor"
            />
        </div>
        <DjModal v-model="dialogWishlist" width="500">
            <div class="bg-white">
                <div class="text-700 size-18 bg-grey py-4 text-center">
                    {{ $t('product.buttonAddToBuyingList.chooseMessage') }}
                </div>
                <div v-click-outside="onClickOutside" class="ml-2">
                    <div class="pl-3 pt-3">
                        <p class="ma-0">
                            {{ $t('product.buttonAddToBuyingList.selectMessage') }}
                        </p>
                    </div>
                    <div class="pl-3">
                        <div v-for="n in wishlists" :key="n.id">
                            <div class="mr-3 mt-2" @click="handleAddToWishList(n.id)">
                                <DjButton :text="n.name" shape="button" variant="outlined" />
                            </div>
                        </div>
                    </div>
                    <div class="pa-3">
                        <div v-if="!newBL" class="mb-4">
                            ou
                            <span class="text-decoration-underline" @click="toggleCreateBL()">
                                {{ $t('product.buttonAddToBuyingList.createMessage') }}
                            </span>
                        </div>
                        <div v-else class="d-flex">
                            <DjInput
                                v-model="buyinglistName"
                                :label="$t('buyingList.label')"
                                class="mr-4"
                                dense
                                outlined
                                hide-details
                            />
                            <div class="mr-3" @click="handleCreateWishlist()">
                                <DjButton
                                    :text="$t('product.buttonAddToBuyingList.createButton')"
                                    shape="button"
                                    variant="contained"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DjModal>
    </div>
</template>

<script>
import DjModal from '@components/molecules/DjModal/DjModal.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjInput from '@components/atoms/DjInput/DjInput.vue';

export default {
    name: 'DjButtonAddToBuyingList',
    components: { DjButton, DjModal, DjInput },
    props: {
        shape: {
            type: String,
            required: true,
            default: 'button',
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
        },
        productName: {
            type: String,
            required: true,
            default: 'produit',
        },
        offerId: {
            type: String,
            required: true,
            default: null,
        },
        isDisabled: {
            type: Boolean,
            default: false,
        },
        fullWidth: {
            type: Boolean,
            default: false,
        },
        variant: {
            type: String,
            required: false,
            default: 'secondary',
        },
        iconColor: {
            type: String,
            required: false,
            default: '',
        },
    },
    data() {
        return {
            buyingListtId: null,
            dialogWishlist: false,
            newBL: false,
            buyinglistName: null,
        };
    },
    computed: {
        wishlists() {
            return this.$store.state.wishlist.items;
        },
    },
    methods: {
        chooseWishlist() {
            if (this.$auth.loggedIn) {
                this.dialogWishlist = true;
                this.$store.commit('app/setSearch', this.dialogWishlist);
            } else {
                // Sauvegarder l'URL actuelle pour redirection après connexion
                const currentUrl = this.$route.fullPath;
                this.$router.push({
                    path: '/auth/login',
                    query: { redirect: currentUrl },
                });
            }
        },
        onClickOutside() {
            if (this.dialogWishlist) {
                this.$store.commit('app/setSearch', false);
            }
        },
        async handleAddToWishList(buyingListId) {
            this.dialogWishlist = false;
            this.$store.commit('app/setSearch', this.dialogWishlist);

            await this.$core.useWishlist.addItemToWishlist({
                buyingListtId: buyingListId,
                data: [
                    {
                        offerPriceId: this.offerId,
                        quantity: this.quantity,
                    },
                ],
            });
            this.$toast.success(`${this.productName}` + this.$i18n.t('notification.product.buyingList'));
        },
        async handleCreateWishlist() {
            this.dialogWishlist = false;
            this.$store.commit('app/setSearch', this.dialogWishlist);
            const item = [
                {
                    offerPriceId: this.offerId,
                    quantity: this.quantity,
                },
            ];
            const response = await this.$core.useWishlist.createBuyinglist({
                name: this.buyinglistName,
                add: true,
                productToAdd: item,
            });
            if (response) {
                this.$toast.success(`${this.productName} ${this.$i18n.t('notification.product.buyingList')}`);
            }
        },
        toggleCreateBL() {
            this.newBL = !this.newBL;
        },
    },
};
</script>
