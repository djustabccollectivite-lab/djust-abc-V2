export interface NavigationCategory {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    description: string;
    active: boolean;
    productCount: number;
    categoryOrder: number;
    childrenCategories: NavigationCategory[];
}
