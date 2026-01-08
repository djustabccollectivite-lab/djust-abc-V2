<template>
    <div class="ps-fastorder">
        <BreadCrumb :breadcrumb="breadCrumb" layout="fullwidth" />
        <div class="dj-fast-order">
            <DjCard :title="$t('fastOrder.title')" headerColor="var(--color-secondary)">
                <div class="dj-section__content">
                    <div class="dj-fastCart-title pb-5">{{ $t('fastCart.instructions') }}</div>
                    <FastCartSteps></FastCartSteps>
                    <div class="dj-fastCart-title pt-5 pb-3">{{ $t('fastCart.title') }}</div>
                    <div class="dj-fastCart-loadFile">
                        {{ $t('fastCart.subtitle') }}
                    </div>
                    <div class="pt-5">
                        <DjUploadDD
                            v-if="!cartDetails || status !== 'PROCESSING'"
                            :key="increment"
                            :fileToUpload="fileToUpload"
                            @load-file="fileToUploadValue"
                        >
                            <div @click="openModal = true">
                                <DjButton
                                    :text="$t('fastCart.uploadBtn')"
                                    :iconDisplayed="true"
                                    icon="icon-upload2"
                                    styleB="button"
                                />
                            </div>
                        </DjUploadDD>
                        <br />
                        <div v-if="cartDetails">
                            <FastCartStatus v-if="cartDetails && status !== 'INITIALIZED'" :cartDetails="cartDetails" />
                            <DjLoading v-else />
                        </div>
                    </div>
                    <div class="pb-5" @click="viewCart">
                        <DjButton
                            :text="$t('fastCart.returnToCart')"
                            :iconDisplayed="true"
                            icon="icon-cart"
                            iconPosition="right"
                            styleB="button"
                            class="float-right mt-2 mr-3"
                        />
                    </div>
                </div>
                <DjModal v-model="openModal" max-width="600">
                    <DjCard :withActions="true">
                        <div class="title__h5">{{ $t('fastCart.uploadWarning') }}</div>
                        <template #actions>
                            <DjSpacer></DjSpacer>
                            <div class="p-10 mr-3" @click.prevent="sendFile">
                                <DjButton
                                    :text="$t('account.organisation.yesButton')"
                                    :iconDisplayed="true"
                                    styleButton="primary"
                                    :shape="'button'"
                                    icon="icon-check-square"
                                />
                            </div>
                            <div @click.prevent="openModal = false">
                                <DjButton
                                    :text="$t('account.organisation.noButton')"
                                    :iconDisplayed="true"
                                    styleButton="secondary"
                                    :shape="'button'"
                                    icon="icon-cross-square"
                                />
                            </div>
                        </template>
                    </DjCard>
                </DjModal>
            </DjCard>
        </div>
    </div>
</template>

<script>
import BreadCrumb from '@components/atoms/DjBreadCrumb/DjBreadCrumb.vue';
import DjUploadDD from '@components/molecules/DjUpload/DjUploadDD.vue';
import DjCard from '@components/molecules/DjCard/DjCard.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import FastCartSteps from '@components/pages/fastOrder/modules/fastCartSteps.vue';
import FastCartStatus from '@components/pages/fastOrder/modules/fastCartStatus.vue';
import DjLoading from '@components/atoms/DjLoading/DjLoading.vue';
import DjSpacer from '@components/atoms/DjSpacer/DjSpacer.vue';
import DjModal from '@components/molecules/DjModal/DjModal.vue';

export default {
    name: 'FastCart',
    components: {
        DjUploadDD,
        DjCard,
        DjButton,
        BreadCrumb,
        FastCartSteps,
        FastCartStatus,
        DjLoading,
        DjModal,
        DjSpacer,
    },
    data() {
        return {
            fileToUpload: [],
            cartDetails: null,
            openModal: false,
            breadCrumb: [
                {
                    text: this.$t('common.breadscrum.home'),
                    url: '/',
                },
                {
                    text: this.$t('fastOrder.title'),
                    url: '/fastcart',
                },
            ],
            pourcentage: 25,
            isLoading: false,
            increment: 1,
            intervalId: null,
        };
    },
    computed: {
        status() {
            return this.cartDetails ? this.cartDetails.status : '';
        },
    },
    created() {
        this.getCurrentStatusofCart();
    },
    mounted() {
        this.intervalId = setInterval(() => {
            if (this.status && this.status !== 'COMPLETED') this.getCurrentStatusofCart();
        }, 10000);
    },
    beforeDestroy() {
        clearInterval(this.intervalId);
    },
    methods: {
        viewCart() {
            this.$router.push(this.localePath('/checkout/shopping-cart'));
        },
        fileToUploadValue(params) {
            this.fileToUpload = params;
        },
        async getCurrentStatusofCart() {
            this.cartDetails = await this.$core.useCart.getCartStatus();
            await this.$core.useCart.getCartDetail(this.$auth.strategy.token.get());

            this.increment++;
        },
        async sendFile() {
            this.isLoading = true;
            const result = await this.$core.useCart.uploadCartFile(this.fileToUpload[0]);
            this.openModal = false;

            if (result.ok) {
                this.$toast.success(this.$t('fastCart.fileUploaded'));
                this.fileToUpload = [];
                this.cartDetails = await this.$core.useCart.getCartStatus();
                this.increment++;
            } else {
                this.$toast.error(result.errorMsg);
            }

            this.isLoading = false;
        },
    },
};
</script>

<style lang="scss">
.dj-fast-order {
    width: 100%;
    background: #ffffff;
    margin-left: auto;
    margin-right: auto;
    padding-top: 24px;
    padding-bottom: 24px;
    @media (min-width: 640px) {
        padding-left: 24px;
        padding-right: 24px;
    }
    @media (min-width: 1024px) {
        padding-left: 48px;
        padding-right: 48px;
    }
}
.dj-fastCart-title {
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 23px;
}
.dj-fastCart-loadFile {
    padding: 20px 14px;
    background: #f9f9f9;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.ps-fastorder .dj-section__content {
    padding: 20px;
    background-color: #fff;
    margin-bottom: 4%;
}
</style>
