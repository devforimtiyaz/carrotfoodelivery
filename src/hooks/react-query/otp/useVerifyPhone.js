import MainApi from '../../../api/MainApi'
import { useMutation } from 'react-query'

const sendOtp = async (otpData) => {
    const params = {}
    const requiredFields = ['phone', 'otp', 'login_type', 'verification_type', 'guest_id']
    requiredFields.forEach(field => {
        if (otpData[field]) {
            params[field] = otpData[field]
        }
    })
    const { data } = await MainApi.post('/api/v1/auth/verify-phone', null, { params })
    return data
}

export const useVerifyPhone = () => {
    return useMutation('verify_phone_otp', sendOtp)
}
