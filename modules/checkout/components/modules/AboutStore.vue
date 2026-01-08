<template>
    <div v-if="categoriesList" class="dj-content">
        <div class="titleAboutStore">{{ $t('checkout.aboutStore') }}</div>
        <div class="contentAboutStore">{{ $t('checkout.description') }}</div>
        <div class="dj-section-categories-list">
            <div class="dj-section-right" v-for="(item, index) in categoriesList" :key="index">
                <div
                    class="bg aboutStoreImg"
                    :style="{
                        background:
                            'url(' +
                            $core.useHelper.OptimizeImageStoryblok(item.image.filename, '1000x500/smart') +
                            ') no-repeat center center',
                        'background-size': 'cover',
                        'box-shadow': 'none',
                    }"
                >
                    <div class="buttonImage">
                        <DjLink :to="'/list/' + item.link" class="btn-image aboutStoreBtnImg">
                            <div class="hoverdiv pb-4 pt-5">
                                {{ item.label }}
                            </div>
                            <div class="hoverdiv belowTitle" v-if="item.belowLabel">{{ item.belowLabel }}</div>
                        </DjLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DjLink from '@components/atoms/DjLink/DjLink.vue';

export default {
    components: { DjLink },
    data() {
        return {
            checkoutPage: null,
            categoriesList: null,
        };
    },
    async created() {
        this.checkoutPage = await this.$core.useStoryblok.getCheckoutPage();
        this.categoriesList = this.checkoutPage
            ? this.checkoutPage.find((el) => el.component === 'checkout_category').category
            : null;
        this.$store.commit('app/toggleDrawer', false);
    },
};
</script>

<style lang="scss" scoped>
.buttonImage {
    text-align: center;
    margin-bottom: auto;
    height: 100%;
}

.btn-image {
    background: linear-gradient(94.14deg, rgba(255, 255, 255, 0.8) 20.45%, rgba(255, 255, 255, 0.1) 69.67%);
    border-radius: 20px;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 21px;
    color: #ffffff;
}
.bg {
    min-width: 100%;
    min-height: 100%;
    height: 445px;
    display: flex;
    flex-grow: 0;
    flex-direction: column;
    flex: 1;
    filter: drop-shadow(0px 0px 9px rgba(0, 0, 0, 0.02)) drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.07))
        drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.11)) drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.13))
        drop-shadow(0px 0px 0px rgba(0, 0, 0, 0.13));
}

.dj-content {
    padding-top: 16px;
    padding-bottom: 16px;
    padding-left: 16px;
    padding-right: 16px;
    @media (min-width: 640px) {
        padding-top: 0px;
        padding-bottom: 0px;
    }
}
.aboutStoreImg {
    height: 234px;
    border-radius: 20px;
}
.dj-section-categories-list {
    display: grid;
    align-items: flex-start;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 26px;

    @media (min-width: 1024px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 26px;
    }
    .dj-section-left {
        display: grid;
        grid-template-columns: repeat(1, minmax(0, 1fr));
        gap: 1rem;

        @media (min-width: 1024px) {
            grid-column: span 2 / span 2;
        }
    }
    .dj-section-right {
        display: grid;
        grid-template-columns: repeat(1, minmax(0, 1fr));
        gap: 1rem;
    }
}
.titleAboutStore {
    font-size: 20px;
    font-weight: 500;
}
.contentAboutStore {
    padding-top: 15px;
    font-size: 14px;
    font-weight: 400;
    padding-bottom: 10px;
}
.aboutStoreBtnImg {
    background: linear-gradient(transparent 0%, black 140%);
    height: 100%;
    align-items: flex-start;
    padding-left: 20px;
    display: flex;
    padding-top: 20px;
    flex-direction: column;
    justify-content: center;
    &:hover {
        color: rgb(180, 182, 183);
        .hoverdiv {
            color: rgb(180, 182, 183);
        }
    }
}
.belowTitle {
    font-size: 14px;
}
</style>
