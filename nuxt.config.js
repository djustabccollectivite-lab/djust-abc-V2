/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs';
import path from 'path';
// Env File
const envPath = process.env.ENV ? `env/.env-${process.env.ENV}` : 'env/.env-djust';
require('dotenv').config({ path: envPath });

// Theme
const theme = process.env.THEME === 'djustpublic' ? 'djust' : process.env.THEME || 'djust';

// Store ID
const storeId = process.env.STORE_ID;

// Client
const clientName = process.env.CLIENT.toLowerCase();

// Get version release
const packageJson = fs.readFileSync('./package.json');
const version = JSON.parse(packageJson).version || 0;

// Get Locale
const locale = process.env.LOCALE ? process.env.LOCALE : 'fr';

const ssr = process.env.FRONT_MODE === 'ssr';

// Favicon
const favicon = process.env.FAVICON ? process.env.FAVICON : 'favicon_djust.ico';

// Get Contact List
const contactList = process.env.CONTACT_LIST ? JSON.parse(process.env.CONTACT_LIST) : process.env.EMAIL;
// Check locale
const locales = [
    { code: 'en', file: 'en.json' },
    { code: 'fr', file: 'fr.json' },
];

// Get application ENV
const applicationEnv = ['preprod', 'prod'].includes(process.env.APPLICATION_ENV)
    ? process.env.APPLICATION_ENV
    : 'preprod';


export default {
    ssr, // Disable Server Side rendering
    target: 'server', // à verifier
    buildDir: `.nuxt-${theme}`,
    head: {
        htmlAttrs: {
            lang: locale,
        },
        titleTemplate: `${process.env.NUXT_ENV_TITLE}`,
        title: `${process.env.NUXT_ENV_DESCRIPTIONN}`,
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                hid: 'description',
                name: 'description',
                content: `${process.env.NUXT_ENV_DESCRIPTIONN}`,
            },
        ],
        link: [
            // Google icons
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
            },
            // Favicon
            // { rel: 'icon', type: 'image/x-icon', href: `/${favicon}` },
        ],
    },

    css: [
        'swiper/dist/css/swiper.css',
        '~/static/fonts/Linearicons/Font/demo-files/demo.css',
        '~/static/fonts/font-awesome/css/font-awesome.css',
        '~/static/css/bootstrap.min.css',
        `~/assets/scss/style.scss`,
    ],

    plugins: [
        { src: "~/plugins/firebase.ts", ssr: true },
        { src: '~/plugins/mangopay.js', ssr: false },
        { src: '~plugins/vueliate.js', ssr: false },
        { src: '~/plugins/swiper-plugin.js', ssr: false },
        { src: '~/plugins/vue-notification.js', ssr: false },
        { src: '~/plugins/axios.js', ssr: true },
        { src: '~/plugins/lazyLoad.js', ssr: false },
        { src: '~/plugins/core.ts', ssr: true },
        { src: '~/plugins/purjus.ts', ssr: true },
        { src: '~/plugins/token.js', ssr: false },
        { src: '~/plugins/vee-validate.js', ssr: false },
        { src: '~/plugins/bigDecimal.ts', ssr: false },
        { src: '~/plugins/spelljackingProtection.ts', mode: 'client' },
        { src: '~/plugins/adyen.js', ssr: false },
    ],

    buildModules: [
        '@nuxtjs/vuetify',
        '@nuxtjs/style-resources',
        '@nuxtjs/composition-api/module',
        'cookie-universal-nuxt',
        '@nuxt/typescript-build',
        '@nuxtjs/google-analytics',
        [
            '@storyblok/nuxt-2/module',
            {
                accessToken: process.env.NUXT_ENV_STORYBLOK_KEY ?? '********',
                apiOptions: {
                    // storyblok-js-client options
                    cache: { type: 'memory', clear: 'manual' },
                    // region: 'us'
                },
            },
        ],
        [
            'nuxt-compress',
            {
                gzip: {
                    threshold: 8192,
                },
                brotli: {
                    threshold: 8192,
                },
            },
        ],
    ],
    modules: [
        '~/modules/quote/index.js',
        '~/modules/checkout/index.js',
        '~/modules/buyingList/index.js',
        '~/modules/payement/index.js',
        '@nuxtjs/axios',
        'vue-toastification/nuxt',
        '@nuxtjs/auth-next',
        '@nuxtjs/i18n',
        '@nuxtjs/gtm',
        '@nuxtjs/sentry',
        'nuxt-client-init-module',
    ],
    captcha: {
        siteKey: process.env.CAPTCHA_SITE_KEY ?? 'NO_KEY',
    },
    serverMiddleware: ['~/middleware/security.js'],
    sentry: {
        lazy: true,
        config: {
            environment: `${theme}-${applicationEnv === 'prod' ? 'PROD' : 'PREPROD'}`,
            release: `${theme}-${version || 'default-release'}`,
        },
        clientIntegrations: {
            Replay: {
                maskAllText: false,
                blockAllMedia: false,
            },
        },
        clientConfig: {
            replaysSessionSampleRate: 0,
            replaysOnErrorSampleRate: 1.0,
        },
        tracing: true,
    },
    toast: {
        transition: 'Vue-Toastification__bounce',
        maxToasts: 20,
        newestOnTop: true,
        position: process.env.NOTIFICATION_TOAST_POSITION || 'top-right',
        timeout: 3000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: false,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: true,
        hideProgressBar: false,
        closeButton: 'button',
        icon: true,
        rtl: false,
    },
    gtm: {
        enabled: process.env.NUXT_GTM_TAG_ACTIVATION === 'true',
        id: process.env.NUXT_GTM_TAG,
    },
    googleAnalytics: {
        id: process.env.GOOGLE_ANALYTICS_ID,
    },
    i18n: {
        locales,
        lazy: true,
        defaultLocale: locale,
        strategy: 'no_prefix',
        langDir: 'lang/locales/' + theme,
        detectBrowserLanguage: false,
        disableDefaultRedirect: true,
        parsePages: false,
    },
    build: {
        postcss: null,
        transpile: ['vee-validate/dist/rules', 'friendly-challenge'],
        extend(config) {
            Object.assign(config.resolve.alias, require('./aliases.config'));
            config.module.rules.push({
                test: /\.twig$/,
                use: 'twig-loader',
            });

            const aliasPath = `themes/${theme}/assets/config/robots_prod.txt`;
            const aliasPathSiteMap = `themes/${theme}/assets/config/sitemap${theme === 'abc' ? `-${clientName}` : ''}.xml`;

            const robotsTxtPath = path.resolve(__dirname, 'static/robots.txt');
            const sitemapPath = path.resolve(__dirname, `static/sitemap${theme === 'abc' ? `-${clientName}` : ''}.xml`);

            const fs = require('fs');
            if (process.env.APPLICATION_ENV === 'prod' && theme !== 'djust' && fs.existsSync(aliasPath)) {
                const customRobotsTxt = fs.readFileSync(aliasPath, 'utf-8');
                fs.writeFileSync(robotsTxtPath, customRobotsTxt);
            } else if (fs.existsSync(robotsTxtPath)) {
                fs.unlinkSync(robotsTxtPath);
            }
            if (fs.existsSync(aliasPathSiteMap) && theme !== 'djust' && process.env.APPLICATION_ENV === 'prod') {
                const customSiteMap = fs.readFileSync(aliasPathSiteMap, 'utf-8');
                fs.writeFileSync(sitemapPath, customSiteMap);
            } else if (fs.existsSync(sitemapPath)) {
                fs.unlinkSync(sitemapPath);
            }
        },
    },
    /*
     ** themed pages
     */
    router: {
        linkActiveClass: '',
        linkExactActiveClass: 'active',
        middleware: ['maintenance', 'auth', 'franprix-middleware'],
        extendRoutes(routes, resolve) {
            if (theme === 'djust') {
                console.log('You are using a default djust theme !');
                return;
            }
            console.log('✔ You are using theme: ' + theme);
            console.log('✔ Default Locale: ' + locale);

            routes.map((route) => {
                const path = resolve(`themes/${theme}/${route.chunkName}.vue`);
                if (fs.existsSync(path)) {
                    route.component = path;
                }

                return route;
            });
        },
    },
    server: {
        port: process.env.PORT || 3000,
        host: '0.0.0.0',
        timing: false,
    },
    env: {
        storyblockApiKey: process.env.NUXT_ENV_STORYBLOK_KEY,
        storyblockApiKeyProd: process.env.NUXT_ENV_STORYBLOK_KEY_PROD,
        storyblockApiKeyDraft: process.env.NUXT_ENV_STORYBLOK_KEY_DRAFT,
        storyblockConfig: process.env.NUXT_ENV_STORYBLOK_KEY_CONFIG,
        header_transparent: process.env.NUXT_ENV_HEADER_TRANSPARENT,
        home_notfullwidth: process.env.NUXT_ENV_HOME_NOTFULLWIDTH,
        tag_prefix: process.env.tag_prefix,
        split_bastket: process.env.NUXT_ENV_SPLIT_BASKET === 'true',
        storyblok_home: process.env.NUXT_ENV_STORYBLOK_HP,
        storyblok_logo: process.env.NUXT_ENV_STORYBLOK_LOGO,
        storyblok_hp_connected: process.env.NUXT_ENV_STORYBLOK_HP_CONNECTED,
        storyblok_bgLogin: process.env.NUXT_ENV_STORYBLOK_BGLOGIN,
        quoteIsActive: process.env.MODULE_QUOTE === 'true',
        checkoutIsActive: process.env.MODULE_CHECKOUT === 'true',
        buyingListIsActive: process.env.MODULE_BUYINGLIST === 'true',
        ads_image: process.env.NUXT_ENV_STORYBLOK_ADS_IMAGE,
        store_type: process.env.STORE_TYPE,
        ecoTagId: process.env.ECOTAG_ID,
        essentialTagId: process.env.ESSENTIAL_TAG_ID,
    },
    axios: {
        proxy: true,
        common: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    },
    auth: {
        localStorage: false,
        watchLoggedIn: true,
        autoLogout: true,
        redirect: {
            login: '/auth/login',
            logout: '/',
            callback: '/auth/login',
            home: '/',
        },
        strategies: {
            local: {
                scheme: 'refresh',
                token: {
                    property: 'token.accessToken',
                    maxAge: 'token.expireAt',
                    type: 'Bearer',
                    global: true,
                },
                refreshToken: {
                    property: 'token.refreshToken',
                    data: 'refreshToken',
                    maxAge: 'token.expireAt',
                    required: true,
                },
                user: {
                    property: 'user',
                    autoFetch: true,
                },
                endpoints: {
                    login: { url: '/auth/token', method: 'post' },
                    refresh: { url: '/auth/refresh-token', method: 'post' },
                    user: false,
                    logout: { url: '/auth/revoke-token', method: 'post' },
                },
            },
        },
        plugins: [{ src: '~/plugins/axios', ssr: true }],
    },
    publicRuntimeConfig: {
        application_env: applicationEnv,
        baseUrl: process.env.NUXT_ENV_API_URL,
        CMSUrl: process.env.NUXT_ENV_CMS_URL,
        catalog_mode: process.env.NUXT_ENV_CATALOG_MODE,
        ads_image: process.env.NUXT_ENV_STORYBLOK_ADS_IMAGE,
        quoteIsActive: process.env.MODULE_QUOTE === 'true',
        checkoutIsActive: process.env.MODULE_CHECKOUT === 'true',
        payementIsActive: process.env.MODULE_PAYEMENT === 'true',
        store_type: process.env.STORE_TYPE === 'private' ? 'private' : 'public',
        layout_type: process.env.LAYOUT_TYPE === 'horizontal' ? 'horizontal' : 'vertical',
        list_view_mode: process.env.LIST_VIEW_MODE,
        header_transparent: process.env.NUXT_ENV_HEADER_TRANSPARENT,
        home_notfullwidth: process.env.NUXT_ENV_HOME_NOTFULLWIDTH,
        tag_prefix: process.env.tag_prefix,
        split_bastket: process.env.NUXT_ENV_SPLIT_BASKET === 'true',
        storyblockApiKey: process.env.NUXT_ENV_STORYBLOK_KEY,
        storyblockApiKeyProd: process.env.NUXT_ENV_STORYBLOK_KEY_PROD,
        storyblockApiKeyDraft: process.env.NUXT_ENV_STORYBLOK_KEY_DRAFT,
        storyblockConfig: process.env.NUXT_ENV_STORYBLOK_KEY_CONFIG,
        storyblok_home: process.env.NUXT_ENV_STORYBLOK_HP,
        storyblok_hp_connected: process.env.NUXT_ENV_STORYBLOK_HP_CONNECTED,
        storyblok_about_us: process.env.NUXT_ENV_STORYBLOK_ABOUT_US,
        storyblok_footer: process.env.NUXT_ENV_STORYBLOK_FOOTER,
        storyblok_logo: process.env.NUXT_ENV_STORYBLOK_LOGO,
        storyblok_bgLogin: process.env.NUXT_ENV_STORYBLOK_BGLOGIN,
        buyingListIsActive: process.env.MODULE_BUYINGLIST === 'true',
        layoutType: process.env.LAYOUT_TYPE,
        customizer: process.env.CUSTOMIZER,
        homeType: process.env.HOME_TYPE,
        styleFile: process.env.STYLEFILE,
        titleTemplate: process.env.NUXT_ENV_TITLE,
        title: process.env.NUXT_ENV_TITLE,
        description: process.env.NUXT_ENV_DESCRIPTIONN,
        mode: process.env.STORE_TYPE,
        storyblok_header: process.env.NUXT_ENV_STORYBLOK_HEADER,
        storyblok_auth: process.env.NUXT_ENV_STORYBLOK_AUTH,
        storyblok_generalsettings: process.env.NUXT_ENV_STORYBLOK_GENERALSETTINGS,
        storyblok_logowithcolor: process.env.NUXT_ENV_STORYBLOK_LOGOWITHCOLOR,
        defaultLeadTimeToShop: process.env.DEFAULTLEADTIMETOSHIP,
        email: process.env.EMAIL,
        homepageimage: process.env.NUXT_ENV_STORYBLOK_HOMEPAGEIMAGE,
        fastorderupload: process.env.FASTORDERUPLOAD,
        themeName: process.env.CLIENT,
        clientName: process.env.CLIENT,
        website: process.env.WEBSITE,
        checkStock: process.env.CHECKSTOCK === 'true',
        apiKey: process.env.APIKEY,
        webhelp: process.env.WEBHELP,
        rgpd: process.env.NUXT_ENV_STORYBLOK_RGPD,
        ml: process.env.NUXT_ENV_STORYBLOK_ML,
        ml_page: process.env.NUXT_ENV_STORYBLOK_ML_PAGE,
        pl_conf_page: process.env.NUXT_ENV_STORYBLOK_POL_CONF_PAGE,
        cgu: process.env.NUXT_ENV_STORYBLOK_CGU,
        cgvente: process.env.NUXT_ENV_STORTBLOK_CGVENTE,
        gtmTag: process.env.NUXT_GTM_TAG,
        cfcategory: process.env.CFCATEGORY,
        ecoTagId: process.env.ECO_TAG_ID,
        essentialTagId: process.env.ESSENTIAL_TAG_ID,
        favicon,
        bankTransfert: process.env.MODULE_PAYEMENT_BANK_TRANSFERT === 'true' ? 'true' : false,
        page_presentation: process.env.NUXT_ENV_STORYBLOK_PRESENTATION,
        maintenancePage: process.env.NUXT_ENV_STORYBLOK_MAINTENANCE_PAGE,
        customerReviewIsActive: process.env.CUSTOMER_REVIEW === 'true',
        version,
        storyblok_faq_page: process.env.NUXT_ENV_STORYBLOK_FAQ_PAGE,
        storyblok_payment_page: process.env.NUXT_ENV_STORYBLOK_PAYMENT_PAGE,
        storyblok_delivery_page: process.env.NUXT_ENV_STORYBLOK_DELIVERY_PAGE,
        storyblok_contact_page: process.env.NUXT_ENV_STORYBLOK_CONTACT_PAGE,
        storyblok_who_we_are_page: process.env.NUXT_ENV_STORYBLOK_WHO_WE_ARE_PAGE,
        cf_op_cols_order: process.env.CF_OP_COLS_ORDER,
        cf_cart_cols_order: process.env.CF_CART_COLS_ORDER,
        contactList,
        storeId,
        storeIdViewId: process.env.STORE_VIEW_ID,
        storeIdCallback: process.env.STORE_ID_CALLBACK,
        storeIdViewIdCallback: process.env.STORE_VIEW_ID_CALLBACK,
        mailListFromStoryblok: process.env.MAIL_LIST_FROM_STORYBLOK,
        brevoApiKey: process.env.BREVO_API_KEY,
        sendMailBaseUrl: process.env.SEND_MAIL_BASE_URL,
        contactMail: process.env.CONTACT_MAIL,
        Mail_Api_Key: process.env.MAIL_API_KEY,
        app_env: process.env.APPLICATION_ENV === 'preprod' ? 'noindex' : 'index',
        ecosource_comparator_url: process.env.NUXT_ENV_ECOSOURCE_COMPARATOR_URL,
        pappers_url: process.env.PAPPERS_URL,
        pappers_api_key: process.env.PAPPERS_API_KEY,
        storyblok_checkout: process.env.NUXT_ENV_STORYBLOK_CHECKOUT,
        use_new_cart: process.env.NUXT_ENV_USE_NEW_CART === 'true',
        use_uniq_cart: process.env.USE_UNIQUE_CART === 'true',
        gtm: {
            id: process.env.NUXT_GTM_TAG,
            enabled: process.env.NUXT_GTM_TAG_ACTIVATION === 'true',
        },
        googleAnalytics: {
            id: process.env.GOOGLE_ANALYTICS_ID,
        },
        isMaintenanceMode: process.env.MAINTENANCE_MODE === 'true',
        currency: process.env.NUXT_ENV_CURRENCY,
        ivalua_url: process.env.IVALUA_URL,
        punchout_tenant_id: process.env.PUNCHOUT_TENANT_ID,
        punchout_tenant_config_id: process.env.PUNCHOUT_TENANT_CONFIG_ID,
        codealRefChantierTmp: process.env.CODEAL_REF_CHANTIER_TMP,
        storyblokBrandPage: process.env.NUXT_ENV_STORYBLOK_BRANDS_PAGE,
        storyblokReferencesPage: process.env.NUXT_ENV_STORYBLOK_REFERENCES,
        relatedProducts: process.env.NUXT_ENV_STORYBLOK_RELATED_PRODUCTS,
        cart_paginate_size: process.env.NUXT_ENV_CART_PAGINATE_SIZE,
        GroupPage: process.env.NUXT_ENV_YACK_GROUP,
        SmartGroupPage: process.env.NUXT_ENV_YACK_SMART,
        GroupFooter: process.env.NUXT_ENV_GROUP_FOOTER,
        Engagement: process.env.NUXT_ENV_YACK_ENGAGEMENT,
        InstitutePage: process.env.NUXT_ENV_YACK_INSTITUTE,
        storyblok_actualites: process.env.NUXT_ENV_STORYBLOK_ACTUALITIES,
        storyblok_banners: process.env.NUXT_ENV_STORYBLOK_BANNERS,
        EnvProxyDateDropEndPoint: process.env.VEJA_ENV_PROXY_DATE_DROP_ENDPOINT,
        locale: process.env.LOCALE,
        storyblok_multilang: process.env.STORYBLOK_MULTILANG ?? false,
        storyblok_default_lang: process.env.STORYBLOK_DEFAULT_LANG ?? process.env.LOCALE,
        storyblok_related_categories_partial: process.env.NUXT_ENV_STORYBLOK_RELATED_CATEGORIES_PARTIAL,
        sentry: {
            config: {
                enabled: process.env.NUXT_ENV_SENTRY_ENABLED === 'true',
                environment: process.env.SENTRY_ENVIRONMENT,
            },
        },
        Sage: {
            cartUrl: process.env.SAGE_CART_URL,
            groupOrderUrl: process.env.SAGE_GROUP_ORDER_URL,
        },
        pjProxyApi: process.env.NUXT_ENV_PURJUS_PROXY_API,
        pjProxyApiKey: process.env.NUXT_ENV_PURJUS_PROXY_API_KEY,
        pjProxyApiUsername: process.env.NUXT_ENV_PURJUS_PROXY_API_USERNAME,
        pdfGeneratorUrl: process.env.PDF_GENERATOR_URL,
        testingPerfEnv: process.env.TESTING_PERF_ENV ?? false,
        payment: {
            mangopay: {
                environnement: process.env.MANGOPAY_ENVIRONNEMENT,
                clientId: process.env.MANGOPAY_CLIENT_ID,
                clientApiKey: process.env.MANGOPAY_CLIENT_API_KEY,
                api_baseUrl: process.env.MANGOPAY_API_BASE_URL,
                paymentType: process.env.MANGOPAY_PAYMENT_TYPE,
                cartType: process.env.MANGOPAY_CART_TYPE,
                returnUrl: process.env.MANGOPAY_RETURN_URL,
                profilingMerchantId: process.env.MANGOPAY_PROFILING_MERCHANT_ID,
            },
            adyen: {
                environment: process.env.ADYEN_ENVIRONMENT,
                clientKey: process.env.ADYEN_CLIENT_KEY,
            },
        },
        friendlyCaptchaSiteKey: process.env.CAPTCHA_SITE_KEY ?? 'NO_KEY',
        faqIframeUrl: process.env.FAQ_IFRAME_URL,
        useActiveCategoriesOnly: process.env.DISPLAY_ACTIVE_CATEGORIES_ONLY === 'true',
        secureCookies: process.env.SECURE_COOKIES === 'true',
    },
    privateRuntimeConfig: {
        STRIPE_PK: process.env.STRIPE_PK,
        axios: {
            common: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
                client: 'ACCOUNT',
            },
        },
        baseUrl: process.env.NUXT_ENV_API_URL,
        layout_type: process.env.LAYOUT_TYPE === 'horizontal' ? 'horizontal' : 'vertical',
        email: process.env.EMAIL,
        apiKey: process.env.APIKEY,
        app_env: process.env.APPLICATION_ENV === 'preprod' ? 'noindex' : 'index',
    },
};
