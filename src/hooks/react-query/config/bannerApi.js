import MainApi from '../../../api/MainApi'

export const BannerApi = {
    bannerList: () => MainApi.get('/api/v1/banners'),
}

export const ConfigApi = {
    /**
     * Get app configuration
     * @returns {Promise} API response with app config
     */
    getConfig: () => MainApi.get('/api/v1/config'),

    /**
     * Get zone ID by coordinates
     * @param {number} lat - Latitude
     * @param {number} lng - Longitude
     * @returns {Promise} API response with zone ID
     */
    getZoneByCoordinates: (lat, lng) =>
        MainApi.get(`/api/v1/config/get-zone-id?lat=${lat}&lng=${lng}`),
}

