import type { Plugin } from '@nuxt/types';
import purjus from '~/purjus/purjus';
declare module '@nuxt/types' {
    interface Context {
        $purjus: ReturnType<typeof purjus>;
    }
}

const plugin: Plugin = (context, inject) => {
    inject('purjus', purjus(context));
};

export default plugin;
