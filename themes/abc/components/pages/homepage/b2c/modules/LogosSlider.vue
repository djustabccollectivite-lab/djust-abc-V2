<template>
    <div class="mt-10 mx-10">
        <h2 class="font-700 size-24 text-blue">{{ block.title }}</h2>
        <div class="row mt-2">
            <div v-for="(logo, index) in block.logos" :key="index" class="col col-6 col-md-4 col-lg-3">
                <div class="d-flex justify-content-center align-items-center h-full">
                    <nuxt-link v-if="logo.link.substr(0, 1) === '/'" :to="logo.link">
                        <a><img class="logo-item" :src="logo.image.filename + '/m/0x100'" width="100" alt="Djust" /></a>
                    </nuxt-link>
                    <a v-else :href="logo.link">
                        <a><img class="logo-item" :src="logo.image.filename + '/m/0x100'" width="100" alt="Djust" /></a>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LogosSlider',
    components: {},
    props: {
        block: {
            type: Object,
            default: () => {},
        },
    },
};
</script>
