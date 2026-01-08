import { TokenableScheme } from '@nuxtjs/auth-next';
import { Context } from '@nuxt/types';
import Service from '../api/Service';
import * as BuyingListRequest from '../interfaces/BuyingList/IRequestBuyingList';
import { BuyingList } from '../interfaces/IWishlist';

export default (context: Context) => ({
    IsActive(): boolean {
        return context.$config.buyingListIsActive;
    },

    /**
     * @param {string} jwt
     */
    async getBuyingList(jwt: string | boolean) {
        const language = { locale: context.i18n.localeProperties.code.toUpperCase() };
        context.store.commit('wishlist/setIsLoading', true);

        await Service(context.$axios)
            .wishlist.APIgetBuyingList(jwt, language)
            .then((response) => {
                if (response.data[0]) {
                    context.store.commit('wishlist/clearWishlist');
                    response.data.forEach((item: BuyingList) => {
                        context.store.commit('wishlist/setWishlist', item);
                    });
                } else {
                    context.store.commit('wishlist/clearWishlist');
                }
                context.store.commit('wishlist/setIsLoading', false);
            })
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.error(error);
            });
    },

    /**
     * @param {string} jwt
     * @param {number} page
     * @param {number} size
     * @param {string} sort
     */
    async getBuyingListPaginate(jwt: string | boolean, page: number = 0, size: number = 10, sort: string = '') {
        const language = { locale: context.i18n.localeProperties.code.toUpperCase() };

        return await Service(context.$axios).wishlist.APIgetBuyingListPaginate(jwt, language, page, size, sort);
    },

    /**
     * @param {string} jwt
     * @param {number} page
     * @param {number} size
     */
    async getAllBuyingList(jwt: string | boolean, page: number = 0, size: number = 10) {
        context.store.commit('wishlist/setIsLoading', true);
        let allBuyingList = [];

        let firstResponse;

        try {
            firstResponse = await this.getBuyingListPaginate(jwt, page, size);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }

        if (firstResponse?.data?.content && !firstResponse?.data.content.length) {
            context.store.commit('wishlist/clearWishlist');
            context.store.commit('wishlist/setIsLoading', false);
            return;
        }

        allBuyingList.push(...(firstResponse.data.content as never[]));

        const promises: Array<Promise<any>> = [];

        if (firstResponse.data.totalElements > size) {
            const totalPages = Math.ceil(firstResponse.data.totalElements / size);

            for (let i = page + 1; i < totalPages; i++) {
                promises.push(
                    this.getBuyingListPaginate(jwt, i, size)
                        .then((response) => {
                            allBuyingList.push(...(response.data.content as never[]));
                        })
                        .catch((error) => {
                            // eslint-disable-next-line no-console
                            console.error(error);
                        }),
                );
            }

            await Promise.all(promises);

            allBuyingList = allBuyingList.sort((a: any, b: any) => {
                if (a && a.createdAt && b && b.createdAt) {
                    return a.createdAt < b.createdAt ? 1 : -1;
                }

                return 0;
            });
        }

        context.store.commit('wishlist/clearWishlist');

        context.store.commit('wishlist/setAllWishlist', allBuyingList);

        context.store.commit('wishlist/setIsLoading', false);
    },

    /**
     * @param {BuyingListRequest.CreateBuyingList} buyingListInfo
     */
    async createBuyinglist(buyingListInfo: BuyingListRequest.CreateBuyingList) {
        const language = { locale: context.i18n.localeProperties.code.toUpperCase() };
        try {
            const response = await Service(context.$axios).wishlist.APIcreateBuyingList(
                buyingListInfo.name,
                (context.$auth.strategy as TokenableScheme).token.get(),
                language,
            );
            context.store.commit('wishlist/setWishlist', response.data);
            if (buyingListInfo.add) {
                await context.$core.useWishlist.addItemToWishlist({
                    buyingListtId: response.data.id,
                    data: buyingListInfo.productToAdd,
                });
            }
            return response.data.id;
        } catch (error: any) {
            throw new Error(error.response.data.errors[0].message);
        }
    },

    /**
     * @param {BuyingListRequest.CreateBuyingList} buyingListInfo
     */
    async updateBuyinglist(buyingListInfo: BuyingListRequest.UpdateBuyingList) {
        const language = { locale: context.i18n.localeProperties.code.toUpperCase() };
        try {
            const response = await Service(context.$axios).wishlist.APIupdateBuyingList(
                buyingListInfo.id,
                buyingListInfo.name,
                (context.$auth.strategy as TokenableScheme).token.get(),
                language,
            );
            context.store.commit('wishlist/setWishlist', response.data);

            if (context.$config.themeName?.toLowerCase() === 'veja') {
                // Paginate buying lists
                context.$core.useWishlist.getAllBuyingList((context.$auth.strategy as TokenableScheme).token.get());
            } else {
                context.$core.useWishlist.getBuyingList((context.$auth.strategy as TokenableScheme).token.get());
            }

            return response.data;
        } catch (error: any) {
            throw new Error(error.response.data.errors[0].message);
        }
    },
    /**
     * @param {BuyingListRequest.BuyingListItemRequest} productToAdd
     */
    async addItemToWishlist(productToAdd: BuyingListRequest.BuyingListItemRequest) {
        const language = { locale: context.i18n.localeProperties.code.toUpperCase() };
        try {
            const response = await Service(context.$axios).wishlist.APIputBuyingList(
                productToAdd,
                (context.$auth.strategy as TokenableScheme).token.get(),
                language,
            );
            context.store.commit('wishlist/setProductToWishlist', false);
            if (response.data) {
                if (context.$config.themeName?.toLowerCase() === 'veja') {
                    // Paginate buying lists
                    context.$core.useWishlist.getAllBuyingList((context.$auth.strategy as TokenableScheme).token.get());
                } else {
                    context.$core.useWishlist.getBuyingList((context.$auth.strategy as TokenableScheme).token.get());
                }
            }
            return response;
        } catch (error: any) {
            throw new Error(error.response.data.errors[0].message);
        }
    },

    /**
     * @param {BuyingListRequest.DeleteBuyingListItem} productToRemove
     */
    async deleteItemToWishlist(productToRemove: BuyingListRequest.DeleteBuyingListItem) {
        await Service(context.$axios)
            .wishlist.APIdeleteBuyingListItems(productToRemove, (context.$auth.strategy as TokenableScheme).token.get())
            .then(() => {
                context.store.commit('wishlist/setProductToWishlist', false);

                if (context.$config.themeName?.toLowerCase() === 'veja') {
                    // Paginate buying lists
                    context.$core.useWishlist.getAllBuyingList((context.$auth.strategy as TokenableScheme).token.get());
                } else {
                    context.$core.useWishlist.getBuyingList((context.$auth.strategy as TokenableScheme).token.get());
                }
            })
            .catch((error: any) => {
                // eslint-disable-next-line no-console
                console.error(error);
            });
    },
    /**
     * @param {string} buyingListId
     */
    async deleteBuyingList(buyingListId: string) {
        await Service(context.$axios)
            .wishlist.APIdeleteBuyingList(buyingListId, (context.$auth.strategy as TokenableScheme).token.get())
            .then(() => {
                if (context.$config.themeName?.toLowerCase() === 'veja') {
                    // Paginate buying lists
                    context.$core.useWishlist.getAllBuyingList((context.$auth.strategy as TokenableScheme).token.get());
                } else {
                    context.$core.useWishlist.getBuyingList((context.$auth.strategy as TokenableScheme).token.get());
                }
            })
            .catch((error: any) => {
                // eslint-disable-next-line no-console
                console.error('Failed to remove buyinglist -> ', error);
            });
    },
    /**
     *
     */
    async changeOwnerBuyingList(buyinglistId: string, newOwner: string) {
        const newOwnerEmail = { newOwnerEmail: newOwner };
        try {
            await Service(context.$axios).wishlist.APIchangeOwnerBuyingList(
                newOwnerEmail,
                buyinglistId,
                (context.$auth.strategy as TokenableScheme).token.get(),
            );
            return true;
        } catch (error: any) {
            if (error.response?.data?.errors[0]?.message) {
                throw error.response.data.errors[0].message;
            } else {
                // eslint-disable-next-line no-throw-literal
                throw false;
            }
        }
    },
});
