import type { Context } from '@nuxt/types';

export default (context: Context) => ({
    async getBrandFilterForShowLogo(brandName: string) {
        if (!brandName) {
            return;
        }
        const homeComponents = await context.$core.useStoryblok.getHomePage();
        const HpLogosSlider = homeComponents.find((el) => el.component === 'LogosSlider');
        const brandLogo = HpLogosSlider.logos.find((el) => el.link.includes(brandName));

        return {
            name: brandName,
            logo: brandLogo?.image?.filename,
            description: brandLogo?.image?.name,
        };
    },
});
