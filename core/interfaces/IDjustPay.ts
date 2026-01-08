export interface Amount {
    currency: string;
    value: number;
}

export interface Address {
    city: string;
    country: string;
    houseNumberOrName: string;
    postalCode: string;
    stateOrProvince: string;
    street: string;
}

export interface ShopperName {
    firstName: string;
    lastName: string;
}

export interface PaymentMethod {
    brand?: string;
    checkoutAttemptId?: string;
    cvc?: string;
    encryptedCard?: string;
    encryptedCardNumber?: string;
    encryptedExpiryMonth?: string;
    encryptedExpiryYear?: string;
    encryptedSecurityCode?: string;
    expiryMonth?: string;
    expiryYear?: string;
    fastlaneData?: string;
    fundingSource?: 'credit' | 'debit';
    holderName?: string;
    networkPaymentReference?: string;
    number?: string;
    shopperNotificationReference?: string;
    storedPaymentMethodId?: string;
    type?: string;
}

export interface PaymentMethodData {
    paymentMethod: PaymentMethod;
    amount?: Amount;
    billingAddress?: Address;
    deliveryAddress?: Address;
    shopperName?: ShopperName;
    shopperEmail?: string;
    shopperReference?: string;
    recurringProcessingModel?: 'CardOnFile' | 'Subscription' | 'UnscheduledCardOnFile';
    storePaymentMethod?: boolean;
    shopperInteraction?: 'Ecommerce' | 'ContAuth' | 'Moto' | 'POS';
    reference?: string;
    returnUrl?: string;
    merchantAccount?: string;
    browserInfo?: {
        acceptHeader: string;
        colorDepth: number;
        javaEnabled: boolean;
        javaScriptEnabled: boolean;
        language: string;
        screenHeight: number;
        screenWidth: number;
        timeZoneOffset: number;
        userAgent: string;
    };
}

export interface InitPaymentBody {
    paymentMethodData: PaymentMethodData;
    reference: string;
    referenceType?: string;
    returnUrl: string;
    countryCode: string;
}

export interface PaymentMethodsRequest {
    reference: string;
    countryCode?: string;
    locale?: string;
    referenceType?: string;
}

export interface PaymentMethodsResponse {
    data: {
        adyenPaymentMethods: string;
        enableCreditCartStorage: boolean;
    };
}

export interface InitiatePaymentResponse {
    data: {
        pspReference: string;
        refusalReason: string;
        resultCode: string;
    };
}

export interface PaymentResponse extends InitiatePaymentResponse {}
