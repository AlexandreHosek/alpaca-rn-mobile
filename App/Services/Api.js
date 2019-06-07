import apisauce from 'apisauce'

import config from '../config'

const create = (baseURL = config.BASE_URL) => {

    const api = apisauce.create({
        baseURL,
        headers: {
			'APCA-API-KEY-ID': config.APCA_API_KEY_ID,
			'APCA-API-SECRET-KEY': config.APCA_API_SECRET_KEY,
		},
        timeout: 25000
    })

    const dataApi = apisauce.create({
        baseURL: config.DATA_BASE_URL,
        headers: {
			'APCA-API-KEY-ID': config.APCA_API_KEY_ID,
			'APCA-API-SECRET-KEY': config.APCA_API_SECRET_KEY,
		},
        timeout: 50000
    })

    const setBaseURL = url => api.setBaseURL(url)
    const setHeaders = (apiKey, secretKey) => {
        api.setHeaders({
            'APCA-API-KEY-ID': apiKey,
            'APCA-API-SECRET-KEY': secretKey,
        })
        dataApi.setHeaders({
            'APCA-API-KEY-ID': apiKey,
            'APCA-API-SECRET-KEY': secretKey,
        })
    }
    const getAccount = () => api.get('v2/account')
    const configureAccount = data => api.patch('v2/account/configurations', data)
    const getOrders = (status, params) => api.get(`v2/orders?status=${status}&direction=desc&${params}`)
    const cancelOrder = order_id => api.delete(`v2/orders/${order_id}`)
    const postOrder = data => api.post('v2/orders', data)
    const getPositions = () => api.get('v2/positions')
    const getAssets = () => api.get('v2/assets?status=active')
    const getBars = (timeframe, symbols, start, end) => dataApi.get(`v1/bars/${timeframe}?symbols=${symbols}&limit=2`)

    return {
        setBaseURL,
        setHeaders,
        getAccount,
        configureAccount,
        getOrders,
        getPositions,
        cancelOrder,
        postOrder,
        getAssets,
        getBars
    }
}

export default {
    create
}