import { slugify } from '~/purjus/helpers/common/urlHelper';

export function findCurrentCategoryExternalId(data, targetName) {
    for (const item of data) {
        if (slugify(item.name) === targetName) {
            return item.externalId;
        }
        if (item.childrenCategories && item.childrenCategories.length > 0) {
            const result = findCurrentCategoryExternalId(item.childrenCategories, targetName);
            if (result) {
                return result;
            }
        }
    }
    return null;
}
