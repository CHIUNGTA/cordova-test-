import request from '@/utils/request'

export default {
    /**
     * 取得物件資訊
     * @returns 
     */
    GetObjects: () => {
        console.log('呼叫中...')
        return request({
            url: 'GetObjects',
            method: 'get'
        })
    }
}