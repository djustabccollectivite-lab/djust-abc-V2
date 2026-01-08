import type { Context } from '@nuxt/types';
import { RefreshScheme } from '@nuxtjs/auth-next';
import type { BuyingList } from '../interfaces/djustInterfaces';
import { ValueError } from '../api/exeptions/Common';
import Service from '~/core/api/Service';

export default (context: Context) => ({
    getBuyingLists(accountId = context.store.state.app.account as string | undefined): BuyingList[] {
        if (!accountId) {
            throw new ValueError('No account id provided');
        }
        const filteredBuyingLists: BuyingList[] = context.store.state.wishlist.items.filter((buyingList: BuyingList) =>
            buyingList.name.includes(accountId),
        );
        const updatedBuyingLists: BuyingList[] = filteredBuyingLists.map((buyingList: BuyingList) => {
            const updatedBuyingList: BuyingList = { ...buyingList };
            updatedBuyingList.name = updatedBuyingList.name.replace(`__${accountId}`, '');
            return updatedBuyingList;
        });
        return updatedBuyingLists;
    },
    async createBuyingList(
        name: string,
        accountId = context.store.state.app.account as string | undefined,
    ): Promise<BuyingList> {
        if (!accountId) {
            throw new ValueError('No account id provided');
        }
        const buyingListName = `${name}__${accountId}`;

        const language = { locale: context.i18n.localeProperties.code.toUpperCase() };

        const buyingList = await Service(context.$axios).wishlist.APIcreateBuyingList(
            buyingListName,
            (context.$auth.strategy as RefreshScheme).token.get(),
            language,
        );
        context.store.commit('wishlist/setWishlist', buyingList.data);
        return this.getBuyingLists(accountId).find((buyingList: BuyingList) => buyingList.name === name) as BuyingList;
    },
});
