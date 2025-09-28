// This file can be used for JSDoc type definitions if needed.
// Since this is a JS project, interfaces are removed.
// Example JSDoc:
/**
 * @typedef {'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'} OrderStatus
 * @typedef {'pending' | 'paid' | 'failed' | 'refunded'} PaymentStatus
 * @typedef {object} OrderItem
 * @property {string} productId
 * @property {string} productName
 * @property {string} productImage
 * @property {number} price
 * @property {number} quantity
 * @property {string} [size]
 * @property {string} [color]
 * 
 * @typedef {object} Order
 * @property {string} id
 * @property {string} userId
 * @property {OrderItem[]} items
 * @property {number} total
 * @property {OrderStatus} status
 * @property {object} shippingAddress
 * @property {object} billingAddress
 * @property {string} paymentMethod
 * @property {PaymentStatus} paymentStatus
 * @property {string} createdAt
 * @property {string} updatedAt
 */