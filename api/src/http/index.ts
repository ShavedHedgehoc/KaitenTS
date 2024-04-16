import axios from 'axios'
import rateLimit from 'axios-rate-limit'
import dotenv from 'dotenv'

dotenv.config()

const headers = {
    Authorization: `Bearer ${process.env.KAITEN_TOKEN}`,
    'Content-type': 'application/json; charset=utf-8',
    // 'Access-Control-Allow-Origin': '*',
}
const $kaitenApi = rateLimit(
    axios.create({
        baseURL: process.env.KAITEN_URL,
        timeout: 3000,
        headers: headers,
    }),
    { maxRequests: 1, perMilliseconds: 1000, maxRPS: 1 }
)

export { $kaitenApi }
