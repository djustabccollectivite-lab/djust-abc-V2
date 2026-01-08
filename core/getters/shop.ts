import { ProductThumbnail, Thumbnail } from '../interfaces/IThumbnail';
import { ShopGetters } from './types';
import { FacetValue, Aggregation } from '../interfaces/Product/IResponseProduct';
import tools from '../helpers/tools';

export const getTotalPages = (thumbnail: Thumbnail): number => thumbnail?.totalPages;

export const getTotalElements = (thumbnail: Thumbnail): number => thumbnail?.totalElements;

export const getProducts = (thumbnail: Thumbnail): ProductThumbnail[] => thumbnail?.content;

export const prioritizeFacets = (facets: FacetValue[], filters: string[]): FacetValue[] => {
    let filteredItems: FacetValue[] = [];
    if (facets && Array.isArray(filters)) {
        filters.forEach((filter) => {
            let matchingItems = facets.filter((facet) => filter === facet.values[0]);
            filteredItems = filteredItems.concat(matchingItems);
        });
    } else {
        let arrayFilters = Array.isArray(filters) ? filters : [filters];
        let matchingItems = facets.filter((facet) => arrayFilters.includes(facet.values[0]));
        filteredItems = filteredItems.concat(matchingItems);
    }
    return filteredItems;
};

export const filterList = (items: Aggregation[], search: string, filterValues: string[]): FacetValue[] => {
    let itemList = tools.sorted(items[0].buckets);

    if (search) {
        itemList = itemList.filter((item) => item.values[0].toUpperCase().includes(search));
    }

    if (filterValues && filterValues.length > 0) {
        let filteredItems = prioritizeFacets(itemList, filterValues);
        itemList = itemList.filter((item) => !filteredItems.includes(item));
        itemList = filteredItems.concat(itemList);
    }
    return itemList;
};
export const filterFacet = (items: any, search: string, filterValues: string[]): any => {
    let facetList = tools.sortedName(items);

    if (search) {
        facetList = facetList.filter((item) => item.name.toUpperCase().includes(search));
    }
    if (filterValues && filterValues.length > 0) {
        let filteredItems = prioritizeFacetsWithName(facetList, filterValues);
        facetList = facetList.filter((item) => !filteredItems.includes(item));
        facetList = filteredItems.concat(facetList);
    }
    return facetList;
};

const prioritizeFacetsWithName = (facets: FacetValue[], filters: string[]): FacetValue[] => {
    let filteredItems: FacetValue[] = [];
    if (facets && Array.isArray(filters)) {
        filters.forEach((filter) => {
            let matchingItems = facets.filter((facet) => filter === facet.name);
            filteredItems = filteredItems.concat(matchingItems);
        });
    } else {
        let arrayFilters = Array.isArray(filters) ? filters : [filters];
        let matchingItems = facets.filter((facet) => arrayFilters.includes(facet.name));
        filteredItems = filteredItems.concat(matchingItems);
    }
    return filteredItems;
};

const shopGetters: ShopGetters<Thumbnail> = {
    getTotalPages: getTotalPages,
    getTotalElements: getTotalElements,
    getProducts: getProducts,
    prioritizeFacets: prioritizeFacets,
    filterList: filterList,
    filterFacet: filterFacet,
};

export default shopGetters;
