import axios from '../utils/server'

export const getHome = () => new Promise(async(resolve,reject) => {
    try {
        const response = await axios({
            url: '/alo123',
            method: 'get'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})