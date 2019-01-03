import apisauce from 'apisauce'

import config from '../config'

const create = (baseURL = config.BASE_URL) => {

    const api = apisauce.create({
        baseURL,
        headers: {
			'APCA-API-KEY-ID': config.APCA_API_KEY_ID,
			'APCA-API-SECRET-KEY': config.APCA_API_SECRET_KEY,
		},
        timeout: 15000
    })

    const dataApi = apisauce.create({
        baseURL: config.DATA_BASE_URL,
        headers: {
			'APCA-API-KEY-ID': config.APCA_API_KEY_ID,
			'APCA-API-SECRET-KEY': config.APCA_API_SECRET_KEY,
		},
        timeout: 15000
    })

    const getAccount = () => api.get('v1/account')
    const getOrders = () => api.get('v1/orders?status=all')
    const cancelOrder = order_id => api.delete(`v1/orders/${order_id}`)
    const postOrder = data => api.post('v1/orders', data)
    const getPositions = () => api.get('v1/positions')
    const getAssets = () => api.get('v1/assets?status=active')
    const getBars = (timeframe, symbols) => dataApi.get(`v1/bars/${timeframe}?symbols=${symbols}`)

    return {
        getAccount,
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