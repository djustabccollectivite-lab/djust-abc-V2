import type { Context } from '@nuxt/types';
// import useSynchro from './api/actions/franprix/Synchronize';
import useSupplier from './api/actions/common/Suppliers';
import useOrders from './api/actions/common/Orders';
import useOrder from './api/actions/common/Order';
import useProducts from './api/actions/common/Products';
import useAccount from './api/actions/common/Account';
import useNavigationCategories from './api/actions/common/NavigationCategories';
import useProductThumbnail from './api/actions/common/ProductThumbnails';
import useCustomerUsers from './api/actions/common/CustomerUsers';
// import useSendMail from './api/actions/eiffage/SendMail';
import usePurjusClient from './client/purjusClient';
import useMailClient from './client/mailClient';
import useDjustClient from './client/djustClient';
import usePdfGenerator from './helpers/PdfGenerator';
import MiddlewareManager from './helpers/MiddlewareManager';
// import useMonoprixPurjusClient from './client/monoprixPurjusClient';
// import useProxyCartv2 from './api/actions/monoprix/ProxyCartv2';
import useCartv2 from './api/actions/common/Cartv2';
import useStoreSpecificBuyingList from './helpers/StoreSpecificBuyingList';
import useOffers from './api/actions/common/Offers';
// import useFranprixCartToOrder from './api/actions/franprix/CartToOrder';
// import useFranprixCartGenerator from './helpers/franprix/CartGenerator';
// import useEiffageFacetsHelper from './helpers/eiffage/facets';
// import useEiffageCaptchaHelper from './helpers/eiffage/captcha';
// import useEiffageEcoContributionHelper from './helpers/eiffage/ecoContribution';
import useEiffageOrderLinesHelper from './helpers/common/orderLines';
import useOfferHelper from './helpers/common/offer';
import useProductsHelper from './helpers/common/products';
import utils from './helpers/Utils';
import initiatorsInThemeContext from './helpers/common/initFunctions';
// import useEiffageCartv2 from './api/actions/eiffage/Cartv2';
// import socodaMembers from './helpers/socoda/members';
// import foodiaOfferHelper from './helpers/foodia/offer';
// import accountHelper from './helpers/yack/accountHelper';
import expirableLocalStorage from './helpers/common/expirableLocalStorage';
import brevoContactManager from './api/actions/common/brevoContactManager';
// import accountUpgradeMail from './api/actions/yack/accountUpgradeMail';
import searchV2 from './api/actions/common/Searchv2';
import productList from './modules/searchv2/ProductList';
import urlManager from './modules/searchv2/UrlManager';
import featuresHelper from './helpers/common/features';
import useAbcLogosHelper from './helpers/abc/logos';
import useAbcDeliveryFeesHelper from './helpers/abc/deliveryFees';
// import useCartImporter from './helpers/eiffage/cartImport';
// import Auth from './modules/punchout/Auth';
// import CartRepatriation from './modules/punchout/CartRepatriation';
import Cartv3ApiActions from './api/actions/common/Cartv3';
import useCartInteractions from './modules/cartv3/CartInteractions';
import useStoreManager from './store/cartv3storeManager';
import useCartValidation from './modules/cartv3/CartValidation';

export default (context: Context) => {
    const middlewareManager = MiddlewareManager.getInstance(context);
    const storeManager = useStoreManager(context);
    return {
        purjusClient: usePurjusClient(context),
        djustClient: useDjustClient(context),
        mailClient: useMailClient(context),
        // useSynchro: useSynchro(context),
        useSupplier: useSupplier(context),
        useAccount: useAccount(context),
        useNavigationCategories: useNavigationCategories(context),
        // useSendMail: useSendMail(context),
        useOrders: useOrders(context),
        useOrder: useOrder(context),
        useProducts: useProducts(context),
        useProductThumbnail: useProductThumbnail(context),
        usePdfGenerator: usePdfGenerator(),
        useCustomerUsers: useCustomerUsers(context),
        middlewareManager,
        // monoprixPurjusClient: useMonoprixPurjusClient(context),
        // useProxyCartv2: useProxyCartv2(context),
        useCartv2: useCartv2(context),
        useStoreSpecificBuyingList: useStoreSpecificBuyingList(context),
        useOffers: useOffers(context),
        // useFranprixCartToOrder: useFranprixCartToOrder(context),
        // useFranprixCartGenerator: useFranprixCartGenerator(context),
        // useEiffageFacetsHelper: useEiffageFacetsHelper(context),
        // useEiffageCaptchaHelper: useEiffageCaptchaHelper(context),
        // useEiffageEcoContributionHelper: useEiffageEcoContributionHelper(),
        useEiffageOrderLinesHelper: useEiffageOrderLinesHelper(context),
        useProductsHelper: useProductsHelper(context),
        useOfferHelper: useOfferHelper(),
        utils: utils(),
        initiatorsInThemeContext: initiatorsInThemeContext(context),
        // useEiffageCartv2: useEiffageCartv2(context),
        // useSocodaMembers: socodaMembers(context),
        // useFoodiaOfferHelper: foodiaOfferHelper(context),
        abc: {
            useAbcLogosHelper: useAbcLogosHelper(context),
            useAbcDeliveryFeesHelper: useAbcDeliveryFeesHelper(context),
        },
        yack: {
            // accountHelper: accountHelper(context),
            // accountUpgradeMail: accountUpgradeMail(context),
            featuresHelper: featuresHelper(),
        },
        common: {
            expirableLocalStorage,
            brevoContactManager: brevoContactManager(context),
            searchv2: {
                productList: productList(context),
                urlManager: urlManager(context),
            },
            cartv3: {
                cartInteractions: useCartInteractions(context),
                cartValidation: useCartValidation(context),
            },
            punchout: {
                // auth: Auth(context),
                // cartRepatriation: CartRepatriation(context),
            },
        },
        api: {
            searchv2ApiClient: searchV2(context),
            cartv3: Cartv3ApiActions(context),
        },
        eiffage: {
            // useCartImporter: useCartImporter(context),
        },
        store: {
            manager: storeManager,
        },
    };
};
