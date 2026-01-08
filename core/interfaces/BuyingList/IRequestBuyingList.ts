//POST
export interface CreateBuyingListRequest {
    name: string;
}
export interface ChangeOwnerRequest {
    newOwnerEmail: string;
}

//PUT
export interface PutBuyingListItemRequest {
    offerPriceId: string;
    quantity: number;
}
export interface PutBuyingListRequest {
    name: string;
}

//Param

export interface BuyingListItemRequest {
    buyingListtId: string;
    data: PutBuyingListItemRequest[];
}

export interface DeleteBuyingListItem {
    buyingListId: string;
    data: string[];
}

export interface CreateBuyingList {
    name: string;
    add: boolean;
    productToAdd: PutBuyingListItemRequest[];
}
export interface UpdateBuyingList {
    name: string;
    id: string;
}
export interface TransferWishList {
    newOwnerEmail: string;
}
