export async function getStoryBlockConfiguration(config) {
    return config.storyblockConfig === 'prod'
        ? {
            token: config.storyblockApiKeyProd,
            version: 'published',
        }
        : {
            token: config.storyblockApiKeyDraft,
            version: 'draft',
        };
}