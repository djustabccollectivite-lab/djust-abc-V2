<template lang="html">
    <div>
        <table class="dj-table--buyingList">
            <thead>
                <tr>
                    <th scope="col" class="first">NOM</th>
                    <th scope="col" class="dj-table-th">QUANTITE</th>
                    <th scope="col" class="dj-table-last-th">DETAILS</th>
                    <th scope="col">ACTIONS</th>
                </tr>
            </thead>
            <tbody class="section section-step" v-for="(item, BuyingIndex) in buyinglists" :key="BuyingIndex">
                <tr>
                    <td>
                        <div class="firstCol">
                            <DjLink :to="'/buyinglist'">
                                {{ item.name }}
                            </DjLink>
                        </div>
                        <div class="secondCol">
                            <span>
                                <div>Quantity: {{ item.buyingListItems.length }}</div>
                            </span>
                        </div>
                    </td>
                    <td :class="[BuyingIndex === 0 ? '' : 'dj-table--td', 'dj-table--td-hidden']">
                        <div>{{ item.buyingListItems.length }}</div>
                    </td>
                    <td :class="[BuyingIndex === 0 ? '' : 'dj-table--td', 'dj-table--last']">
                        <DjLink :to="'/buyinglist?id=' + BuyingIndex" class="link"> voir le détail </DjLink>
                    </td>
                    <td :class="[BuyingIndex === 0 ? '' : 'dj-table--td', 'dj-table--last']">
                        <DjButtonAddToCart
                            :textButton="'Commander'"
                            styleButton="secondary"
                            :fullWidth="true"
                            :products="$core.getWishlist.getBuyingListToOrder(item)"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import DjTable from '@components/organisms/DjTable/DjTable.vue';
import DjLink from '@components/atoms/DjLink/DjLink.vue';
import DjButtonAddToCart from '@components/molecules/DjButtonAddToCart/DjButtonAddToCart.vue';
export default {
    name: 'TableRecentBuyingList',
    components: {
        DjLink,
        DjTable,
        DjButtonAddToCart,
    },
    props: {
        buyinglists: {
            type: Array,
            default: () => [],
        },
    },
};
</script>

<style lang="scss" scoped>
.dj-table--buyingList {
    min-width: 100%;
    border-top-width: 1px;
    //border-color: #d1d5db;
    border-collapse: separate; // 1
    border-spacing: 0px 13px;
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
    height: 49px;
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
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    color: #1c1c1c;
    padding-left: 13px;
}

.secondCol {
    display: flex;
    margin-top: 0.25rem;
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    color: #1c1c1c;
    padding-left: 13px;
    display: flex;
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
    .link {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        text-decoration-line: underline;
        color: #1c1c1c;
    }
}
</style>
