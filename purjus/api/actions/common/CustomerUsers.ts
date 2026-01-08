import type { Context } from '@nuxt/types';
import type { AxiosInstance } from 'axios';
import type { RefreshableScheme } from '@nuxtjs/auth-next';
import type { AuthenticatedUser, FoCustomerOrganisationDto, FoAddressDto } from '../../../interfaces/djustInterfaces';
import { ConnexionError } from '../../exeptions/ConnexionError';
import { ApiError } from '../../exeptions/ApiError';
import type { ErrorLine } from '~/store/errors/interfaces';

export default (context: Context) => ({
    async getCustomerAccount(): Promise<AuthenticatedUser> {
        const client: AxiosInstance = context.$purjus.djustClient;
        try {
            const response = await client.get<AuthenticatedUser>(`/v1/authenticated-user`, {
                headers: {
                    Authorization: (context.$auth.strategy as RefreshableScheme).token.get(),
                },
            });
            return response.data;
        } catch (error: any) {
            if (error.code === 'ECONNREFUSED') {
                throw new ConnexionError();
            }
            throw new ApiError();
        }
    },
    async getOrganisations(): Promise<FoCustomerOrganisationDto[]> {
        const client: AxiosInstance = context.$purjus.djustClient;
        const response = await client.get<FoCustomerOrganisationDto[]>('/v1/shop/customer-users/organisations', {
            headers: {
                Authorization: (context.$auth.strategy as RefreshableScheme).token.get(),
            },
        });
        return response.data;
    },
    async updateUserStatus(params: { id: string; status: string }[]): Promise<void> {
        try {
            const client: AxiosInstance = context.$purjus.djustClient;
            await client.patch(`franprix/v1/customer-users`, params, {
                headers: {
                    Authorization: (context.$auth.strategy as RefreshableScheme).token.get(),
                },
            });
        } catch (error: any) {
            if (error.code === 'ECONNREFUSED') {
                throw new ConnexionError();
            }
            throw new ApiError();
        }
    },
    async getErrorsFromCustomerAccountCustomField(_customerUserId: string): Promise<string | null> {
        const account = await this.getCustomerAccount();
        const customFields = account.user.customFieldValues;
        const errors: string | null | undefined = customFields.find(
            (customField) => customField.customField.externalId === 'erreurs',
        )?.value;
        return errors ?? null;
    },
    async setErrorsFromCustomerAccountCustomField(
        customerUserId: string,
        errors: { [key: string]: ErrorLine[] },
    ): Promise<void> {
        try {
            const currentCustomerAccount = await this.getCustomerAccount();

            const errorCustomFieldId = currentCustomerAccount.user.customFieldValues.find(
                (customField) => customField.customField.externalId === 'erreurs',
            )?.customField?.id;

            // on construit un body en mode "DTO" parce que on veut pas avoir d'erreur CO0005
            const body = {
                accountIds: currentCustomerAccount.accounts.map((account) => account.id),
                civility: currentCustomerAccount.user.civility,
                firstName: currentCustomerAccount.user.firstName,
                groups: currentCustomerAccount.user.groups,
                lastName: currentCustomerAccount.user.lastName,
                phone: currentCustomerAccount.user.phone,
                status: currentCustomerAccount.user.status,
                customFieldValues: [
                    {
                        customFieldId: errorCustomFieldId,
                        customFieldValue: JSON.stringify(errors),
                    },
                ],
            };
            const client: AxiosInstance = context.$purjus.djustClient;

            await client.put(`/v1/customer-users/${customerUserId}`, body, {
                headers: {
                    Authorization: (context.$auth.strategy as RefreshableScheme).token.get(),
                },
            });
        } catch (error: any) {
            if (error.code === 'ECONNREFUSED') {
                throw new ConnexionError();
            }
            throw new ApiError();
        }
    },
    async getCustomerUserAddresses(params: {
        shipping: boolean;
        billing: boolean;
        account: boolean;
        organisationIds: string[];
    }): Promise<FoAddressDto[]> {
        const client: AxiosInstance = context.$purjus.djustClient;
        const response = await client.get<FoAddressDto[]>('/v1/shop/customer-users/addresses', {
            headers: {
                Authorization: (context.$auth.strategy as RefreshableScheme).token.get(),
            },
            params,
        });
        return response.data;
    },
});
