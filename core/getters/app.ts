import tools from '../helpers/tools';
import { AppGetters } from './types';

export const getCurrency = (app: any): any => app.currency;

export const getFormatPrice = (price: number, currency: string): string => tools.formatCurrencyAuto(price, currency);

const appGetters: AppGetters = {
    getCurrency: getCurrency,
    getFormatPrice: getFormatPrice,
};

export default appGetters;
