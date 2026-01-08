import core from '~/core/core';
import type { Plugin } from '@nuxt/types';

declare module '@nuxt/types' {
  interface Context {
    $core: ReturnType<typeof core>
  }
}

const plugin: Plugin = (context, inject) => {
  inject('core', core(context));
};

export default plugin;
