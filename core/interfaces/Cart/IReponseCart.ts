import { CartLine } from "../ICart";

export interface CartLineResponse {
  billingAddressId: string;
  customerUserId: string;
  focCartLineDtos: CartLine[];
  id: string;
  technicalId: string;
}

export interface FastCartResponse {
  cartId: string;
  cartImportId: string;
  errorsFilePath: string;
  sourceFilePath: string;
  status: string;
  totalLines: number;
  totalLinesInError: number;
  totalLinesProcessed: number;
}