import { useMutation } from 'react-query'
import { AuthApi } from './authApi'
import { toast } from 'react-hot-toast'
import { t } from 'i18next'
import { useDispatch } from 'react-redux'
import { setUser } from '@/redux/slices/customer'
import { useRouter } from 'next/router'

/**
 * Custom hook for OTP verification
 * Verifies the OTP and logs in the user
 * @returns {Object} Mutation object with mutate, isLoading, error, data
 */
export const useVerifyPhone = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    return useMutation(
        (params) => AuthApi.verifyPhone(params),
        {
            onSuccess: (response) => {
                if (response?.data) {
                    const { token, ...userData } = response.data

                    // Store token in localStorage
                    if (token) {
                        localStorage.setItem('token', token)
                    }

                    // Update Redux state with user data
                    if (userData) {
                        dispatch(setUser(userData))
                    }

                    toast.success(t('Login successful!'))

                    // Redirect to home page
                    setTimeout(() => {
                        router.push('/home')
                    }, 500)
                }
            },
            onError: (error) => {
                const errorMessage =
                    error?.response?.data?.message ||
                    error?.response?.data?.errors?.[0]?.message ||
                    error?.message ||
                    t('Invalid OTP. Please try again.')
                toast.error(errorMessage)
            },
        }
    )
}
