import Service from '../api/Service';
import tools from '../helpers/tools';
export default (context: any) => ({
    async getUserBillingAddressList() {
        const X = await Service(context.$axios)
            .user.getUSerAddress('billing', context.$auth.strategy.token.get())
            .then((response: any) => {
                context.store.commit('user/setAddressBillingList', response.data);
                return response.data;
            })
            .catch((error: any) => {
                throw new Error('pb avec la récupération des adresses: ' + error.message);
            });
        return X;
    },
    async getUserShippingAddressList(jwt?: string) {
        const X = await Service(context.$axios)
            .user.getUSerAddress('shipping', jwt ?? context.$auth.strategy.token.get())
            .then((response: any) => {
                context.store.commit('user/setAddressShippingList', response.data);
                return response.data;
            })
            .catch((error: any) => {
                throw new Error('pb avec la récupération des adresses: ' + error.message);
            });
        return X;
    },
    // Creation Compte User
    async createAccount(data: any) {
        const X = await Service(context.$axios)
            .auth.APIcreateAccount(data)
            .then((_response: any) => {})
            .catch((error: any) => {
                throw new Error("Erreur avec l'API de création de compte: " + error.message);
            });
        return X;
    },

    // ValidationCompte
    async validationAccount(token: any) {
        const X = await Service(context.$axios)
            .user.APIValidationAccount(token)
            .then((_response: any) => {
                return true;
            })
            .catch(() => {
                return false;
            });
        return X;
    },

    // Creation d'un CustomerAccount
    async createCustomerAccount(data: any) {
        const res = { status: '', message: '' };
        const X = await Service(context.$axios)
            .user.APICreateCustomerAccount(data)
            .then((_response: any) => {
                res.status = 'success';
                res.message = context.app.i18n.t('register.messages.CustomerCreate');
                return res;
            })
            .catch((error: any) => {
                res.status = 'fail';
                res.message = context.app.i18n.t('register.messages.ProblemCreateCustomer');
                switch (error.response.data.errors[0].code) {
                    case 'CA0004':
                        res.message = context.app.i18n.t('register.messages.CustomerAlreadyExist');
                        return res;
                    case 'CU0002':
                        res.message = context.app.i18n.t('register.messages.CustomerUserAlreadyExist');
                        return res;
                    default:
                        return res;
                }
            });
        return X;
    },

    // Create Address
    createAddress(data: any) {
        const jwt = context.$auth.strategy.token.get();

        return Service(context.$axios)
            .user.APICreateAddress(data, jwt)
            .catch((error: any) => {
                throw new Error("Erreur avec l'API de création d'adresse: " + error.message);
            });
    },

    async editAddress(data: any, addressId: any) {
        const jwt = context.$auth.strategy.token.get();
        const X = await Service(context.$axios)
            .user.APIEditAddress(addressId, data, jwt)
            .then((response: any) => {
                return response.data;
            })
            .catch((error: any) => {
                throw new Error("Erreur avec l'API de modification d'adresse: " + error.message);
            });
        return X;
    },
    async deleteAddress(addressId: any) {
        const jwt = context.$auth.strategy.token.get();
        const X = await Service(context.$axios)
            .user.APIDeleteAddress(addressId, jwt)
            .then((_response: any) => {
                return true;
            })
            .catch(() => {
                return false;
            });
        return X;
    },

    async getUserauthenticated(_jwt: any) {
        const jwt = context.$auth.strategy.token.get();

        try {
            const res = await Service(context.$axios).auth.APIGetUserAuthenticatedWithStore(
                jwt,
                context.$config.storeId,
                context.$config.storeIdViewId,
            );
            return res.data.user;
        } catch (err: any) {
            if (err.response && err.response.status === 403) {
                try {
                    const res = await Service(context.$axios).auth.APIGetUserAuthenticatedWithStore(
                        jwt,
                        context.$config.storeIdCallback,
                        context.$config.storeIdViewIdCallback,
                    );

                    return res.data.user;
                } catch (innerErr: any) {
                    return null;
                }
            } else {
                return null;
            }
        }
    },

    async getUserAccountauthenticated(_jwt: any) {
        const jwt = context.$auth.strategy.token.get();
        const user = await Service(context.$axios)
            .auth.APIGetUserAuthenticated(jwt)
            .then((res: any) => {
                return res.data.accounts;
            })
            .catch((err: any) => {
                throw new Error("Erreur avec l'API de getUserauthenticated: " + err.message);
            });
        return user;
    },

    async getUserDataAuthenticatedOld(_jwt?: any) {
        const jwt = context.$auth.strategy.token.get();
        const user = await Service(context.$axios)
            .auth.APIGetUserAuthenticated(jwt)
            .then((res: any) => {
                return res.data;
            })
            .catch((err: any) => {
                throw new Error("Erreur avec l'API de getUserauthenticated: " + err.message);
            });
        return user;
    },

    async getUserDataAuthenticated(_jwt?: any) {
        const jwt = _jwt ?? context.$auth.strategy.token.get();

        try {
            const res = await Service(context.$axios).auth.APIGetUserAuthenticatedWithStore(
                jwt,
                context.$config.storeId,
                context.$config.storeIdViewId,
            );
            return res.data;
        } catch (err: any) {
            if (err.response && err.response.status === 403) {
                try {
                    const res = await Service(context.$axios).auth.APIGetUserAuthenticatedWithStore(
                        jwt,
                        context.$config.storeIdCallback,
                        context.$config.storeIdViewIdCallback,
                    );

                    return res.data;
                } catch (innerErr: any) {
                    return null;
                }
            } else {
                return null;
            }
        }
    },

    async login(body: any, params: any) {
        const result = await context.$auth
            .loginWith('local', {
                params,
                data: body,
            })
            .then(async (response: any) => {
                const jwtt = tools.reduceJwtSize(response.data.token.accessToken);
                const customer = await this.getUserDataAuthenticated(jwtt);
                await this.getCustomerAccountById(customer.account.id);

                this.defineAccount(customer.account.id);

                context.$auth.setUser(customer.user);

                context.$auth.$storage.setUniversal('user', customer.user, true);

                context.$config.use_new_cart
                    ? await context.$core.useCartB2B.getAllCarts_B2B(['INIT', 'LOADING', 'ON_GOING'], ['CART'])
                    : await context.$core.useCart.getCartDetail(context.$auth.strategy.token.get());

                context.$core.useUser.getUserShippingAddressList();

                if (context.$config.themeName?.toLowerCase() === 'veja') {
                    // Paginate buying lists
                    context.$core.useWishlist.getAllBuyingList(jwtt);
                } else {
                    context.$core.useWishlist.getBuyingList(jwtt);
                }

                context.$core.useQuote.getAllMasterQuotes(jwtt);

                return true;
            })
            .catch((e: any) => {
                return e.response.data.message;
            });
        return result;
    },

    async loginWithToken(token: string): Promise<boolean> {
        try {
            context.$config.use_new_cart
                ? await context.$core.useCartB2B.getAllCarts_B2B(
                      ['INIT', 'LOADING', 'ON_GOING'],
                      ['CART'],
                      true,
                      20,
                      token,
                  )
                : await context.$core.useCart.getCartDetail(token);
            await context.$core.useUser.getUserShippingAddressList(token);
            if (context.$config.themeName?.toLowerCase() === 'veja') {
                // Paginate buying lists
                await context.$core.useWishlist.getAllBuyingList(token);
            } else {
                await context.$core.useWishlist.getBuyingList(token);
            }
            await context.$core.useQuote.getAllMasterQuotes(token);

            const customer = await this.getUserDataAuthenticated(token);
            await context.$auth.setUserToken(token, token);
            await context.$auth.setUser(customer.user);

            if (context.$auth.strategy.token.status().expired()) {
                context.$auth.logout();
                return false;
            }

            context.$auth.$storage.setUniversal('user', customer.user, true);

            await this.getCustomerAccountById(customer.account.id);

            return true;
        } catch {
            return false;
        }
    },

    async forgotPassword(params: any) {
        const res = await Service(context.$axios)
            .auth.APIForgotPassword(params)
            .then((_res: any) => {
                return true;
            })
            .catch(() => {
                return false;
            });
        return res;
    },

    async forgotPasswordWithStores(params: any, storeId?: string, storeViewId?: string) {
        return await Service(context.$axios).auth.APIForgotPassword(params, storeId, storeViewId);
    },

    async resetPassword(params: any) {
        const res = await Service(context.$axios)
            .auth.APIResetPassword(params)
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            });
        return res;
    },

    async resetPasswordWithStores(params: any, storeId?: string, storeViewId?: string) {
        return await Service(context.$axios).auth.APIResetPassword(params, storeId, storeViewId);
    },

    async resendValidationRequestEmail(params: any) {
        const res = await Service(context.$axios)
            .user.APIResendValidationAccountRequest(params)
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            });
        return res;
    },

    async verifyToken(token: any) {
        const res = await Service(context.$axios)
            .auth.APIverifyToken(token)
            .then((response: any) => {
                return response.data;
            })
            .catch(() => {
                return false;
            });
        return res;
    },

    async modifyUserInformation(params: any) {
        const jwt = context.$auth.strategy.token.get();
        const res = await Service(context.$axios)
            .user.APIPutUser(params, jwt)
            .then(async (_res: any) => {
                const user = await this.getUserauthenticated(jwt);
                context.$auth.setUser(user);
                return true;
            })
            .catch(() => {
                return false;
            });
        return res;
    },

    async getCustomerAccount() {
        const jwt = context.$auth.strategy.token.get();

        const res = await Service(context.$axios)
            .user.APIGetCustomerAccount(jwt)
            .then((res: any) => {
                const customerAccountId = context.$cookies.set('customerAccountId');
                if (!customerAccountId) {
                    this.defineAccount(res.data.id);
                }
                return res.data;
            })
            .catch((err: any) => {
                throw new Error("Erreur avec l'api getCustomerAccount: " + err.message);
            });
        return res;
    },

    /**
     *
     * @param params
     */
    async getCustomerAccountOrders(params: any) {
        const jwt = context.$auth.strategy.token.get();
        const pageable = params?.pageable || {
            page: params?.page ?? 0,
            size: params?.size ?? 20,
            sort: params?.sort ?? [],
        };
        const locale = params?.locale || context.app.i18n.localeProperties.code.toUpperCase();
        const res = await Service(context.$axios)
            .user.APIGetCustomerAccountOrders(jwt, { ...params, pageable, locale })
            .then((res: any) => {
                return res.data;
            })
            .catch((err: any) => {
                throw new Error("Erreur avec l'api getCustomerAccountOrders: " + err.message);
            });
        return res;
    },
    /**
     *
     * @param params
     * @param customerAccountId
     */
    async getCustomerAccountOrdersByAccountId(params: any, customerAccountId: string) {
        const jwt = context.$auth.strategy.token.get();
        const pageable = params?.pageable || {
            page: params?.page ?? 0,
            size: params?.size ?? 20,
            sort: params?.sort ?? [],
        };
        const locale = params?.locale || context.app.i18n.localeProperties.code.toUpperCase();
        const res = await Service(context.$axios)
            .user.APIGetCustomerAccountOrdersByAccountId(jwt, { ...params, pageable, locale }, customerAccountId)
            .then((res: any) => {
                return res.data;
            })
            .catch((err: any) => {
                throw new Error("Erreur avec l'api getCustomerAccountOrders: " + err.message);
            });
        return res;
    },

    async getCustomerAccountById(customerAccountId: any, store: boolean = true) {
        const jwt = context.$auth.strategy.token.get();

        const res = await Service(context.$axios)
            .user.APIGetCustomerAccountById(jwt, customerAccountId)
            .then((res: any) => {
                if (store) {
                    context.store.commit('account/setCustomerAccount', res.data);
                }
                return res.data;
            })
            .catch((err: any) => {
                throw new Error("Erreur avec l'api getCustomerAccountById: " + err.message);
            });
        return res;
    },

    async getCustomerAccountByIdNoStore(customerAccountId: any) {
        const jwt = context.$auth.strategy.token.get();

        const res = await Service(context.$axios)
            .user.APIGetCustomerAccountById(jwt, customerAccountId)
            .then((res: any) => {
                return res.data;
            })
            .catch((err: any) => {
                throw new Error("Erreur avec l'api getCustomerAccountById: " + err.message);
            });
        return res;
    },

    async putCustomerInformation(request: any) {
        const jwt = context.$auth.strategy.token.get();
        const res = await Service(context.$axios)
            .user.APIPutCustomer(request, jwt)
            .then((res: any) => {
                context.store.commit('account/setCustomerAccount', res.data);

                return res;
            })
            .catch((err: any) => {
                throw new Error("Erreur avec l'api ApiPutCustomer: " + err.message);
            });
        return res;
    },

    async postCreateUserOrganisation(request: any) {
        const jwt = context.$auth.strategy.token.get();
        const res = await Service(context.$axios)
            .user.APICreateUserOrganisation(request, jwt)
            .then((_res: any) => {
                return true;
            })
            .catch(() => {
                return false;
            });
        return res;
    },

    async putUpdateUserInOrganisation(request: any, organisationID: any, customerUserID: any) {
        const jwt = context.$auth.strategy.token.get();
        const res = await Service(context.$axios)
            .user.APIPutCustomerUserOrganisation(request, organisationID, customerUserID, jwt)
            .then((_res: any) => {
                return true;
            })
            .catch(() => {
                return false;
            });
        return res;
    },

    async getUserFormAccount(params: any, _jwt: any, accountId?: string) {
        const jwt = context.$auth.strategy.token.get();
        const res = await Service(context.$axios)
            .user.APIGetUserInAccount(params, jwt, accountId)
            .then((res: any) => {
                return res.data.content;
            })
            .catch((err: any) => {
                throw new Error("Erreur avec l'api GetUserInAccount: " + err.message);
            });
        return res;
    },

    async getOrganisation(_jwt: any) {
        const jwt = context.$auth.strategy.token.get();
        const res = await Service(context.$axios)
            .user.APIGetOrga(jwt)
            .then((res: any) => {
                return res.data;
            })
            .catch((err: any) => {
                throw new Error("Erreur avec l'api GetUserInAccount: " + err.message);
            });
        return res;
    },

    async getUserInOrga(organisationId: string, _jwt: any, accountId?: string) {
        const jwt = context.$auth.strategy.token.get();
        const res = await Service(context.$axios)
            .user.APIGetUserInOrga(organisationId, jwt, accountId)
            .then((res: any) => {
                return res.data.content;
            })
            .catch((err: any) => {
                throw new Error("Erreur dans l'api getUserInOrga: " + err.message);
            });
        return res;
    },

    async getOrdersInOrga(organisationId, params, jwt: any) {
        const res = await Service(context.$axios)
            .user.APIGetOrdersInOrga(organisationId, params, jwt)
            .then((res: any) => {
                return res.data;
            })
            .catch((err: any) => {
                throw new Error("Erreur dans l'api getOrdersInOrga: " + err.message);
            });
        return res;
    },

    async postOrganisation(request: any) {
        const jwt = context.$auth.strategy.token.get();
        const res = await Service(context.$axios)
            .user.APIPostOrganisation(request, jwt)
            .then((res: any) => {
                return res;
            })
            .catch((err: any) => {
                throw new Error("Erreur dans l'api postOrganisation: " + err.message);
            });
        return res;
    },

    async putOrganisationName(organisationId: any, request: any) {
        const jwt = context.$auth.strategy.token.get();
        const res = await Service(context.$axios)
            .user.APIPutOrgaName(organisationId, request, jwt)
            .then((res: any) => {
                return res;
            })
            .catch((err: any) => {
                throw new Error("Erreur dans l'api putOrganisationName: " + err.message);
            });
        return res;
    },

    async getSettings() {
        const res = await Service(context.$axios)
            .user.APIGetSettings()
            .then((res: any) => {
                return res.data;
            })
            .catch((err: any) => {
                throw new Error("Erreur dans l'api getSettings: " + err.message);
            });
        return res;
    },

    defineAccount(data: any) {
        context.$cookies.set('customerAccountId', data, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
        });
        context.$axios.setHeader('customer-account-id', data);
        context.store.commit('app/setAccount', data);
    },

    defineOrganisation(data: any) {
        context.$cookies.set('organisationId', data, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
        });
        context.$axios.setHeader('organisation-id', data);
        context.store.commit('app/setOrganisation', data);
    },

    defineZipCode(data: any) {
        context.$cookies.set('customerZipCode', data.toString(), {
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
        });
        context.store.commit('app/setZipCode', data.toString());
    },

    setNewAccount(id: string) {
        context.store.commit('cart_b2b/resetCarts', id);
        context.$cookies.set('customerAccountId', id, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
        });
        context.$axios.setHeader('customer-account-id', id);
        context.store.commit('app/setAccount', id);
    },
    async getCFMediaUploadLink(
        cfId: string,
        value: {
            fileName: string;
            fileSize: number;
            customFieldIdType?: 'BUSINESS_ID' | 'EXTERNAL_ID';
            sealedTarget?:
                | 'OFFER'
                | 'ACCOUNT'
                | 'NAVIGATION_CATEGORY'
                | 'SUPPLIER'
                | 'CUSTOMER_USER'
                | 'CUSTOMER_ORGANISATION'
                | 'ORDER_LOGISTIC'
                | 'ORDER_LOGISTIC_LINE'
                | 'QUOTE'
                | 'QUOTE_LINE'
                | 'ORDER_INCIDENT';
        },
    ) {
        const jwt = context.$auth.strategy.token.get();
        try {
            const response = await Service(context.$axios).user.APIPostMediaCf(cfId, value, jwt);
            return response.data;
        } catch (error) {}
    },
    async getAccountCF() {
        try {
            const response = await Service(context.$axios).user.APIGetAccountCf();
            return response.data;
        } catch (error) {}
    },
    async getCustomFieldWithStatus(sealedTarget: string, status: string, type: string, size: number) {
        try {
            const response = await Service(context.$axios).user.APIGetCustomFields(sealedTarget, status, type, size);
            return response.data;
        } catch (error) {
            return error;
        }
    },
    async getOrganisationAddresses(organisationId: string) {
        try {
            const response = await Service(context.$axios).user.APIGetOrganisationAddresses(organisationId);
            context.store.commit('user/setOrganisationAddresses', response.data);
            return response.data;
        } catch (error) {
            return error;
        }
    },
    async getAccountAddresses() {
        try {
            const response = await Service(context.$axios).user.APIGetAccountAddresses();
            context.store.commit('user/setAccountAddresses', response.data);
            return response.data;
        } catch (error) {
            return error;
        }
    },
});
