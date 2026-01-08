<template>
    <div v-if="cartDetails">
        <div class="dj-fast-cart-cartDetails" v-if="status === 'PROCESSING'">
            <div class="dj-fast-cart-progress-bar pr-4">
                <v-progress-linear v-model="pourcentage" rounded rounded-bar indeterminate height="14" style="pointer-events: none">
                    <div class="pourcentage">{{ Math.ceil(pourcentage) }}%</div>
                </v-progress-linear>
            </div>

            <div class="dj-fast-cart-description">{{$t('fastCart.fileLoading')}}</div>
        </div>
        <br />
        <div class="dj-fast-cart-cartDetails" v-if="status === 'COMPLETED' || status === 'ERROR'">
            <div class="dj-fast-cart-progress-bar pr-4">
                <v-progress-linear v-model="pourcentage" rounded rounded-bar height="14" style="pointer-events: none">
                    <div class="pourcentage">{{ Math.ceil(pourcentage) }}%</div>
                </v-progress-linear>
            </div>
            <br />

            <div class="dj-fast-cart-description">{{$t('fastCart.fileUploaded')}}</div>
        </div>

        <div class="pt-4" v-if="status === 'COMPLETED' || status === 'ERROR'">
            <div>
                {{$t('fastCart.reportText1')}}
                <a @click.prevent="downloadErrorReport">{{$t('fastCart.reportText2')}}({{ errorsProductsImport }} {{$t('fastCart.reportText3')}})</a
                >
            </div>
            <div>
                {{$t('fastCart.productimportsuccess')}} <strong>{{ successfulProductsImport }}</strong>
            </div>
            <div>
                {{$t('fastCart.productimporterror')}} <strong>{{ errorsProductsImport }}</strong>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name: 'FastCartcartDetails',
    props: {
        cartDetails: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            errorReport: null,
        };
    },
    computed: {
        successfulProductsImport() {
            return this.cartDetails ? this.cartDetails.totalLines - this.cartDetails.totalLinesInError : -1;
        },
        errorsProductsImport() {
            return this.cartDetails ? this.cartDetails.totalLinesInError : -1;
        },
        fileName() {
            return this.cartDetails ? this.cartDetails.sourceFilePath : 'NA';
        },
        pourcentage() {
            return this.cartDetails && this.cartDetails.totalLines !== 0 ? (this.cartDetails.totalLinesProcessed / this.cartDetails.totalLines) * 100 : 100;
        },
        status() {
            return this.cartDetails.status;
        },
    },
    methods: {
        async downloadErrorReport() {
            this.errorReport = await this.$core.useCart.getCartErrorReport();
        },
    },
};
</script>
<style lang="scss">
.dj-fast-cart-cartDetails {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
}

.dj-fast-cart-cartDetails {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
}

.dj-fast-cart-progress-bar {
    width: 50%;
}
.dj-fast-cart-description {
    font-weight: 400;
    font-size: 14px;
    line-height: 12px;
}
.pourcentage {
    font-weight: 700;
    color: #fff;
}
</style>
