import type { Context } from '@nuxt/types';

enum Filters {
    category = 'categoryIds',
    brand = 'brand',
    supplier = 'suppliers',
    attribute = 'attributes',
    sort = 'sort',
}

export default (context: Context) => ({
    addFilterValueToUrl(filter: Filters, value: string) {
        const { route, query } = context;
        const params = new URLSearchParams();
        Object.entries(query).forEach(([key, value]) => {
            if (typeof value === 'string') {
                params.append(key, value);
            }
            if (Array.isArray(value)) {
                value.forEach((v) => {
                    if (v) {
                        params.append(key, v);
                    }
                });
            }
        });
        params.append(filter, value);
        const newUrl = `${route.path}?${params.toString()}`;

        return newUrl;
    },
    removeFilterValueFromUrl(filter: Filters, value: string) {
        const { route, query } = context;
        const params = new URLSearchParams();
        Object.entries(query).forEach(([key, value]) => {
            if (typeof value === 'string') {
                params.append(key, value);
            }
            if (Array.isArray(value)) {
                value.forEach((v) => {
                    if (v) {
                        params.append(key, v);
                    }
                });
            }
        });
        const values = params.getAll(filter);
        params.delete(filter);

        values.forEach((v) => {
            if (v !== value) {
                params.append(filter, v);
            }
        });
        const newUrl = `${route.path}?${params.toString()}`;
        return newUrl;
    },
    toggleFilterValueInUrl(filter: Filters, value: string) {
        const { route, query } = context;
        const params = new URLSearchParams();
        Object.entries(query).forEach(([key, value]) => {
            if (typeof value === 'string') {
                params.append(key, value);
            }
            if (Array.isArray(value)) {
                value.forEach((v) => {
                    if (v) {
                        params.append(key, v);
                    }
                });
            }
        });
        params.delete(filter);
        params.append(filter, value);

        const newUrl = `${route.path}?${params.toString()}`;
        return newUrl;
    },
    removeAllFiltersFromUrl() {
        const { route, query } = context;
        // remove all Filters (enum) from query
        const params = new URLSearchParams();
        Object.entries(query).forEach(([key, value]) => {
            if (typeof value === 'string') {
                params.append(key, value);
            }
            if (Array.isArray(value)) {
                value.forEach((v) => {
                    if (v) {
                        params.append(key, v);
                    }
                });
            }
        });
        Object.values(Filters).forEach((filter) => {
            params.delete(filter);
        });

        const newUrl = `${route.path}?${params.toString()}`;
        return newUrl;
    },
});
