<template>
    <div class="ps-fastorder">
        <BreadCrumb :breadcrumb="breadcrumb" layout="fullwidth" />
        <div class="dj-fast-order">
            <DjCard :title="$t('fastOrder.title')" headerColor="var(--color-secondary)">
                <div class="dj-section__content">
                    <div v-if="$config.fastorderupload">
                        <Upload @load="setProductsFromCsv(JSON.parse($event))" />
                        <hr />
                    </div>
                    <table class="dj-table--fastorder">
                        <thead>
                            <tr>
                                <th scope="col" class="first">{{ $t('fastOrder.product') }}</th>
                                <th scope="col" class="dj-table-th">{{ $t('fastOrder.supplier') }}</th>
                                <th scope="col" class="dj-table-th">{{ $t('fastOrder.quantity') }}</th>
                                <th scope="col" class="dj-table-last-th">{{ $t('fastOrder.totalWithoutVat') }}</th>
                                <th scope="col" />
                            </tr>
                        </thead>
                        <tbody
                            v-for="n in nbLines"
                            :key="n + 99"
                            class="section section-step"
                            :class="n % 2 === 0 ? undefined : 'bgGrey'"
                        >
                            <template v-if="$config.fastorderupload">
                                <FastOrderLine
                                    v-for="product in productCSV"
                                    :key="product.id"
                                    :showlabel="true"
                                    :product="product"
                                    :quantityProduct="product.quantity"
                                    @child-product="setProductList"
                                />
                            </template>
                            <FastOrderLine @child-product="setProductList" />
                        </tbody>
                    </table>
                    <div @click.prevent="addLine()">
                        <DjButton
                            :text="$t('fastOrder.addProduct')"
                            :iconDisplayed="true"
                            styleButton="light"
                            :shape="'button'"
                            icon="icon-plus-circle"
                            :size="'standard'"
                            :textDisplayed="true"
                        />
                    </div>
                    <div>
                        <DjButtonAddToCart
                            v-if="$core.useShop.IsActive()"
                            :products="products"
                            styleB="button"
                            class="float-right mt-2 mr-3"
                        />
                    </div>
                </div>
            </DjCard>
        </div>
    </div>
</template>

<script>
import FastOrderLine from '@components/pages/fastOrder/modules/FastOrderLine.vue';
import BreadCrumb from '@components/atoms/DjBreadCrumb/DjBreadCrumb.vue';
import Upload from '@components/molecules/DjUpload/DjUpload.vue';
import DjCard from '@components/molecules/DjCard/DjCard.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjButtonAddToCart from '@components/molecules/DjButtonAddToCart/DjButtonAddToCart.vue';

export default {
    name: 'fast-order',
    components: {
        FastOrderLine,
        BreadCrumb,
        Upload,
        DjCard,
        DjButton,
        DjButtonAddToCart,
    },
    data() {
        return {
            nbLines: 1,
            products: [],
            productCSV: [],
            quoteLines: [],
        };
    },
    computed: {
        breadcrumb() {
            return [
                {
                    text: this.$t('fastOrder.homePage'),
                    url: '/',
                },
                {
                    text: this.$t('fastOrder.fastOrder'),
                    url: '/fastorder',
                },
            ]
        },
    },
    methods: {
        addLine() {
            this.nbLines += 1;
        },
        async setProductsFromCsv(products) {
            products.forEach((product) => this.findProduct(product));
        },
        setProductList(params) {
            const existingProduct = this.products.find((product) => product.offerId === params.offer.offerId);
            if (existingProduct) {
                const filteredList = this.products.filter((product) => product.offerId !== params.offer.offerId);
                const filteredQuoteList = this.quoteLines.filter(
                    (quoteLine) => quoteLine.productVariantId !== params.quoteLine.productVariantId
                );
                this.products = [...filteredList];
                this.quoteLines = [...filteredQuoteList];
            }
            if (params.type === 'add') {
                this.products.push(params.offer);
                this.quoteLines.push(params.quoteLine);
            }
        },
        async findProduct(product) {
            const productById = await this.$core.useProduct.getProductsById(product.id);
            const objProductCSV = {
                brand: productById.brand,
                catalogViewId: null,
                createdAt: null,
                gtin: productById.gtin,
                mainImageUrl: productById.imageLinks[0],
                mpn: productById.mpn,
                name: productById.name[Object.keys(name)[0]],
                navigationCategoryId: null,
                navigationCategoryName: 'Categorie 1',
                offe: null,
                productId: productById.id,
                sku: productById.sku,
                quantity: product.quantity,
            };
            this.productCSV.push(objProductCSV);
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
.ps-fastorder .dj-section__content {
    padding: 20px;
    background-color: #fff;
    margin-bottom: 4%;
}

.fast-order__form .row label {
    display: none;
}

.fast-order__form .row:first-child label {
    display: block;
}

//Table Fast order css
.dj-table--fastorder {
    min-width: 100%;
    border-top-width: 1px;
    border-collapse: separate;
    border-spacing: 0px 13px;
    text-transform: uppercase;
    .first {
        padding-top: 13px;
        padding-bottom: 13px;
        padding-right: 0.75rem;
        padding-left: 13px;
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 14.4px;
        color: #1c1c1c;
        text-align: left;
        @media (min-width: 640px) {
            padding-left: 13px;
        }
    }
    th:last-child {
        padding-left: 0.75rem;
        padding-right: 0.75rem;
        padding-top: 13px;
        padding-bottom: 13px;
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        color: #1c1c1c;
        text-align: center;
    }
    .dj-table-last-th {
        padding-left: 0.75rem;
        padding-right: 0.75rem;
        padding-top: 13px;
        padding-bottom: 13px;
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        color: #1c1c1c;
        text-align: center;
    }
    .dj-table-th {
        display: none;
        padding-left: 0.75rem;
        padding-right: 0.75rem;
        padding-top: 13px;
        padding-bottom: 13px;
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        color: #1c1c1c;
        text-align: center;
        @media (min-width: 1024px) {
            display: table-cell;
        }
    }
}
.section {
    border-top: 1em solid transparent;
}

.section-step {
    border-radius: 8px; // 1
    border: 1px solid #e5e5e5;
    box-shadow: 0 0 0 1px #e5e5e5; // 1
    height: 73px;
}
.borderNone {
    border-top-width: 1px;
    border-color: transparent;
}
.borderActive {
    position: relative;
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-right: 0.75rem;
    padding-left: 1rem;
    font-size: 0.875rem;
    line-height: 1.25rem;

    @media (min-width: 640px) {
        padding-left: 1.5rem;
    }
}

.firstCol {
    font-family: var(--font-1st);
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
    color: #1c1c1c;
    padding-left: 13px;
}

.secondCol {
    display: flex;
    margin-top: 0.25rem;
    font-family: var(--font-1st);
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
    color: #1c1c1c;
    padding-left: 13px;
    flex-direction: column;

    @media (min-width: 640px) {
        display: block;
    }

    @media (min-width: 1024px) {
        display: none;
    }
}

.hideOnMobile {
    position: absolute;
    right: 0;
    left: 1.5rem;
    background-color: #e5e7eb;
    height: 1px;
}
.dj-table--td {
    border-top-width: 1px;
    border-color: #e5e7eb;
    text-align: center;
}
.dj-table--td-hidden {
    display: none;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    padding-top: 13px;
    padding-bottom: 13px;
    font-family: var(--font-2nd) !important;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #1c1c1c;
    @media (min-width: 1024px) {
        display: table-cell;
    }
}
.dj-table--last {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    padding-top: 13px;
    padding-bottom: 13px;
    text-align: center;

    color: #6b7280;
    font-size: 0.875rem;
    line-height: 1.25rem;
}
</style>
