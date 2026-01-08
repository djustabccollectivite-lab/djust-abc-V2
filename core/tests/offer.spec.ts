import { SupplierData } from './data/supplier';
import offerGetters from '../getters/offer';
import {
    offerPriceDefault,
    offerInventoryDefault,
    bestOffer,
    foOfferInventoryWithPrices,
} from '@/core/tests/data/offer';

describe('Offer Getters', () => {
    const offerPricePublicItem = {
        ...offerPriceDefault,
        offerPriceType: 'PUBLIC',
        priceRanges: [
            {
                quantity: 1,
                price: {
                    itemPrice: 100,
                    itemPriceTTC: 120,
                    unitPrice: 100,
                    unitPriceTTC: 120,
                },
                discountPrice: {
                    itemPrice: 0,
                    itemPriceTTC: 0,
                    unitPrice: 0,
                    unitPriceTTC: 0,
                },
            },
        ],
        itemPerPack: 1,
    };

    const OfferInventoryWithPrices = {
        ...foOfferInventoryWithPrices,
        offerPrices: [offerPriceDefault],
    };

    const offerPricePublicItemWithPriceRanges = {
        ...offerPriceDefault,
        offerPriceType: 'PUBLIC',
        priceRanges: [
            {
                quantity: 1,
                price: {
                    itemPrice: 80,
                    unitPrice: 80,
                },
                discountPrice: {
                    itemPrice: 0,
                    unitPrice: 0,
                },
            },
            {
                quantity: 50,
                price: {
                    itemPrice: 78,
                    unitPrice: 78,
                },
                discountPrice: {
                    itemPrice: 0,
                    unitPrice: 0,
                },
            },
        ],
        itemPerPack: 1,
    };

    const offerPricePublicPack = {
        ...offerPriceDefault,
        offerPriceType: 'PUBLIC',
        priceRanges: [
            {
                quantity: 10,
                price: {
                    itemPrice: 70,
                    itemPriceTTC: 120,
                    unitPrice: 70,
                    unitPriceTTC: 120,
                },
                discountPrice: {
                    itemPrice: 0,
                    itemPriceTTC: 0,
                    unitPrice: 0,
                    unitPriceTTC: 0,
                },
            },
        ],
        itemPerPack: 10,
    };

    const offerPriceGroup = {
        ...offerPriceDefault,
        offerPriceType: 'GROUP',
    };

    const offerPriceAccount = {
        ...offerPriceDefault,
        offerPriceType: 'ACCOUNT',
    };

    const offerPricePublicWithOnePackPrice = {
        ...offerPriceDefault,
        priceRanges: [
            {
                quantity: 10,
                price: {
                    itemPrice: 80,
                    itemPriceTTC: 120,
                    unitPrice: 80,
                    unitPriceTTC: 120,
                },
                discountPrice: {
                    itemPrice: 0,
                    itemPriceTTC: 0,
                    unitPrice: 0,
                    unitPriceTTC: 0,
                },
            },
        ],
        offerPriceType: 'PUBLIC',
        itemPerPack: 10,
    };

    const offer2 = { ...offerInventoryDefault, offerPrices: [offerPriceDefault] };
    const offer3 = { ...offerInventoryDefault, offerPrices: [offerPricePublicWithOnePackPrice] };
    const offersToDisplay = [offer2, offer3];

    test('Offer ID', () => {
        expect(offerGetters.getOfferId(offerPriceDefault)).toBe('1');
    });
    test('Display the number of offersInventory', () => {
        expect(offerGetters.getNumberOffers(offersToDisplay)).toBe(2);
    });
    test('Display the number of offersInventory', () => {
        expect(offerGetters.getNumberOffers(null)).toBe(0);
    });
    test('Get Offer Inventory Currency', () => {
        expect(offerGetters.getOfferCurrency(bestOffer)).toBe('USD');
    });
    /*     test('Get Offer Inventory Stock', () => { 
      expect(offerGetters.getOfferStock(offer2)).toBe(1000)
    }) */
    test('Get Offer Inventory Supplier Name', () => {
        expect(offerGetters.getOfferSupplierName(bestOffer)).toBe('Arnoshop');
    });
    test('Get Offer Inventory Supplier Id', () => {
        expect(offerGetters.getOfferSupplierId(bestOffer)).toBe('5');
    });
    test('Get Offer Inventory Product Variant Id', () => {
        expect(offerGetters.getOfferProductVariantId(bestOffer)).toBe('0');
    });
    test('Get Number of Price Range from Offer Price', () => {
        expect(offerGetters.getOfferPriceNbPriceRanges(offerPricePublicItem)).toBe(1);
    });
    test('Get First price from Offer Price', () => {
        const offerPrice3 = {
            ...offerPriceDefault,
            priceRanges: [
                {
                    quantity: 1,
                    price: {
                        itemPrice: 80,
                        itemPriceTTC: 85,
                        unitPrice: 80,
                        unitPriceTTC: 85,
                    },
                    discountPrice: {
                        itemPrice: 0,
                        itemPriceTTC: 0,
                        unitPrice: 0,
                        unitPriceTTC: 0,
                    },
                },
            ],
        };
        expect(offerGetters.getFirstPriceFromOfferPrice(offerPrice3, 'EUR', false)).toBe(80);
        // expect(offerGetters.getFirstPriceFromOfferPrice(offerPrice3, 'EUR', true)).toBe(
        //     '<span class="currency-fraction">80<span class="currency-fraction">,</span><span class="currency-fraction">00</span> €</span>'
        // );
    });

    test('Get Price Range from Offer Price ', () => {
        expect(offerGetters.getOfferPricePriceRanges(offerPricePublicItem)).toStrictEqual([
            {
                quantity: 1,
                price: {
                    itemPrice: 100,
                    itemPriceTTC: 120,
                    unitPrice: 100,
                    unitPriceTTC: 120,
                },
                discountPrice: {
                    itemPrice: 0,
                    itemPriceTTC: 0,
                    unitPrice: 0,
                    unitPriceTTC: 0,
                },
            },
        ]);
    });

    //When we have an inventory with Offer Price PUBLIC, GROUP and ACCOUNT, we display only ACCOUNT Offer Price
    test('Get Offers List from Offer Inventory', () => {
        expect(
            offerGetters.getOfferPrices({
                ...foOfferInventoryWithPrices,
                offerPrices: [offerPricePublicItem, offerPriceGroup, offerPriceAccount],
            })
        ).toStrictEqual([offerPriceAccount]);
    });

    //When we have an inventory with Offer Price PUBLIC and GROUP, we display only GROUP Offer Price
    test('Get Offers List from Offer Inventory', () => {
        expect(
            offerGetters.getOfferPrices({
                ...foOfferInventoryWithPrices,
                offerPrices: [offerPricePublicItem, offerPriceGroup],
            })
        ).toStrictEqual([offerPriceGroup]);
    });

    //When we have an inventory with Offer Price PUBLIC and ACCOUNT, we display only ACCOUNT Offer Price
    test('Get Offers List from Offer Inventory', () => {
        expect(
            offerGetters.getOfferPrices({
                ...foOfferInventoryWithPrices,
                offerPrices: [offerPricePublicItem, offerPriceAccount],
            })
        ).toStrictEqual([offerPriceAccount]);
    });

    //When we have an inventory with Offer Price GROUP and ACCOUNT, we display only ACCOUNT Offer Price
    test('Get Offers List from Offer Inventory', () => {
        expect(
            offerGetters.getOfferPrices({
                ...foOfferInventoryWithPrices,
                offerPrices: [offerPriceGroup, offerPriceAccount],
            })
        ).toStrictEqual([offerPriceAccount]);
    });

    //When we have an inventory with Offer Price PUBLIC, we display only PUBLIC Offer Price
    test('Get Offers List from Offer Inventory', () => {
        expect(
            offerGetters.getOfferPrices({ ...foOfferInventoryWithPrices, offerPrices: [offerPricePublicItem] })
        ).toStrictEqual([offerPricePublicItem]);
    });

    //When we have an inventory with Offer Price ACCOUNT, we display only ACCONT Offer Price
    test('Get Offers List from Offer Inventory', () => {
        expect(
            offerGetters.getOfferPrices({ ...foOfferInventoryWithPrices, offerPrices: [offerPriceAccount] })
        ).toStrictEqual([offerPriceAccount]);
    });

    //When we have an inventory with Offer Price GROUP, we display only GROUP Offer Price
    test('Get Offers List from Offer Inventory', () => {
        expect(
            offerGetters.getOfferPrices({ ...foOfferInventoryWithPrices, offerPrices: [offerPriceGroup] })
        ).toStrictEqual([offerPriceGroup]);
    });

    //When we have an inventory with no Offer Price, we display nothing
    test('Get Offers List from Offer Inventory', () => {
        expect(offerGetters.getOfferPrices({ ...foOfferInventoryWithPrices, offerPrices: [] })).toStrictEqual([]);
    });

    //Get the first Price of an Inventory. We take to first price of the first Offer Price
    test('Get the best Price of an Inventory', () => {
        const offerPrice80 = {
            ...offerPriceDefault,
            priceRanges: [
                {
                    quantity: 1,
                    price: {
                        itemPrice: 80,
                        itemPriceTTC: 120,
                        unitPrice: 80,
                        unitPriceTTC: 120,
                    },
                    discountPrice: {
                        itemPrice: 0,
                        itemPriceTTC: 0,
                        unitPrice: 0,
                        unitPriceTTC: 0,
                    },
                },
            ],
        };
        const offerPrice100 = {
            ...offerPriceDefault,
            priceRanges: [
                {
                    quantity: 1,
                    price: {
                        itemPrice: 100,
                        itemPriceTTC: 120,
                        unitPrice: 100,
                        unitPriceTTC: 120,
                    },
                    discountPrice: {
                        itemPrice: 0,
                        itemPriceTTC: 0,
                        unitPrice: 0,
                        unitPriceTTC: 0,
                    },
                },
            ],
        };
        const offerPrice20 = {
            ...offerPriceDefault,
            priceRanges: [
                {
                    quantity: 1,
                    price: {
                        itemPrice: 20,
                        itemPriceTTC: 120,
                        unitPrice: 20,
                        unitPriceTTC: 120,
                    },
                    discountPrice: {
                        itemPrice: 0,
                        itemPriceTTC: 0,
                        unitPrice: 0,
                        unitPriceTTC: 0,
                    },
                },
            ],
        };
        const offerPriceNewGroup = {
            ...offerPriceDefault,
            offerPriceType: 'NEW',
        };
        expect(
            offerGetters.getBestOfferPriceFromOfferInventory({
                ...foOfferInventoryWithPrices,
                offerPrices: [offerPrice20, offerPrice100, offerPrice80],
            })
        ).toBe(offerPrice20);
        expect(
            offerGetters.getBestOfferPriceFromOfferInventory({
                ...foOfferInventoryWithPrices,
                offerPrices: [offerPrice100, offerPrice20, offerPrice100],
            })
        ).toBe(offerPrice20);
        expect(
            offerGetters.getBestOfferPriceFromOfferInventory({
                ...foOfferInventoryWithPrices,
                offerPrices: [offerPrice100, offerPrice20],
            })
        ).toBe(offerPrice20);
        expect(
            offerGetters.getBestOfferPriceFromOfferInventory({
                ...foOfferInventoryWithPrices,
                offerPrices: [offerPrice100],
            })
        ).toBe(offerPrice100);
        expect(
            offerGetters.getBestOfferPriceFromOfferInventory({ ...foOfferInventoryWithPrices, offerPrices: [] })
        ).toBe(null);
        expect(
            offerGetters.getBestOfferPriceFromOfferInventory({
                ...foOfferInventoryWithPrices,
                offerPrices: [offerPriceNewGroup],
            })
        ).toBe(null);
    });

    test('Get Best Offer Inventory from List of Offer Inventory', () => {
        const offerPrice20 = {
            ...offerPriceDefault,
            priceRanges: [
                {
                    quantity: 1,
                    price: {
                        itemPrice: 20,
                        itemPriceTTC: 120,
                        unitPrice: 20,
                        unitPriceTTC: 120,
                    },
                    discountPrice: {
                        itemPrice: 0,
                        itemPriceTTC: 0,
                        unitPrice: 0,
                        unitPriceTTC: 0,
                    },
                },
            ],
        };
        const offerPrice40 = {
            ...offerPriceDefault,
            priceRanges: [
                {
                    quantity: 1,
                    price: {
                        itemPrice: 40,
                        itemPriceTTC: 120,
                        unitPrice: 40,
                        unitPriceTTC: 120,
                    },
                    discountPrice: {
                        itemPrice: 0,
                        itemPriceTTC: 0,
                        unitPrice: 0,
                        unitPriceTTC: 0,
                    },
                },
            ],
        };
        const offerPrice100 = {
            ...offerPriceDefault,
            priceRanges: [
                {
                    quantity: 1,
                    price: {
                        itemPrice: 100,
                        itemPriceTTC: 120,
                        unitPrice: 100,
                        unitPriceTTC: 120,
                    },
                    discountPrice: {
                        itemPrice: 0,
                        itemPriceTTC: 0,
                        unitPrice: 0,
                        unitPriceTTC: 0,
                    },
                },
            ],
        };
        const offerPrice10 = {
            ...offerPriceDefault,
            priceRanges: [
                {
                    quantity: 1,
                    price: {
                        itemPrice: 10,
                        itemPriceTTC: 120,
                        unitPrice: 10,
                        unitPriceTTC: 120,
                    },
                    discountPrice: {
                        itemPrice: 0,
                        itemPriceTTC: 0,
                        unitPrice: 0,
                        unitPriceTTC: 0,
                    },
                },
            ],
        };
        expect(
            offerGetters.getBestOfferFromList([
                { ...foOfferInventoryWithPrices, offerPrices: [offerPrice20, offerPrice40] },
                { ...foOfferInventoryWithPrices, offerPrices: [offerPrice100, offerPrice10] },
            ])
        ).toStrictEqual({ ...foOfferInventoryWithPrices, offerPrices: [offerPrice100, offerPrice10] });
        expect(
            offerGetters.getBestOfferFromList([
                { ...foOfferInventoryWithPrices, offerPrices: [] },
                { ...foOfferInventoryWithPrices, offerPrices: [offerPrice100] },
            ])
        ).toStrictEqual({ ...foOfferInventoryWithPrices, offerPrices: [offerPrice100] });
        expect(offerGetters.getBestOfferFromList([])).toStrictEqual(null);
    });
    test('Get best Offer from supplier in a list of OfferInventory', () => {
        const supplier1 = {
            ...SupplierData,
            name: 'supplier1',
        };
        const supplier2 = {
            ...SupplierData,
            name: 'supplier2',
        };
        const offerPrice20 = {
            ...offerPriceDefault,
            priceRanges: [
                {
                    quantity: 1,
                    price: {
                        itemPrice: 20,
                        itemPriceTTC: 120,
                        unitPrice: 20,
                        unitPriceTTC: 120,
                    },
                    discountPrice: {
                        itemPrice: 0,
                        itemPriceTTC: 0,
                        unitPrice: 0,
                        unitPriceTTC: 0,
                    },
                },
            ],
        };
        const offerPrice40 = {
            ...offerPriceDefault,
            priceRanges: [
                {
                    quantity: 1,
                    price: {
                        itemPrice: 40,
                        itemPriceTTC: 120,
                        unitPrice: 40,
                        unitPriceTTC: 120,
                    },
                    discountPrice: {
                        itemPrice: 0,
                        itemPriceTTC: 0,
                        unitPrice: 0,
                        unitPriceTTC: 0,
                    },
                },
            ],
        };
        const offerPrice100 = {
            ...offerPriceDefault,
            priceRanges: [
                {
                    quantity: 1,
                    price: {
                        itemPrice: 100,
                        itemPriceTTC: 120,
                        unitPrice: 100,
                        unitPriceTTC: 120,
                    },
                    discountPrice: {
                        itemPrice: 0,
                        itemPriceTTC: 0,
                        unitPrice: 0,
                        unitPriceTTC: 0,
                    },
                },
            ],
        };
        const offerPrice10 = {
            ...offerPriceDefault,
            priceRanges: [
                {
                    quantity: 1,
                    price: {
                        itemPrice: 10,
                        itemPriceTTC: 120,
                        unitPrice: 10,
                        unitPriceTTC: 120,
                    },
                    discountPrice: {
                        itemPrice: 0,
                        itemPriceTTC: 0,
                        unitPrice: 0,
                        unitPriceTTC: 0,
                    },
                },
            ],
        };
        expect(
            offerGetters.getBestOfferFromSupplier(
                [
                    { ...foOfferInventoryWithPrices, supplier: supplier1, offerPrices: [offerPrice40] },
                    { ...foOfferInventoryWithPrices, supplier: supplier1, offerPrices: [offerPrice100, offerPrice20] },
                    { ...foOfferInventoryWithPrices, supplier: supplier2, offerPrices: [offerPrice20, offerPrice10] },
                    { ...foOfferInventoryWithPrices, supplier: supplier1, offerPrices: [offerPrice100, offerPrice40] },
                ],
                'supplier1'
            )
        ).toStrictEqual({
            ...foOfferInventoryWithPrices,
            supplier: supplier1,
            offerPrices: [offerPrice100, offerPrice20],
        });
        expect(
            offerGetters.getBestOfferFromSupplier(
                [
                    { ...foOfferInventoryWithPrices, supplier: supplier1, offerPrices: [offerPrice40] },
                    { ...foOfferInventoryWithPrices, supplier: supplier1, offerPrices: [offerPrice100, offerPrice20] },
                    { ...foOfferInventoryWithPrices, supplier: supplier2, offerPrices: [offerPrice20, offerPrice10] },
                    { ...foOfferInventoryWithPrices, supplier: supplier1, offerPrices: [offerPrice100, offerPrice40] },
                ],
                'supplier3'
            )
        ).toStrictEqual(null);
    });

    test('Get Array of Supplier Name in a list of OfferInventory', () => {
        const supplier1 = {
            ...SupplierData,
            name: 'supplier1',
        };
        const supplier2 = {
            ...SupplierData,
            name: 'supplier2',
        };
        expect(
            offerGetters.getOffersSupplierList([
                { ...bestOffer, supplier: supplier1 },
                { ...bestOffer, supplier: supplier1 },
                { ...bestOffer, supplier: supplier2 },
                { ...bestOffer, supplier: supplier1 },
            ])
        ).toStrictEqual(['supplier1', 'supplier1', 'supplier2', 'supplier1']);
    });

    // test('Get formated Price', () => {
    //     expect(offerGetters.getFormatedPrice(122.99, 'EUR')).toBe(
    //         '<span class="currency-fraction">122<span class="currency-fraction">,</span><span class="currency-fraction">99</span> €</span>'
    //     );
    // });
});
