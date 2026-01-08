import appGetters from './getters/app';
import cartGetters from './getters/cart';
import cartB2BGetters from './getters/cartB2B';
import categoryGetters from './getters/category';
import offerGetters from './getters/offer';
import statGetters from './getters/stat';
import orderGetters from './getters/order';
import productGetters from './getters/product';
import shopGetters from './getters/shop';
import thumbnailProductGetters from './getters/thumbnail';
import AProduct from './actions/product';
import AOffer from './actions/offer';
import AOrder from './actions/order';
import ACart from './actions/cart';
import ACartB2B from './actions/cartB2B';
import AThumbnails from './actions/thumbnails';
import AUser from './actions/user';
import AShop from './actions/shop';
import AApp from './actions/app';
import ACategories from './actions/categories';
import AQuote from './actions/quote';
import APayement from './actions/payement';
import APay from './actions/pay';
import AWishlist from './actions/wishlist';
import ASupplier from './actions/supplier';
import quoteGetters from './getters/quote';
import Service from './api/Service';
import wishlistGetters from './getters/wishlist';
import request from './helpers/request';
import productVariantGetters from './getters/productVariant';
import addressGetters from './getters/address';
import storyblok from './actions/storyblok';
import organisationGet from './getters/organisation';
import tools from './helpers/tools';
import ABrevo from './actions/brevo';
import APdfGenerator from './actions/pdfGenerator';

export default (context: any) => ({
    getProduct: productGetters,
    getOffer: offerGetters,
    getOrder: orderGetters,
    getCart: cartGetters,
    getCartB2B: cartB2BGetters,
    getThumbnails: thumbnailProductGetters,
    getShop: shopGetters,
    getCategories: categoryGetters,
    getApp: appGetters,
    getQuote: quoteGetters,
    getWishlist: wishlistGetters,
    getProductVariant: productVariantGetters,
    getStat: statGetters,
    useProduct: AProduct(context),
    useOffer: AOffer(context),
    useOrder: AOrder(context),
    useCart: ACart(context),
    usePay: APay(context),
    useCartB2B: ACartB2B(context),
    useThumbnails: AThumbnails(context),
    useUser: AUser(context),
    useShop: AShop(context),
    useApp: AApp(context),
    useCategories: ACategories(context),
    useQuote: AQuote(context),
    useWishlist: AWishlist(context),
    useSupplier: ASupplier(context),
    usePayement: APayement(context),
    useApi: Service(context.$axios),
    useStoryblok: storyblok(context),
    useBrevo: ABrevo(context),
    usePdfGenerator: APdfGenerator(context),
    createRequest: request,
    useHelper: tools,
    getAddress: addressGetters,
    organisationGet,
});
