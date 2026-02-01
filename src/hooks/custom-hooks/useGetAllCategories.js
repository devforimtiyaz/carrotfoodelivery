import { useQuery } from 'react-query'
import { CategoryApi } from '../react-query/config/categoryApi'
import { onErrorResponse } from '@/components/ErrorResponse'
import { useEffect } from 'react'

export const useGetAllCategories = (searchKey, restaurantId) => {
    const { data, refetch } = useQuery(
        ['category', restaurantId],
        () => CategoryApi.categories(searchKey, restaurantId),
        {
            onError: onErrorResponse,
            enabled: false, // Only fetch when we have a restaurant ID
        }
    )
    const handleApiCall = async () => await refetch()
    useEffect(() => {
        if (restaurantId) {
            handleApiCall()
        }
    }, [restaurantId])
    return data?.data
}
