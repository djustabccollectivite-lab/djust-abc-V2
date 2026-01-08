import { BuyingListItem } from "../IWishlist";

export interface BuyingListResponse {
  buyingListItems: BuyingListItem[];
  customerUserId: string;
  id: string;
  name: string;
  createdAt: Date;
}