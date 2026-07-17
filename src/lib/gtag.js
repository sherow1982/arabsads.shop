// Google Analytics Enhanced Ecommerce Events

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-HGWFC0NSMR';

// View Item Event
export const viewItem = (product) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      currency: 'KWD',
      value: product.salePrice,
      items: [{
        item_id: product.id.toString(),
        item_name: product.title,
        item_brand: 'إعلانات العرب الكويت',
        item_category: product.category,
        price: product.salePrice,
        quantity: 1
      }]
    });
  }
};

// Add to Cart Event
export const addToCart = (product, quantity = 1) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'add_to_cart', {
      currency: 'KWD',
      value: product.salePrice * quantity,
      items: [{
        item_id: product.id.toString(),
        item_name: product.title,
        item_brand: 'إعلانات العرب الكويت',
        item_category: product.category,
        price: product.salePrice,
        quantity: quantity
      }]
    });
  }
};

// Purchase Event
export const purchase = (orderId, items, total) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: orderId,
      value: total,
      currency: 'KWD',
      shipping: 0,
      items: items.map(item => ({
        item_id: item.id.toString(),
        item_name: item.title,
        item_brand: 'إعلانات العرب الكويت',
        item_category: item.category,
        price: item.salePrice,
        quantity: item.quantity
      }))
    });
  }
};

// Begin Checkout Event
export const beginCheckout = (items, total) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'begin_checkout', {
      currency: 'KWD',
      value: total,
      items: items.map(item => ({
        item_id: item.id.toString(),
        item_name: item.title,
        item_brand: 'إعلانات العرب الكويت',
        item_category: item.category,
        price: item.salePrice,
        quantity: item.quantity
      }))
    });
  }
};

// Remove from Cart Event
export const removeFromCart = (product, quantity = 1) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'remove_from_cart', {
      currency: 'KWD',
      value: product.salePrice * quantity,
      items: [{
        item_id: product.id.toString(),
        item_name: product.title,
        item_brand: 'إعلانات العرب الكويت',
        item_category: product.category,
        price: product.salePrice,
        quantity: quantity
      }]
    });
  }
};

