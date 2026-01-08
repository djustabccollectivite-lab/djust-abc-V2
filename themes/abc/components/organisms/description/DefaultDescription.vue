<template>
    <div>
        <div v-if="isDesktop && 'tabs' === type">
            <v-tabs show-arrows color="black">
                <v-tab :ripple="false">
                    <div class="text-black-3 font-700 size-18 mb-0">{{ $t('product.tabs.description') }}</div>
                </v-tab>
                <v-tab v-if="wantShowCharacteristics" :ripple="false">
                    <div class="text-black-3 font-700 size-18 mb-0">{{ $t('product.tabs.attributes') }}</div>
                </v-tab>
                <v-tab v-if="$auth.loggedIn && wantShowSpecifications" :ripple="false">
                    <div class="text-black-3 font-700 size-18 mb-0">{{ $t('product.tabs.technicalSheet') }}</div>
                </v-tab>
                <v-tab v-if="$auth.loggedIn && wantShowVideos" :ripple="false">
                    <div class="text-black-3 font-700 size-18 mb-0">{{ $t('product.tabs.videos') }}</div>
                </v-tab>

                <v-tab-item>
                    <div class="pt-4">
                        <PartialDescription :description="productDescription" />
                    </div>
                </v-tab-item>
                <v-tab-item v-if="wantShowCharacteristics">
                    <div v-if="characteristics" class="pt-4">
                        <PartialAttributes :attributes="characteristics" />
                    </div>
                </v-tab-item>
                <v-tab-item v-if="$auth.loggedIn && wantShowSpecifications">
                    <div v-if="specifications" class="pt-4">
                        <PartialSpecification :specifications="specifications" />
                    </div>
                </v-tab-item>
                <v-tab-item v-if="videos">
                    <div class="pt-4">
                        <PartialVideos :videos="videos" />
                    </div>
                </v-tab-item>
            </v-tabs>
        </div>
        <div v-if="!isDesktop && 'expansion' === type">
            <v-expansion-panels flat accordion multiple>
                <v-expansion-panel>
                    <v-expansion-panel-header hide-actions class="p-0 border-y">
                        <div class="px-0 d-flex justify-space-between align-items-center px-2 py-2">
                            <div class="mb-0">{{ $t('product.tabs.description') }}</div>
                            <SvgIcon name="arrow-down-small" />
                        </div>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="pt-4">
                        <PartialDescription :description="productDescription" />
                    </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel v-if="wantShowCharacteristics">
                    <v-expansion-panel-header hide-actions class="p-0 border-y">
                        <div class="px-0 d-flex justify-space-between align-items-center px-2 py-2">
                            <div class="mb-0">{{ $t('product.tabs.attributes') }}</div>
                            <SvgIcon name="arrow-down-small" />
                        </div>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="pt-4">
                        <PartialAttributes :attributes="characteristics" />
                    </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel v-if="$auth.loggedIn && wantShowSpecifications">
                    <v-expansion-panel-header hide-actions class="p-0 border-y">
                        <div class="px-0 d-flex justify-space-between align-items-center px-2 py-2">
                            <div class="mb-0">{{ $t('product.tabs.technicalSheet') }}</div>
                            <SvgIcon name="arrow-down-small" />
                        </div>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="pt-4">
                        <PartialSpecification :specifications="specifications" />
                    </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel v-if="$auth.loggedIn && wantShowVideos">
                    <v-expansion-panel-header hide-actions class="p-0 border-y">
                        <div class="px-0 d-flex justify-space-between align-items-center px-2 py-2">
                            <div class="mb-0">{{ $t('product.tabs.videos') }}</div>
                            <SvgIcon name="arrow-down-small" />
                        </div>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="pt-4">
                        <PartialVideos :videos="videos" />
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </div>
    </div>
</template>

<script>
import PartialDescription from '@components/organisms/description/modules/PartialDescription.vue';
import PartialAttributes from '@components/organisms/description/modules/PartialAttributes.vue';
import PartialSpecification from '@components/organisms/description/modules/PartialSpecification.vue';
import PartialVideos from '@components/organisms/description/modules/PartialVideos.vue';
import SvgIcon from '@components/atoms/icons/SvgIcon.vue';

export default {
    name: 'DefaultDescription',
    components: {
        PartialDescription,
        PartialAttributes,
        PartialSpecification,
        PartialVideos,
        SvgIcon,
    },
    props: {
        product: {
            type: Object,
            required: true,
            default: () => {},
        },
        productDescription: {
            type: String,
            required: false,
            default: '',
        },
        selectedVariant: {
            type: Object,
            required: false,
            default: null,
        },
        type: {
            type: String,
            required: true,
            default: 'tabs',
            validator: function (value) {
                return ['tabs', 'expansion'].includes(value);
            },
        },
    },
    data() {
        return {
            isDesktop: window.innerWidth > 960,
        };
    },
    computed: {
        characteristics() {
            const characteristics = this.selectedVariant.offerInventory.variant.attributeValues?.filter(
                (attributeValue) => attributeValue.attribute.externalId.startsWith('Caracteristique_'),
            );
            characteristics.sort(this.sortAttributesByName);
            return characteristics;
        },
        specifications() {
            const specifications = this.selectedVariant.offerInventory.variant.attributeValues?.filter(
                (attributeValue) => attributeValue.attribute.externalId.startsWith('FT_'),
            );
            specifications.sort(this.sortAttributesByName);
            return specifications;
        },
        videos() {
            const videos = this.selectedVariant.offerInventory.variant.attributeValues?.filter((attributeValue) =>
                attributeValue.attribute.externalId.startsWith('VD_'),
            );
            videos.sort(this.sortAttributesByName);
            return videos;
        },
        wantShowSpecifications() {
            return this.specifications.length > 0;
        },
        wantShowCharacteristics() {
            return this.characteristics.length > 0;
        },
        wantShowVideos() {
            return this.videos.length > 0;
        },
    },
    mounted() {
        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
        });
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize);
    },
    methods: {
        onResize() {
            this.isDesktop = window.innerWidth > 960;
        },
        sortAttributesByName(a, b) {
            const locale = this.$i18n.locale.toLocaleUpperCase();
            const nameA = a.attribute.name[locale].toUpperCase();
            const nameB = b.attribute.name[locale].toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        },
    },
};
</script>

<style lang="scss" scoped>
.border-y {
    border-top: 1px solid var(--color-black);
    border-bottom: 1px solid var(--color-black);
}

.v-expansion-panel-header {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
</style>
