import { AdyenCheckout, Card } from '@adyen/adyen-web';
import '@adyen/adyen-web/styles/adyen.css';

export default (_context, inject) => {
    inject('adyenCheckout', (config) => new AdyenCheckout(config));
};
