import MainApi from '../../../api/MainApi'
export const AuthApi = {
    signUp: (formData) => {
        return MainApi.post('/api/v1/auth/sign-up', formData)
    },
    signIn: (formData) => {
        return MainApi.post('/api/v1/auth/login', formData)
    },
    /**
     * Customer login with OTP
     * @param {string} phone - Phone number
     * @param {string} loginType - Login type (default: 'otp')
     * @returns {Promise} API response
     */
    customerLogin: (phone, loginType = 'otp') => {
        const formData = new FormData()
        formData.append('phone', phone)
        formData.append('login_type', loginType)
        return MainApi.post('/api/v1/auth/login', formData)
    },

    /**
     * Verify phone number with OTP
     * @param {Object} params - Verification parameters
     * @param {string} params.phone - Phone number
     * @param {string} params.otp - OTP code
     * @param {string} params.verificationType - Verification type (default: 'phone')
     * @param {string} params.loginType - Login type (default: 'otp')
     * @returns {Promise} API response with user data and token
     */
    verifyPhone: ({ phone, otp, verificationType = 'phone', loginType = 'otp' }) => {
        return MainApi.post('/api/v1/auth/verify-phone', null, {
            params: {
                verification_type: verificationType,
                otp,
                login_type: loginType,
                phone,
            },
        })
    },

    /**
     * Delivery man login with phone and password
     * @param {string} phone - Phone number
     * @param {string} password - Password
     * @returns {Promise} API response
     */
    deliveryManLogin: (phone, password) => {
        const formData = new FormData()
        formData.append('phone', phone)
        formData.append('password', password)
        return MainApi.post('/api/v1/auth/delivery-man/login', formData)
    },

    /**
     * Vendor login with email and password
     * @param {string} email - Email address
     * @param {string} password - Password
     * @returns {Promise} API response
     */
    vendorLogin: (email, password) => {
        const formData = new FormData()
        formData.append('email', email)
        formData.append('password', password)
        return MainApi.post('/api/v1/auth/vendor/login', formData)
    },
}

