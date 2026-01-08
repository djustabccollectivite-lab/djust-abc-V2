<template>
    <div class="page-root" :style="`background-image: url(${backgroundUrl});`">
        <div class="content">
            <img v-if="logoUrl" :src="logoUrl" :alt="$config.clientName" width="391" height="148" class="logo" />
            <h1 class="heading">
                {{ title }}
            </h1>
            <p class="paragraph" v-html="content"></p>
        </div>
        <footer class="footer">
            <p class="credits">
                @ {{ new Date().getFullYear() }}
                <span style="text-transform: capitalize">
                    {{ $t('page.maintenance.copyright', { company: $config.clientName ?? 'Djust' }) }}
                </span>
            </p>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'MaintenancePage',
    auth: false,
    data() {
        return {
            page: null,
        };
    },
    computed: {
        backgroundUrl() {
            const isArray = Array.isArray(this.page?.background);

            const backgroundUrl = isArray ? this.page?.background[0]?.filename : this.page?.background?.filename;

            return backgroundUrl || null;
        },
        logoUrl() {
            const isArray = Array.isArray(this.page?.logo);

            const logoUrl = isArray ? this.page?.logo[0]?.filename : this.page?.logo?.filename;

            return logoUrl || null;
        },
        title() {
            const storyblokTitle = this.page?.title;

            return storyblokTitle || this.$t('page.maintenance.title');
        },
        content() {
            const storyblokContent = this.page?.content;

            return storyblokContent || this.$t('page.maintenance.text');
        },
    },
    async created() {
        this.page = await this.$core.useStoryblok.getMaintenancePage();
    },
};
</script>

<style lang="scss" scoped>
.page-root {
    padding: 32px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    min-height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
}

.content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: #ffffff70;
    backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 30px;
}

.logo {
    max-width: 100%;
    height: auto;
}

.heading {
    margin-top: 52px;
    margin-bottom: 44px;
    color: #000;
    font-family: var(--font-1st);
    font-weight: 700;
    font-size: 42px;
    line-height: 49px;
}

.paragraph {
    margin: 0;
    color: #000;
    font-family: var(--font-1st);
    font-size: 24.5px;
    line-height: 29px;
}

.footer {
    position: fixed;
    bottom: 32px;
    left: 32px;
    right: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.credits {
    margin: 0 0 0 auto;
    color: #000;
    font-family: var(--font-1st);
    font-size: 14px;
    line-height: 16px;
    text-align: right;
}
</style>
