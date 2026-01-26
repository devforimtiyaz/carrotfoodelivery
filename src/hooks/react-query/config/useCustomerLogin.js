import { useMutation } from 'react-query'
import { AuthApi } from './authApi'
import { toast } from 'react-hot-toast'
import { t } from 'i18next'

/**
 * Custom hook for customer OTP login
 * Sends OTP to the provided phone number
 * @returns {Object} Mutation object with mutate, isLoading, error, data
 */
export const useCustomerLogin = () => {
    return useMutation(
        ({ phone, loginType }) => AuthApi.customerLogin(phone, loginType),
        {
            onSuccess: (response) => {
                if (response?.data) {
                    toast.success(
                        t('OTP sent successfully! Please check your phone.')
                    )
                }
            },
            onError: (error) => {
                const errorMessage =
                    error?.response?.data?.message ||
                    error?.message ||
                    t('Failed to send OTP. Please try again.')
                toast.error(errorMessage)
            },
        }
    )
}
