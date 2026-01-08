<template>
    <div class="dj-breadcrumb">
        <div class="px-8">
            <ul class="breadcrumb">
                <template v-for="item in breadcrumb">
                    <li v-if="item.text && item.url" :key="item.text">
                        <DjLink :to="item.url">
                            {{ item.text }}
                        </DjLink>
                    </li>
                    <li v-if="item.text && !item.url" :key="item.text">{{ item.text }}</li>
                </template>
            </ul>
        </div>
    </div>
</template>

<script>
import DjLink from '@components/atoms/DjLink/DjLink.vue';

export default {
    name: 'DjBreadCrumb',
    components: {
        DjLink,
    },
    props: {
        breadcrumb: {
            type: Array,
            default: () => [],
        },
        layout: {
            type: String,
            default: '',
        },
    },
};
</script>
