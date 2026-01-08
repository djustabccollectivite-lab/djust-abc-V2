import { Inject, Context } from '@nuxt/types/app';
import bigDecimal from 'js-big-decimal';

export default (context: Context, inject: Inject) => {
  inject('bigDecimal', bigDecimal)
};
