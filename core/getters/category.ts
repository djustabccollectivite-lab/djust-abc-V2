import { NavigationCategory } from '../interfaces/ICategory';
import { CategoryGetters } from './types';

function buildCategory(cat: any): any {
    let megaContentI: any[] = [];

    const categorie = {
        icon: 'icon-star',
        text: cat.name,
        position: cat.categoryOrder,
        url: '/list/' + cat.id,
        id: cat.id,
        externalId: cat.externalId,
        extraClass: cat.childrenCategories.length > 0 ? 'menu-item-has-children has-mega-menu' : null,
        subClass: cat.childrenCategories.length > 0 ? 'sub-menu' : null,
        mega: cat.childrenCategories.length > 0 ? true : false,
        categorieextraClass: '',
        megaContent: megaContentI,
        ...cat,
    };
    if (cat.childrenCategories.length > 0) {
        (categorie.categorieextraClass = 'menu-item-has-children has-mega-menu'),
            (categorie.subClass = 'sub-menu'),
            (categorie.megaContent = [
                {
                    megaItems: [],
                },
            ]);
        cat.childrenCategories.forEach((subcat: any) =>
            categorie.megaContent[0].megaItems.push(
                buildCategory(subcat)
            )
        );
        categorie.megaContent[0].megaItems = categorie.megaContent[0].megaItems.sort(function (
            a: { position: number },
            b: { position: number }
        ) {
            return a.position - b.position;
        });
    }
    return categorie;
}

function buildCategoryv2(cat: any): any {
    let megaContentI: any[] = [];

    const categorie = {
        icon: 'icon-star',
        text: cat.name,
        position: cat.categoryOrder,
        url: '/list/' + cat.externalId,
        id: cat.id,
        externalId: cat.externalId,
        extraClass: cat.childrenCategories.length > 0 ? 'menu-item-has-children has-mega-menu' : null,
        subClass: cat.childrenCategories.length > 0 ? 'sub-menu' : null,
        mega: cat.childrenCategories.length > 0 ? true : false,
        categorieextraClass: '',
        megaContent: megaContentI,
    };
    if (cat.childrenCategories.length > 0) {
        (categorie.categorieextraClass = 'menu-item-has-children has-mega-menu'),
            (categorie.subClass = 'sub-menu'),
            (categorie.megaContent = [
                {
                    megaItems: [],
                },
            ]);
        cat.childrenCategories.forEach((subcat: any) =>
            categorie.megaContent[0].megaItems.push(
                buildCategoryv2(subcat)
            )
        );
        categorie.megaContent[0].megaItems = categorie.megaContent[0].megaItems.sort(function (
            a: { position: number },
            b: { position: number },
        ) {
            return a.position - b.position;
        });
    }
    return categorie;
}

export const getMenuCategories = (categories: any): any => {
    let menuCategories: any[] = [];
    let megaContentI: any[] = [];
    if (categories.length > 0) {
        categories.forEach((cat: any) => {
            const categorie = buildCategory(cat);
            menuCategories.push(categorie);
            menuCategories = menuCategories.sort(function (a, b) {
                return a.position - b.position;
            });
        });
    } else {
        null;
    }
    return menuCategories;
};
export const getMenuCategoriesv2 = (categories: any): any => {
    let menuCategories: any[] = [];
    let megaContentI: any[] = [];
    if (categories.length > 0) {
        categories.forEach((cat: any) => {
            const categorie = buildCategoryv2(cat);
            menuCategories.push(categorie);
            menuCategories = menuCategories.sort(function (a, b) {
                return a.position - b.position;
            });
        });
    } else {
        null;
    }
    return menuCategories;
};
export const getNewCategoriesList = (categories: any, customField: any): any => {
    let result: any[] = [];
    categories.map((c) => {
        let data: any = {
            name: c.name,
            count: c.productCount,
            id: c.id,
        };

        if (c.customFieldValues.some((e) => e.name === customField)) {
            let res = c.customFieldValues.find((c) => c.name === customField);
            data[customField] = res.value;
        } else {
            data[customField] = null;
        }
        result.push(data);
    });
    return result;
};

const categoryGetters: CategoryGetters<NavigationCategory> = {
    getMenuCategories: getMenuCategories,
    getNewCategoriesList: getNewCategoriesList,
    getMenuCategoriesv2: getMenuCategoriesv2,
};

export default categoryGetters;
