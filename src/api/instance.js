import axios from 'axios'
import constants from '@/constants'

export const instance = axios.create({
    baseURL: constants.apiUrl,
})