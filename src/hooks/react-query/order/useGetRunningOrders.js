import { useQuery } from 'react-query'
import { OrderApi } from './orderApi'
import { onSingleErrorResponse } from '@/components/ErrorResponse'

/**
 * Custom hook to fetch running orders
 * @param {number} limit - Number of orders to fetch
 * @param {number} offset - Pagination offset
 * @param {boolean} enabled - Whether to enable the query
 * @returns {Object} Query object with data, isLoading, error, refetch
 */
export const useGetRunningOrders = (limit = 10, offset = 0, enabled = true) => {
    return useQuery(
        ['running-orders', limit, offset],
        () => OrderApi.getRunningOrders(limit, offset),
        {
            enabled,
            staleTime: 1000 * 60 * 2, // 2 minutes
            onError: onSingleErrorResponse,
        }
    )
}
