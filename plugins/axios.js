export default function (ctx) {
    ctx.$axios.setBaseURL(ctx.$config.baseUrl);

    // Store and Store views
    if (ctx.$config.storeId) {
        ctx.$axios.setHeader('dj-store', ctx.$config.storeId);
    }
    if (ctx.$config.storeIdViewId) {
        ctx.$axios.setHeader('dj-store-view', ctx.$config.storeIdViewId);
    }

    // API Header
    const env = ctx.$config.application_env;

    const privateApiKey = env === 'preprod' ? process.env.NUXT_ENV_PREPROD_APIKEY : process.env.NUXT_ENV_PROD_APIKEY;

    ctx.$axios.setHeader(
        'dj-api-key',
        ctx.$config.testingPerfEnv || !privateApiKey ? ctx.$config.apiKey : privateApiKey,
    );
}
