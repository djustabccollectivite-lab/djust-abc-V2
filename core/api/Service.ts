import StrapiService from './StrapiService';
import SupplierService from './SupplierService';
import OrderService from './OrderService';
import UserService from './UserService';
import WishlistService from './WishlistService';
import AuthService from '~/core/api/AuthService';
import ProductService from '~/core/api/ProductService';
import CartService from '~/core/api/CartService';
import CategorieService from '~/core/api/CategorieService';
import QuoteService from '~/core/api/QuoteService';
import OfferService from '~/core/api/OfferService';
import BrevoService from '~/core/api/BrevoService';
import PayService from '~/core/api/PayService';
import PdfGeneratorService from '~/core/api/PdfGeneratorService';

export default (axios: any) => ({
    auth: AuthService(axios),
    brevo: BrevoService(axios),
    pdfGenerator: PdfGeneratorService(axios),
    product: ProductService(axios),
    cart: CartService(axios),
    categorie: CategorieService(axios),
    quote: QuoteService(axios),
    strapi: StrapiService(axios),
    supplier: SupplierService(axios),
    order: OrderService(axios),
    user: UserService(axios),
    wishlist: WishlistService(axios),
    offer: OfferService(axios),
    pay: PayService(axios),
});
