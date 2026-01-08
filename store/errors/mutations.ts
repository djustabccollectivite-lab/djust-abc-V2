import state from './state';
import type { ErrorLine } from './interfaces';

type State = ReturnType<typeof state>;

const mutations = {
    setErrors(state: State, payload: { errors: { [key: string]: ErrorLine[] } }) {
        state.errors = payload.errors;
    },

    addNewError(state: State, payload: { error: ErrorLine; key: string }) {
        if (!state.errors[payload.key]) {
            state.errors[payload.key] = [];
        }
        state.errors[payload.key].push(payload.error);
    },
    addNewErrors(state: State, payload: { errors: ErrorLine[]; key: string }) {
        if (!state.errors[payload.key]) {
            state.errors[payload.key] = [];
        }
        state.errors[payload.key].push(...payload.errors);
    },
    removeError(state: State, payload: { error: ErrorLine; key: string }) {
        state.errors[payload.key] = state.errors[payload.key].filter((e) => e !== payload.error);
    },
    clearErrors(state: State, key: string) {
        state.errors[key] = [];
    },
};

export default mutations;
