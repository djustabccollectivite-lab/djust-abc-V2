<template>
    <div style="background: #fff">
        <div v-if="page" class="hero-section">
            <div class="description">
                <div class="topheader">
                    <span v-if="page?.title" class="textTitle">{{ page.title }}</span>
                </div>
                <div class="desc">
                    <div class="block-text">
                        <span class="desc-text" v-html="page?.description"> </span>
                    </div>
                </div>
            </div>
            <div class="image">
                <DjImage class="image" :src="page?.image?.filename"></DjImage>
            </div>
        </div>
        <div class="contact-section">
            <div class="title__h3 contact-title">
                Vous avez une question ou <br />
                une suggestion ? Contactez-nous :
            </div>
            <ContactForm style="background: none" />
        </div>
    </div>
</template>
<script>
import DjImage from '@components/atoms/DjImage/DjImage.vue';
import ContactForm from '@components/pages/cms/ContactForm.vue';

export default {
    name: 'Presenation',
    components: {
        DjImage,
        ContactForm,
    },
    data() {
        return {
            page: null,
            logo: null,
        };
    },
    async created() {
        this.page = await this.$core.useStoryblok.getPresentationPage();
    },
};
</script>
<style lang="scss">
.hero-section {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 60px 100px 0px;
    margin-bottom: 40px;
    background: #fff;
    gap: 28px;

    @media (max-width: 1199px) {
        flex-direction: column;
        width: 100%;
        padding: 20px 15px 0px;
    }

    .description {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 60px 0px 0px;
        gap: 50px;
        flex: 1;
        width: 100%;
        height: auto;

        .topheader {
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 0px;
            gap: 50px;

            .textTitle {
                font-family: var(--font-1st);
                font-style: normal;
                font-weight: 500;
                font-size: 26px;
                line-height: 30px;
                text-align: center;
                color: var(--color-primary);
            }
        }

        .desc {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 0px;
            gap: 35px;
            width: 100%;
            height: auto;

            .block-text {
                display: flex;
                flex-direction: row;
                align-items: center;
                padding: 0px;

                .desc-text {
                    font-family: var(--font-1st);
                    font-style: normal;
                    font-weight: 100;
                    font-size: 16px;
                    line-height: 150.2%;
                    color: #000000;
                }
            }
        }
    }

    .image {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        padding: 10px;
        gap: 10px;
        width: 100%;
        flex: 1;
        box-shadow: inset 0px 0px 4px 6px #ffffff;
    }
}

.contact-section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 40px 100px;
    gap: 14px;
    background: url('/img/contact-section.jpg');
    background-position: center center;
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;

    .contact-title {
        font-family: var(--font-1st);
        font-style: normal;
        font-weight: 700;
        font-size: 40px;
        line-height: 47px;
        color: var(--color-primary);
    }
}
</style>
