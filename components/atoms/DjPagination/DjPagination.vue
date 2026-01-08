<template>
    <div class="d-flex flex-row align-items-center justify-content-center">
        <div class="d-flex flex-row align-items-center dj-pagination">
            <div v-if="havePages" class="dj-pagination-controler prev" @click="prevPage">
                <DjButton
                    :isDisabled="displayPage === 1"
                    :textDisplayed="false"
                    :iconDisplayed="true"
                    icon="icon-chevron-left"
                />
            </div>
            <div class="d-flex flex-row align-items-center pages-container">
                <!-- starting display -->
                <template v-if="displayPage === 1 && bigSpace">
                    <div
                        v-for="n in 3"
                        :key="n"
                        class="pages"
                        :class="{
                            'active-page': n === displayPage,
                        }"
                        @click="goToPage(n)"
                    >
                        <p class="mb-0">{{ n }}</p>
                    </div>
                    <template v-if="bigSpace">
                        <div class="pages divider-page">
                            <p class="mb-0">...</p>
                        </div>
                        <div class="pages" @click="goToPage(lastPage)">
                            <p class="mb-0">{{ lastPage }}</p>
                        </div>
                    </template>
                </template>
                <template v-else-if="displayPage < 4 && bigSpace">
                    <div
                        v-for="n in 4"
                        :key="n"
                        class="pages"
                        :class="{
                            'active-page': n === displayPage,
                        }"
                        @click="goToPage(n)"
                    >
                        <p class="mb-0">{{ n }}</p>
                    </div>
                    <template v-if="bigSpace">
                        <div class="pages divider-page">
                            <p class="mb-0">...</p>
                        </div>
                        <div class="pages" @click="goToPage(lastPage)">
                            <p class="mb-0">{{lastPage}}</p>
                        </div>
                    </template>
                </template>
                <template v-else-if="bigSpace && displayPage < lastPage - 3 && displayPage >= 4">
                    <div class="pages" @click="goToPage(1)">
                        <p class="mb-0">1</p>
                    </div>
                    <div class="pages divider-page">
                        <p class="mb-0">...</p>
                    </div>
                    <div class="pages" @click="goToPage(displayPage - 1)">
                        <p class="mb-0">{{ displayPage - 1 }}</p>
                    </div>
                    <div class="pages active-page" @click="goToPage(displayPage)">
                        <p class="mb-0">{{ displayPage }}</p>
                    </div>
                    <div class="pages" @click="goToPage(displayPage + 1)">
                        <p class="mb-0">{{ displayPage + 1 }}</p>
                    </div>
                    <div class="pages divider-page">
                        <p class="mb-0">...</p>
                    </div>
                    <div class="pages" @click="goToPage(lastPage)">
                        <p class="mb-0">{{ lastPage }}</p>
                    </div>
                </template>
                <template v-else-if="displayPage >= lastPage - 3 && bigSpace">
                    <template v-if="bigSpace">
                        <div class="pages" @click="goToPage(1)">
                            <p class="mb-0">1</p>
                        </div>
                        <div class="pages divider-page">
                            <p class="mb-0">...</p>
                        </div>
                    </template>
                    <div
                        v-for="n in 4"
                        :key="n"
                        class="pages"
                        :class="{
                            'active-page': n + lastPage - 4 === displayPage,
                        }"
                        @click="goToPage(n + lastPage - 4)"
                    >
                        <p class="mb-0">{{ n + lastPage - 4 }}</p>
                    </div>
                </template>
                <template v-else>
                    <div
                        v-for="n in lastPage"
                        :key="n"
                        class="pages"
                        :class="{
                            'active-page': n === displayPage,
                        }"
                        @click="goToPage(n)"
                    >
                        <p class="mb-0">{{ n }}</p>
                    </div>
                </template>
            </div>
            <div v-if="havePages" class="dj-pagination-controler next" @click="nextPage">
                <DjButton
                    :isDisabled="displayPage === lastPage"
                    :textDisplayed="false"
                    :iconDisplayed="true"
                    icon="icon-chevron-right"
                />
            </div>
        </div>
    </div>
</template>

<script>
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import { ref, watch } from '@nuxtjs/composition-api';

export default {
    name: 'DjPagination',
    components: {
        DjButton,
    },
    props: {
        currentPage: {
            type: Number,
            default: 0,
        },
        lastPage: {
            type: Number,
            default: 1,
        },
    },
    emits: ['prevPagination', 'moveToPage', 'nextPagination'],
    setup(props, ctx) {
        const displayPage = ref(props.currentPage + 1);
        const havePages = ref(props.lastPage > 1);
        const bigSpace = ref(props.lastPage - 1 >= 9);

        watch(
            props,
            (newVal, _oldVal) => {
                displayPage.value = newVal.currentPage + 1;
                havePages.value = newVal.lastPage > 1;
                bigSpace.value = newVal.lastPage - 1 >= 9;
            },
            { deep: true }
        );

        function prevPage() {
            if (displayPage.value === 1) {
                return;
            }
            ctx.emit('prevPagination');
        }

        function goToPage(page) {
            if (page === displayPage.value) {
                return;
            }
            ctx.emit('moveToPage', page-1);
        }

        function nextPage() {
            if (displayPage.value === props.lastPage) {
                return;
            }
            ctx.emit('nextPagination');
        }

        return { displayPage, havePages, bigSpace, prevPage, goToPage, nextPage };
    },
};
</script>

<style lang="scss" scoped>
.dj-pagination {
    gap: 14px;

    .pages-container {
        gap: 14px;

        p {
            font-size: 20px;
            line-height: 24px;
            color: var(--color-body);
        }

        .pages {
            width: 35px;
            height: 35px;
            border-radius: 4px;
            background-color: var(--header-backgroud-color);
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
            cursor: pointer;
            &:not(:last-child) {
                margin-right: 3px;
            }
        }

        .active-page {
            background-color: var(--color-primary);
            cursor: default;
            p {
                color: var(--header-backgroud-color);
            }
        }

        .divider-page {
            background-color: transparent;
            border: solid 1px var(--color-body);
            box-shadow: none;
        }
    }
}
</style>
