import type { Context } from '@nuxt/types';
import { ActionContext } from 'vuex';
import type { ErrorLine } from '~/store/errors/interfaces';
import ErrorState from '~/store/errors/state';
import RootState from '~/store/app/state';

const actions = {
    async retrieveErrors(context: ActionContext<ReturnType<typeof ErrorState>, ReturnType<typeof RootState>>) {
        const appContext = this as unknown as Context;
        const errors = await appContext.$purjus.useCustomerUsers.getErrorsFromCustomerAccountCustomField(
            context.rootState.auth.user.id,
        );
        if (null === errors) {
            return;
        }
        context.commit('setErrors', { errors: JSON.parse(errors) });
    },

    async addNewError(
        context: ActionContext<ReturnType<typeof ErrorState>, ReturnType<typeof RootState>>,
        error: ErrorLine,
    ) {
        const appContext = this as unknown as Context;
        context.commit('addNewError', { error, key: context.rootState.app.account });
        await appContext.$purjus.useCustomerUsers.setErrorsFromCustomerAccountCustomField(
            context.rootState.auth.user.id,
            context.state.errors,
        );
    },

    async addNewErrors(
        context: ActionContext<ReturnType<typeof ErrorState>, ReturnType<typeof RootState>>,
        receivedErrors: ErrorLine[],
    ) {
        const appContext = this as unknown as Context;
        context.commit('addNewErrors', { errors: receivedErrors, key: context.rootState.app.account });
        await appContext.$purjus.useCustomerUsers.setErrorsFromCustomerAccountCustomField(
            context.rootState.auth.user.id,
            context.state.errors,
        );
        context.dispatch('retrieveErrors');
    },
    async removeError(
        context: ActionContext<ReturnType<typeof ErrorState>, ReturnType<typeof RootState>>,
        error: ErrorLine,
    ) {
        const appContext = this as unknown as Context;
        context.commit('removeError', { error, key: context.rootState.app.account });
        await appContext.$purjus.useCustomerUsers.setErrorsFromCustomerAccountCustomField(
            context.rootState.auth.user.id,
            context.state.errors,
        );
    },
    async clearErrors(context: ActionContext<ReturnType<typeof ErrorState>, ReturnType<typeof RootState>>) {
        const appContext = this as unknown as Context;
        context.commit('clearErrors', context.rootState.app.account);
        await appContext.$purjus.useCustomerUsers.setErrorsFromCustomerAccountCustomField(
            context.rootState.auth.user.id,
            context.state.errors,
        );
    },
};

export default actions;
