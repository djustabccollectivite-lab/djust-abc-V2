<template lang="html">
    <div class="auth-layout" v-if="authContent">
        <style>
            :root {
                --auth-image: url('{{ image }}');
            }
        </style>
        <div class="auth-left-side">
            <div class="image d-flex align-items-center justify-content-center">
                <div class="title"></div>
            </div>
        </div>

        <div class="auth-right-side">
            <div class="link" v-if="linkText">
                <DjLink :to="linkUrl" class="link-text"
                    ><DjIcon color="var(--color-secondary)">icon-arrow-left</DjIcon> {{ linkText }}
                </DjLink>
            </div>
            <div class="auth-header">
                <DjLink :to="linkUrl" class="link-text">
                    <img :src="logoWithoutImage+'/m/0x200/smart'" alt="Djust" />
                </DjLink>
                <h2 v-if="!remove">{{ title }}</h2>
                <p class="mt-2" v-if="description">{{ description }}</p>
                <slot name="description"> </slot>
            </div>
            <div class="auth-content">
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
import DjIcon from '@components/atoms/DjIcon/DjIcon.vue';
import DjLink from '@components/atoms/DjLink/DjLink.vue';
export default {
    name: 'AuthLayout',
    components: {
        DjIcon,
        DjLink
    },
    data() {
        return {
            whiteLogo: null,
            colorLogo: null,
            authContent: null
        };
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        },
        linkText: {
            type: String,
            default: ''
        },
        linkUrl: {
            type: String,
            default: '/'
        },
        remove: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        titleAuth() {
            return this.authContent.title;
        },
        image() {
            return this.authContent.image.filename;
        },
        logoWithImage() {
            return this.authContent.logowithimage.filename;
        },
        logoWithoutImage() {
            return this.authContent.logowithoutimage.filename;
        }
    },
    async created() {
        this.authContent = await this.$core.useStoryblok.getAuthConfig();
    }
};
</script>

<style lang="scss" scoped>
.auth-layout {
    min-height: 100%;
    display: flex;
    background-color: #ffffff;
    .auth-right-side {
        display: flex;
        flex: 1 1 0%;
        flex-direction: column;
        justify-content: center;
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 10px;
        padding-right: 10px;
        .auth-header {
            width: 100%;
            margin-right: auto;
            margin-left: auto;
            max-width: 384px;
            @media (min-width: 1024px) {
                width: 384px;
            }
            img {
                display: block;
                margin-right: auto;
                margin-left: auto;
                @media (min-width: 1024px) {
                    //display:none;
                }
            }
            h2 {
                margin-top: 24px;
                font-size: 25px;
                line-height: 31.8px;
                font-weight: 400;
                text-align: center;
                color: var(--color-body);
            }
            p {
                text-align: center;
                font-size: 14px;
                line-height: 16.8px;
                font-weight: 400;
            }
        }
        .auth-content {
            margin-top: 0px;
        }
        @media (min-width: 640px) {
            padding-left: 24px;
            padding-right: 24px;
        }
        @media (min-width: 1024px) {
            flex: 1 1 0%;
            padding-left: 80px;
            padding-right: 80px;
        }
        @media (min-width: 1280px) {
            padding-left: 96px;
            padding-right: 96px;
        }
    }
    .auth-left-side {
        display: none;
        position: relative;
        width: 0px;
        flex: 1 1 0%;
        background-image: var(--auth-image);
        background-repeat: no-repeat;
        //background-attachment:fixed;
        background-position: center;
        background-size: cover;
        @media (min-width: 1024px) {
            display: block;
        }
        .image {
            //background: rgba(0, 147, 187, 0.3);
            background: var(--auth-bgimage-color);
            position: absolute;
            // width:736px;
            // height:1024px;
            top: 0px;
            right: 0px;
            bottom: 0px;
            left: 0px;
            object-fit: cover;
            .logo {
                height: auto;
                width: 100px;
                margin-top: 32px;
                margin-left: 24px;
            }
            .title {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 50vh;
                h2 {
                    font-size: 45px;
                    line-height: 35px;
                    font-weight: 700;
                    text-align: center;
                    color: #ffffff;
                }
            }
        }
    }
}

.link {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    //flex: 1 1 0%;
    padding-bottom: 55px;
    * {
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 21px;
        color: var(--color-secondary);
    }
}
</style>
