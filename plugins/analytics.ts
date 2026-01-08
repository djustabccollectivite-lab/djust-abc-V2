import { Plugin } from '@nuxt/types';

declare module '@nuxt/types' {
  interface Context {
    $analytics: {
      trackEvent: (event: string, data?: any) => void;
      trackPurchase: (order: any) => void;
      trackAddToCart: (product: any, quantity: number) => void;
      trackProductView: (product: any) => void;
    }
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $analytics: {
      trackEvent: (event: string, data?: any) => void;
      trackPurchase: (order: any) => void;
      trackAddToCart: (product: any, quantity: number) => void;
      trackProductView: (product: any) => void;
    }
  }
}

const analyticsPlugin: Plugin = (context, inject) => {
  const track = (event: string, data: any = {}) => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: event,
        ...data
      });
    }
    // Optionnel: Log en dev pour debug
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[Analytics] ${event}:`, data);
    }
  };

  const analytics = {
    trackEvent(event: string, data: any = {}) {
      track(event, data);
    },

    trackProductView(product: any) {
      track('view_item', {
        ecommerce: {
          items: [{
            item_name: product.name,
            item_id: product.sku || product.id,
            price: product.price,
            item_brand: product.brand,
            item_category: product.category,
            quantity: 1
          }]
        }
      });
    },

    trackAddToCart(product: any, quantity: number = 1) {
      track('add_to_cart', {
        ecommerce: {
          items: [{
            item_name: product.name,
            item_id: product.sku || product.id,
            price: product.price,
            item_brand: product.brand,
            item_category: product.category,
            quantity: quantity
          }]
        }
      });
    },

    trackPurchase(order: any) {
      track('purchase', {
        ecommerce: {
          transaction_id: order.id || order.reference,
          value: order.total_amount || order.total,
          tax: order.tax_amount,
          shipping: order.shipping_amount,
          currency: order.currency || 'EUR',
          items: (order.lines || []).map((line: any) => ({
            item_name: line.product_name || line.name,
            item_id: line.product_sku || line.sku,
            price: line.unit_price || line.price,
            quantity: line.quantity
          }))
        }
      });
    }
  };

  inject('analytics', analytics);
};

export default analyticsPlugin;
