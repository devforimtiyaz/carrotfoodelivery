import { useQuery } from 'react-query'
import { ConfigApi } from '../bannerApi'
import { onSingleErrorResponse } from '@/components/ErrorResponse'

/**
 * Custom hook to get zone ID by coordinates (lat/lng)
 * Different from useGetZone which fetches zone list
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @param {boolean} enabled - Whether to enable the query
 * @returns {Object} Query object with data, isLoading, error, refetch
 */
export const useGetZoneByCoordinates = (lat, lng, enabled = true) => {
    return useQuery(
        ['zone-by-coordinates', lat, lng],
        () => ConfigApi.getZoneByCoordinates(lat, lng),
        {
            enabled: enabled && !!lat && !!lng,
            staleTime: 1000 * 60 * 10, // 10 minutes
            onSuccess: (response) => {
                if (response?.data?.zone_id) {
                    localStorage.setItem('zoneid', response.data.zone_id)
                }
            },
            onError: onSingleErrorResponse,
        }
    )
}
