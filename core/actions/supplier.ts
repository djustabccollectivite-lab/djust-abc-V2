import Service from '../api/Service';

export default (context: any) => ({
    /**
     * @param {number|null} size
     * @param {number} page
     */
    getSuppliers(
        size: number,
        page?: number,
        params?: {
            supplierStatus: string;
            supplierIds: Array<string>;
            idType: string;
        },
    ) {
        const result = Service(context.$axios)
            .supplier.APIgetSuppliers(
                {
                    supplierStatus: params?.supplierStatus ?? '',
                    supplierIds: params?.supplierIds ?? [],
                    idType: params?.idType ?? '',
                },
                size,
                page,
            )
            .then((response) => {
                if (response.status === 200) {
                    context.store.commit(
                        'suppliers/setSuppliers',
                        response.data
                            ?.filter((supplier) => supplier?.supplierStatus === 'ACTIVE')
                            ?.sort((a, b) => a.name.localeCompare(b.name)),
                    );
                }
                return response.data;
            })
            .catch(() => {});

        return result;
    },

    // TODO: This is not possible for the moment because the API does not return pageable data
    // async getAllSuppliers(size: number = 100) {
    //     const { data: suppliersResp } = await Service(context.$axios).supplier.APIgetSuppliers(
    //         {
    //             supplierStatus: '',
    //             supplierIds: [],
    //             idType: '',
    //         },
    //         size,
    //         0,
    //     );

    //     if (suppliersResp.length === 0) return [];

    //     const { totalElements, content } = suppliersResp;

    //     let suppliersArray: any[] = content;

    //     if (size < totalElements) {
    //         const iteration = Math.floor(totalElements / size);

    //         const promises: Array<Promise<any>> = [];

    //         for (let index = 1; index < iteration + 1; index++) {
    //             const promise: Promise<any> = new Promise((resolve) => {
    //                 Service(context.$axios)
    //                     .supplier.APIgetSuppliers(
    //                         {
    //                             supplierStatus: '',
    //                             supplierIds: [],
    //                             idType: '',
    //                         },
    //                         size,
    //                         index,
    //                     )
    //                     .then((result) => resolve(result.data));
    //             });

    //             promises.push(promise);
    //         }

    //         for (const suppliers of await Promise.all(promises)) {
    //             suppliersArray = suppliersArray.concat(suppliers);
    //         }
    //     }

    //     context.store.commit('suppliers/setSuppliers', suppliersArray);

    //     return suppliersArray;
    // },

    /**
     * @param {string} SupplierDetailId
     */
    getSupplierDetail(SupplierDetailId?: string, idType: string = 'DJUST_ID') {
        const result = Service(context.$axios)
            .supplier.APIgetSupplierDetail(SupplierDetailId, idType)
            .then((response) => {
                if (Array.isArray(response.data)) {
                    context.store.commit('shop/setSuppliers', response.data);
                } else {
                    context.store.commit('shop/setSuppliers', [response.data]);
                }
                return response.data;
            })
            .catch(() => {});
        return result;
    },
    /**
     * @param {string} supplierId
     */
    getSupplierById(supplierId: string, idType?: string) {
        const result = Service(context.$axios)
            .supplier.APIgetSupplierById(supplierId, idType)
            .then((response) => {
                context.store.commit('suppliers/setCurrentSupplier', response.data);
                return response.data;
            })
            .catch(() => {});
        return result;
    },
    /**
     * @param {string} SupplierDetailId
     */

    getSupplierEvaluationDetail(SupplierDetailId: string) {
        const result = Service(context.$axios)
            .supplier.APIgetSupplierEvaluation(SupplierDetailId)
            .then((response) => {
                return response.data;
            })
            .catch(() => {});
        return result;
    },

    defineCurrentSupplier(data: string) {
        context.$cookies.set('currentSupplierId', data, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
        });
        context.$axios.setHeader('supplier-id', data);
        context.store.commit('suppliers/setCurrentSupplier', data);
    },
});
