<template>
    <div class="dj-breadcrumb">
        <div class="dj-container">
            <ul class="breadcrumb">
                <template v-for="item in breadcrumb">
                    <li v-if="item.text && item.url" :key="item.text">
                        <nuxt-link :to="`/list/${slugify(item.text)}`">
                            <span class="text-black">{{ item.text }}</span>
                        </nuxt-link>
                    </li>
                    <li v-if="item.text && !item.url" :key="item.text">
                        <span class="underline">{{ item.text }}</span>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>

<script>
import { slugify } from '~/purjus/helpers/common/urlHelper';

export default {
    name: 'DjBreadCrumb',
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
    methods: { slugify },
};
</script>
