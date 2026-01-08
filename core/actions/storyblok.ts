export default (context: any) => ({
    GetStoryBlockConfiguration() {
        const X =
            context.$config.storyblockConfig === 'prod'
                ? {
                      token: context.$config.storyblockApiKeyProd
                          ? context.$config.storyblockApiKeyProd
                          : process.env.NUXT_ENV_PROD_STORYBLOK_KEY,
                      version: 'published',
                  }
                : {
                      token: context.$config.storyblockApiKeyDraft
                          ? context.$config.storyblockApiKeyDraft
                          : process.env.NUXT_ENV_PROD_TORYBLOK_KEY_DRAFT,
                      version: 'draft',
                  };
        return X;
    },
    async getStoryBlokContent(story: string) {
        const params = await this.GetStoryBlockConfiguration();
        return context.$storyapi
            .get(`cdn/stories/${context.$config[story] ?? story}`, params)
            .then((res: { data: { story: { content: any } } }) => {
                return res.data.story.content;
            })
            .catch((_res: any) => {});
    },
    async getHomePage() {
        const params = await this.GetStoryBlockConfiguration();
        const locale = context.i18n.localeProperties.code;
        const link = `cdn/stories${context.$config.storyblok_multilang && locale !== context.$config.storyblok_default_lang ? '/' + locale : ''}/${context.$config.storyblok_home}`;
        return context.$storyapi
            .get(link, params)
            .then((res) => {
                context.store.commit('storyblok/setHomePage', res.data.story.content.body);
                return res.data.story.content.body;
            })
            .catch((res) => {
                if (!res.response) {
                    console.error(res);
                    console.error({ statusCode: 404, message: 'Failed to receive content from api' });
                } else {
                    console.error(res.response.data);
                    console.error({ statusCode: res.response.status, message: res.response.data });
                }
            });
    },
    async getGeneralSettings() {
        const params = await this.GetStoryBlockConfiguration();
        return context.$storyapi
            .get(`cdn/stories/${context.$config.storyblok_generalsettings}`, params)
            .then((res) => {
                context.store.commit('storyblok/setGeneralSettings', res.data.story.content.body);
                return res.data.story.content.body;
            })
            .catch((res) => {
                if (!res.response) {
                    console.error(res);
                    console.error({ statusCode: 404, message: 'Failed to receive content from api' });
                } else {
                    console.error(res.response.data);
                    console.error({ statusCode: res.response.status, message: res.response.data });
                }
            });
    },
    async getCheckoutPage() {
        const params = await this.GetStoryBlockConfiguration();
        return context.$storyapi
            .get(`cdn/stories/${context.$config.storyblok_checkout}`, params)
            .then((res) => {
                return res.data.story.content.body;
            })
            .catch((res) => {
                if (!res.response) {
                    console.error(res);
                    console.error({ statusCode: 404, message: 'Failed to receive content from api' });
                } else {
                    console.error(res.response.data);
                    console.error({ statusCode: res.response.status, message: res.response.data });
                }
            });
    },
    async getHPConnectedPage() {
        const params = await this.GetStoryBlockConfiguration();
        const locale = context.i18n.localeProperties.code;
        const link = `cdn/stories${context.$config.storyblok_multilang && locale !== context.$config.storyblok_default_lang ? '/' + locale : ''}/${context.$config.storyblok_hp_connected}`;
        return context.$storyapi
            .get(link, params)
            .then((res) => {
                context.store.commit('storyblok/setHomePage', res.data.story.content.body);
                return res.data.story.content.body;
            })
            .catch((res) => {
                if (!res.response) {
                    console.error(res);
                    console.error({ statusCode: 404, message: 'Failed to receive content from api' });
                } else {
                    console.error(res.response.data);
                    console.error({ statusCode: res.response.status, message: res.response.data });
                }
            });
    },
    async getAboutUsPage() {
        const params = await this.GetStoryBlockConfiguration();
        const locale = context.i18n.localeProperties.code;
        const link = `cdn/stories${context.$config.storyblok_multilang && locale !== context.$config.storyblok_default_lang ? '/' + locale : ''}/${context.$config.storyblok_about_us}`;
        return context.$storyapi
            .get(link, params)
            .then((res) => {
                context.store.commit('storyblok/setHomePage', res.data.story.content.body);
                return res.data.story.content.body;
            })
            .catch((res) => {
                if (!res.response) {
                    console.error(res);
                    console.error({ statusCode: 404, message: 'Failed to receive content from api' });
                } else {
                    console.error(res.response.data);
                    console.error({ statusCode: res.response.status, message: res.response.data });
                }
            });
    },
    async getLogo() {
        const params = await this.GetStoryBlockConfiguration();
        return context.$storyapi
            .get(`cdn/stories/${context.$config.storyblok_logo}`, params)
            .then((res) => {
                context.store.commit('storyblok/setLogo', res.data.story.content.logo.filename);
                return res.data.story.content.logo.filename;
            })
            .catch((res) => {
                if (!res.response) {
                    console.error(res);
                    console.error({ statusCode: 404, message: 'Failed to receive content from api' });
                } else {
                    console.error(res.response.data);
                    console.error({ statusCode: res.response.status, message: res.response.data });
                }
            });
    },
    async getLogoWithColor() {
        const params = await this.GetStoryBlockConfiguration();
        return context.$storyapi
            .get(`cdn/stories/${context.$config.storyblok_logowithcolor}`, params)
            .then((res) => {
                context.store.commit('storyblok/setLogoWithColor', res.data.story.content.logo.filename);
                return res.data.story.content.logo.filename;
            })
            .catch((res) => {
                if (!res.response) {
                    console.error(res);
                    console.error({ statusCode: 404, message: 'Failed to receive content from api' });
                } else {
                    console.error(res.response.data);
                    console.error({ statusCode: res.response.status, message: res.response.data });
                }
            });
    },
    async getHomePageImage() {
        const params = await this.GetStoryBlockConfiguration();
        return context.$storyapi
            .get(`cdn/stories/${context.$config.homepageimage}`, params)
            .then((res) => {
                context.store.commit('storyblok/setHomepageimage', res.data.story.content.logo.filename);
                return res.data.story.content.logo.filename;
            })
            .catch((res) => {
                if (!res.response) {
                    console.error(res);
                    console.error({ statusCode: 404, message: 'Failed to receive content from api' });
                } else {
                    console.error(res.response.data);
                    console.error({ statusCode: res.response.status, message: res.response.data });
                }
            });
    },
    async getHeader() {
        const params = await this.GetStoryBlockConfiguration();
        return context.$storyapi
            .get(`cdn/stories/${context.$config.storyblok_header}`, params)
            .then((res) => {
                context.store.commit('storyblok/setHeader', res.data.story.content);
                return res.data.story.content;
            })
            .catch((res) => {
                if (!res.response) {
                    console.error(res);
                    console.error({ statusCode: 404, message: 'Failed to receive content from api' });
                } else {
                    console.error(res.response.data);
                    console.error({ statusCode: res.response.status, message: res.response.data });
                }
            });
    },
    async getAuthConfig() {
        const params = await this.GetStoryBlockConfiguration();
        return context.$storyapi
            .get(`cdn/stories/${context.$config.storyblok_auth}`, params)
            .then((res) => {
                context.store.commit('storyblok/setAuthConfig', res.data.story.content);
                return res.data.story.content;
            })
            .catch((res) => {
                if (!res.response) {
                    console.error(res);
                    console.error({ statusCode: 404, message: 'Failed to receive content from api' });
                } else {
                    console.error(res.response.data);
                    console.error({ statusCode: res.response.status, message: res.response.data });
                }
            });
    },
    async getBgLogin() {
        const params = await this.GetStoryBlockConfiguration();
        return context.$storyapi
            .get(`cdn/stories/${context.$config.storyblok_bgLogin}`, params)
            .then((res) => {
                context.store.commit('storyblok/setBgLogin', res.data.story.content.logo.filename);
                return res.data.story.content.logo.filename;
            })
            .catch((res) => {
                if (!res.response) {
                    console.error(res);
                    console.error({ statusCode: 404, message: 'Failed to receive content from api' });
                } else {
                    console.error(res.response.data);
                    console.error({ statusCode: res.response.status, message: res.response.data });
                }
            });
    },
    async getAdsImage() {
        const params = await this.GetStoryBlockConfiguration();
        return context.$storyapi
            .get(`cdn/stories/${context.$config.ads_image}`, params)
            .then((res) => {
                context.store.commit('storyblok/setAdsImage', res.data.story.content.logo.filename);
                return res.data.story.content.logo.filename;
            })
            .catch((res) => {
                if (!res.response) {
                    console.error(res);
                    console.error({ statusCode: 404, message: 'Failed to receive content from api' });
                } else {
                    console.error(res.response.data);
                    console.error({ statusCode: res.response.status, message: res.response.data });
                }
            });
    },
    async getRgpdFile() {
        const params = await this.GetStoryBlockConfiguration();
        return context.$storyapi
            .get(`cdn/stories/${context.$config.rgpd}`, params)
            .then((res) => {
                context.store.commit('storyblok/setRgpdFile', res.data.story.content.file.filename);
                return res.data.story.content.file.filename;
            })
            .catch((res) => {
                if (!res.response) {
                    console.error(res);
                    console.error({ statusCode: 404, message: 'Failed to receive content from api' });
                } else {
                    console.error(res.response.data);
                    console.error({ statusCode: res.response.status, message: res.response.data });
                }
            });
    },
    async getMlFile() {
        const params = await this.GetStoryBlockConfiguration();
        return context.$storyapi
            .get(`cdn/stories/${context.$config.ml}`, params)
            .then((res) => {
                context.store.commit('storyblok/setMlFile', res.data.story.content.file.filename);
                return res.data.story.content.file.filename;
            })
            .catch((res) => {
                if (!res.response) {
                    console.error(res);
                    console.error({ statusCode: 404, message: 'Failed to receive content from api' });
                } else {
                    console.error(res.response.data);
                    console.error({ statusCode: res.response.status, message: res.response.data });
                }
            });
    },
    async getCguFile() {
        const params = await this.GetStoryBlockConfiguration();
        return context.$storyapi
            .get(`cdn/stories/${context.$config.cgu}`, params)
            .then((res) => {
                return res.data.story.content.file.filename;
            })
            .catch((res) => {
                if (!res.response) {
                    console.error({ statusCode: 404, message: 'Failed to receive content from api' });
                } else {
                    console.error(res.response.data);
                    console.error({ statusCode: res.response.status, message: res.response.data });
                }
            });
    },
    async getCgventeFile() {
        const params = await this.GetStoryBlockConfiguration();
        return context.$storyapi
            .get(`cdn/stories/${context.$config.cgvente}`, params)
            .then((res) => {
                return res.data.story.content.file.filename;
            })
            .catch((res) => {
                if (!res.response) {
                    console.error({ statusCode: 404, message: 'Failed to receive content from api' });
                } else {
                    console.error(res.response.data);
                    console.error({ statusCode: res.response.status, message: res.response.data });
                }
            });
    },
    async getPresentationPage() {
        const params = await this.GetStoryBlockConfiguration();
        const locale = context.i18n.localeProperties.code;
        const link = `cdn/stories${context.$config.storyblok_multilang && locale !== context.$config.storyblok_default_lang ? '/' + locale : ''}/${context.$config.page_presentation}`;
        return context.$storyapi
            .get(link, params)
            .then((res) => {
                return res.data.story.content;
            })
            .catch((res) => {
                if (!res.response) {
                    console.error(res);
                    console.error({ statusCode: 404, message: 'Failed to receive content from api' });
                } else {
                    console.error(res.response.data);
                    console.error({ statusCode: res.response.status, message: res.response.data });
                }
            });
    },
    async getFooter() {
        const params = await this.GetStoryBlockConfiguration();
        const locale = context.i18n.localeProperties.code;
        const link = `cdn/stories${context.$config.storyblok_multilang && locale !== context.$config.storyblok_default_lang ? '/' + locale : ''}/${context.$config.storyblok_footer}`;
        return context.$storyapi
            .get(link, params)
            .then((res) => {
                context.store.commit('storyblok/setFooter', res.data.story.content);
                return res.data.story.content;
            })
            .catch((res) => {
                if (!res.response) {
                    console.error(res);
                    console.error({ statusCode: 404, message: 'Failed to receive content from api' });
                } else {
                    console.error(res.response.data);
                    console.error({ statusCode: res.response.status, message: res.response.data });
                }
            });
    },
    async getFaqPage() {
        const params = await this.GetStoryBlockConfiguration();
        const locale = context.i18n.localeProperties.code;
        const link = `cdn/stories${context.$config.storyblok_multilang && locale !== context.$config.storyblok_default_lang ? '/' + locale : ''}/${context.$config.storyblok_faq_page}`;
        return context.$storyapi
            .get(link, params)
            .then((res) => {
                return res.data.story.content;
            })
            .catch((res) => {
                if (!res.response) {
                    console.error(res);
                    console.error({ statusCode: 404, message: 'Failed to receive content from api' });
                } else {
                    console.error(res.response.data);
                    console.error({ statusCode: res.response.status, message: res.response.data });
                }
            });
    },
    async getMentionsLegalesPage() {
        const params = await this.GetStoryBlockConfiguration();
        const locale = context.i18n.localeProperties.code;
        const link = `cdn/stories${context.$config.storyblok_multilang && locale !== context.$config.storyblok_default_lang ? '/' + locale : ''}/${context.$config.ml_page}`;
        return context.$storyapi
            .get(link, params)
            .then((res) => {
                return res.data.story.content;
            })
            .catch((res) => {
                if (!res.response) {
                    console.error(res);
                    console.error({ statusCode: 404, message: 'Failed to receive content from api' });
                } else {
                    console.error(res.response.data);
                    console.error({ statusCode: res.response.status, message: res.response.data });
                }
            });
    },
    async getPolitiqueConfidentialite() {
        const params = await this.GetStoryBlockConfiguration();
        const locale = context.i18n.localeProperties.code;
        const link = `cdn/stories${context.$config.storyblok_multilang && locale !== context.$config.storyblok_default_lang ? '/' + locale : ''}/${context.$config.pl_conf_page}`;
        return context.$storyapi
            .get(link, params)
            .then((res) => {
                return res.data.story.content;
            })
            .catch((res) => {
                if (!res.response) {
                    console.error(res);
                    console.error({ statusCode: 404, message: 'Failed to receive content from api' });
                } else {
                    console.error(res.response.data);
                    console.error({ statusCode: res.response.status, message: res.response.data });
                }
            });
    },
    async getMailListFromStoryblok() {
        const params = await this.GetStoryBlockConfiguration();
        return context.$storyapi
            .get(`cdn/stories/${context.$config.mailListFromStoryblok}`, params)
            .then((res) => {
                return res.data.story.content;
            })
            .catch((res) => {
                if (!res.response) {
                    console.error(res);
                    console.error({ statusCode: 404, message: 'Failed to receive content from api' });
                } else {
                    console.error(res.response.data);
                    console.error({ statusCode: res.response.status, message: res.response.data });
                }
            });
    },
    async getVendorFromStoryblok() {
        const params = await this.GetStoryBlockConfiguration();
        return context.$storyapi
            .get(`cdn/stories/vendor`, params)
            .then((res) => {
                return res.data.story.content;
            })
            .catch((res) => {
                if (!res.response) {
                    console.error(res);
                    console.error({ statusCode: 404, message: 'Failed to receive content from api' });
                } else {
                    console.error(res.response.data);
                    console.error({ statusCode: res.response.status, message: res.response.data });
                }
            });
    },
    async getMaintenancePage() {
        const params = await this.GetStoryBlockConfiguration();
        return context.$storyapi
            .get(`cdn/stories/${context.$config.maintenancePage}`, params)
            .then((res) => {
                return res.data.story.content;
            })
            .catch((res) => {
                if (!res.response) {
                    console.error(res);
                    console.error({ statusCode: 404, message: 'Failed to receive content from api' });
                } else {
                    console.error(res.response.data);
                    console.error({ statusCode: res.response.status, message: res.response.data });
                }
            });
    },
    async getBrandPage(slug) {
        const params = await this.GetStoryBlockConfiguration();

        return context.$storyapi
            .get(`cdn/stories/${context.$config.storyblokBrandPage}/${slug}`, params)
            .then((res) => {
                return res.data.story.content;
            })
            .catch((res) => {
                if (!res.response) {
                    console.error(res);
                    console.error({ statusCode: 404, message: 'Failed to receive content from api' });
                } else {
                    console.error({ statusCode: res.response.status, message: res.response.data });
                }
            });
    },
    async getReferencesPage() {
        const params = await this.GetStoryBlockConfiguration();

        return context.$storyapi
            .get(`cdn/stories/${context.$config.storyblokReferencesPage}`, params)
            .then((res) => {
                return res.data.story.content;
            })
            .catch((res) => {
                if (!res.response) {
                    console.error(res);
                    console.error({ statusCode: 404, message: 'Failed to receive content from api' });
                } else {
                    console.error({ statusCode: res.response.status, message: res.response.data });
                }
            });
    },
    async getYackGroupPage() {
        const params = await this.GetStoryBlockConfiguration();
        return context.$storyapi
            .get(`cdn/stories/${context.$config.GroupPage}`, params)
            .then((res: { data: { story: { content: any } } }) => {
                return res.data.story.content;
            })
            .catch((_res: any) => {});
    },
    async getYackSmartGroupPage() {
        const params = await this.GetStoryBlockConfiguration();
        return context.$storyapi
            .get(`cdn/stories/${context.$config.SmartGroupPage}`, params)
            .then((res: { data: { story: { content: any } } }) => {
                return res.data.story.content;
            })
            .catch((_res: any) => {});
    },
    async getYackLandingPage() {
        const params = await this.GetStoryBlockConfiguration();
        return context.$storyapi
            .get(`cdn/stories/landing`, params)
            .then((res: { data: { story: { content: any } } }) => {
                return res.data.story.content;
            })
            .catch((_res: any) => {});
    },
    async getYackGroupFooter() {
        const params = await this.GetStoryBlockConfiguration();
        return context.$storyapi
            .get(`cdn/stories/${context.$config.GroupFooter}`, params)
            .then((res: { data: { story: { content: any } } }) => {
                return res.data.story.content;
            })
            .catch((_res: any) => {});
    },
    async getYackEngagement() {
        const params = await this.GetStoryBlockConfiguration();
        return context.$storyapi
            .get(`cdn/stories/${context.$config.Engagement}`, params)
            .then((res: { data: { story: { content: any } } }) => {
                return res.data.story.content;
            })
            .catch((_res: any) => {});
    },
    async getYackInstituteGroupPage() {
        const params = await this.GetStoryBlockConfiguration();
        return context.$storyapi
            .get(`cdn/stories/${context.$config.InstitutePage}`, params)
            .then((res: { data: { story: { content: any } } }) => {
                return res.data.story.content;
            })
            .catch((_res: any) => {});
    },
    async getYackInstituteFormations(path: string) {
        const params = await this.GetStoryBlockConfiguration();
        return context.$storyapi
            .get(`cdn/stories/${path}`, params)
            .then((res: { data: { story: { content: any } } }) => {
                return res.data.story.content;
            })
            .catch((_res: any) => {});
    },
});
