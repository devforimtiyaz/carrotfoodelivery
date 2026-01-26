import MainApi from '../../../api/MainApi'

/**
 * Order API endpoints
 * Handles order-related operations
 */
export const OrderApi = {
    /**
     * Get running/active orders for customer
     * @param {number} limit - Number of orders to fetch (default: 10)
     * @param {number} offset - Pagination offset (default: 0)
     * @returns {Promise} API response with running orders
     */
    getRunningOrders: (limit = 10, offset = 0) =>
        MainApi.get(
            `/api/v1/customer/order/running-orders?limit=${limit}&offset=${offset}`
        ),

    /**
     * Generate QR code for order delivery
     * @param {string} token - Auth token
     * @param {number} orderId - Order ID
     * @returns {Promise} API response with QR code
     */
    generateQRCode: (token, orderId) => {
        const formData = new FormData()
        formData.append('token', token)
        formData.append('order_id', orderId)
        return MainApi.post('/api/v1/delivery-man/qr-code', formData)
    },
}
