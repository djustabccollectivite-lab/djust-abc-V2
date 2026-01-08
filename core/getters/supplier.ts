import supplier from '../actions/supplier';
import { Supplier, suppliersStatus, externalSource } from '../interfaces/ISupplier';
import { SupplierGetters } from './types';

export const getId = (supplier: Supplier): string => supplier.id;
export const getName = (supplier: Supplier): string => supplier.name;
export const getExternalId = (supplier: Supplier): string => supplier.externalId;
export const getSupplierStatus = (supplier: Supplier): suppliersStatus => supplier.supplierStatus;
export const getTotalOffers = (supplier: Supplier): number => supplier.totalOffers;
export const getTotalOrders = (supplier: Supplier): number => supplier.totalOrders;
export const getTotalSales = (supplier: Supplier): number => supplier.totalSales;
export const getSupplierRating = (supplier: Supplier): string | null => supplier.supplierRating;
export const getDescription = (supplier: Supplier): string | null => supplier.description;
export const getimage1 = (supplier: Supplier): string | null => supplier.image1;
export const getimage2 = (supplier: Supplier): string | null => supplier.image2;
export const getimage3 = (supplier: Supplier): string | null => supplier.image3;
export const getLogo = (supplier: Supplier): string | null => supplier.logo;
export const getIsDefault = (supplier: Supplier): boolean => supplier.isDefault;
export const getEvaluationCount = (supplier: Supplier): number => supplier.evaluationCount;
export const getExternalSource = (supplier: Supplier): externalSource => supplier.externalSource;

const supplierGetters: SupplierGetters = {
    getId: getId,
    getName: getName,
    getExternalId: getExternalId,
    getSupplierStatus: getSupplierStatus,
    getTotalOffers: getTotalOffers,
    getTotalOrders: getTotalOrders,
    getTotalSales: getTotalSales,
    getSupplierRating: getSupplierRating,
    getDescription: getDescription,
    getimage1: getimage1,
    getimage2: getimage2,
    getimage3: getimage3,
    getLogo: getLogo,
    getIsDefault: getIsDefault,
    getEvaluationCount: getEvaluationCount,
    getExternalSource: getExternalSource,
};

export default supplierGetters;
