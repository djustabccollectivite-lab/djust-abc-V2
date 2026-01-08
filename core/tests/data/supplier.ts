import { externalSource, Supplier, suppliersStatus } from '../../interfaces/ISupplier';

export const SupplierData: Supplier = {
    id: '5',
    name: 'Arnoshop',
    externalId: '2002',
    supplierStatus: suppliersStatus.ACTIVE,
    totalOffers: 0,
    totalOrders: 13,
    totalSales: 8,
    supplierRating: null,
    description: 'blabla',
    image1: 'png',
    image2: 'photo',
    image3: 'image',
    logo: 'Djust',
    isDefault: false,
    evaluationCount: 5,
    externalSource: externalSource.MIRAKL,
};
