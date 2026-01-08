<template>
    <div>
        <div @click.prevent="chooseWishlist">
            <DjButton
                :text="$t('product.buttonAddToBuyingList.button')"
                :iconDisplayed="true"
                :styleButton="styleButton"
                :shape="styleB"
                icon="icon-heart"
                :fullWidth="fullWidth"
            />
        </div>
        <v-dialog v-model="dialogWishlist" width="500" class="modale__buying">
            <DjCard :title="$t('product.buttonAddToBuyingList.chooseMessage')" class="modale__buying">
                <DjLink v-if="newBL" class="back-dialog-wishlist" @click="newBL = false">
                    <DjIcon class="icon-arrow-left"> </DjIcon>
                </DjLink>
                <div class="ml-2" v-click-outside="onClickOutside">
                    <div class="pl-3 pt-3" v-if="!newBL">
                        <p class="ma-0">
                            {{ $t('product.buttonAddToBuyingList.selectMessage') }}
                        </p>
                    </div>
                    <DjList class="pl-3" v-if="!newBL">
                        <DjListItem v-for="n in wishlists" :key="n.id">
                            <DjLink class="dj-btn dj-btn--secondary mr-3 mt-2" @click="handleAddToWishList(n.id)">
                                {{ n.name }}
                            </DjLink>
                        </DjListItem>
                    </DjList>
                    <div class="pa-3">
                        <div v-if="!newBL">
                            <DjLink class="text-decoration-underline" @click="toggleCreateBL()">
                                {{ $t('product.buttonAddToBuyingList.createMessage') }}
                            </DjLink>
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
                            <DjLink class="dj-btn dj-btn--secondary mr-3" @click="handleCreateWishlist()">
                                {{ $t('product.buttonAddToBuyingList.createButton') }}
                            </DjLink>
                        </div>
                    </div>
                </div>
                <template #actions>
                    <DjSpacer></DjSpacer>
                </template>
            </DjCard>
        </v-dialog>
    </div>
</template>

<script>
import { computed, defineComponent, ref, useContext } from '@nuxtjs/composition-api';
import DjList from '@components/organisms/DjList/DjList';
import DjModal from '@components/molecules/DjModal/DjModal.vue';
import DjCard from '@components/molecules/DjCard/DjCard.vue';
import DjIcon from '@components/atoms/DjIcon/DjIcon.vue';
import DjLink from '@components/atoms/DjLink/DjLink.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjSpacer from '@components/atoms/DjSpacer/DjSpacer.vue';
import DjInput from '@components/atoms/DjInput/DjInput.vue';

export default defineComponent({
    name: 'DjButtonAddToBuyingList',
    components: { DjButton, DjModal, DjCard, DjSpacer, DjLink, DjInput, DjList, DjIcon },
    props: {
        styleB: {
            type: String,
            require: true,
            default: 'button',
        },
        quantity: {
            type: Number,
            require: true,
            default: 1,
        },
        productName: {
            type: String,
            require: true,
            default: 'produit',
        },
        offerId: {
            type: String,
            require: true,
            default: null,
        },
        fullWidth: {
            type: Boolean,
            default: false,
        },
        styleButton: {
            type: String,
            require: false,
            default: 'secondary',
        },
    },
    setup(props) {
        const ctx = useContext();
        const wishlists = computed(() => ctx.store.state.wishlist.items);
        const buyingListtId = ref(null);
        const dialogWishlist = ref(false);
        const newBL = ref(false);
        const buyinglistName = ref(null);

        function chooseWishlist() {
            if (ctx.$auth.loggedIn) {
                dialogWishlist.value = true;
                ctx.store.commit('app/setSearch', dialogWishlist.value);
            } else {
                ctx.$router.push(ctx.localePath('/auth/login'));
            }
        }
        function onClickOutside() {
            if (dialogWishlist.value) {
                ctx.store.commit('app/setSearch', false);
            }
        }
        async function handleAddToWishList(buyingListtId) {
            dialogWishlist.value = false;
            ctx.store.commit('app/setSearch', dialogWishlist.value);
            let item = [
                {
                    offerPriceId: props.offerId,
                    quantity: props.quantity,
                },
            ];
            const succes = ctx.$core.useWishlist.addItemToWishlist({
                buyingListtId: buyingListtId,
                data: item,
            });
            if (succes) {
                ctx.$toast.success(`${props.productName}` + ctx.app.i18n.t('notification.product.buyingList'));
            } else {
                ctx.$toast.error(ctx.app.i18n.t('notification.product.error'));
            }
        }
        function handleCreateWishlist() {
            dialogWishlist.value = false;
            ctx.store.commit('app/setSearch', dialogWishlist.value);
            let item = [
                {
                    offerPriceId: props.offerId,
                    quantity: props.quantity,
                },
            ];
            ctx.$core.useWishlist.createBuyinglist({
                name: buyinglistName.value,
                add: true,
                productToAdd: item,
            });
            ctx.$toast.success(`${props.productName}` + ctx.app.i18n.t('notification.product.buyingList'));
        }

        function toggleCreateBL() {
            newBL.value = !newBL.value;
        }

        return {
            wishlists,
            buyingListtId,
            dialogWishlist,
            newBL,
            buyinglistName,
            toggleCreateBL,
            chooseWishlist,
            handleAddToWishList,
            handleCreateWishlist,
            onClickOutside,
        };
    },
});
</script>

<style lang="scss" scoped>
.modale__buying {
    border-radius: 12px !important;
}
.back-dialog-wishlist {
    margin-left: 1%;
}
</style>
