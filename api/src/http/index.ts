import axios from 'axios'
import rateLimit from 'axios-rate-limit'

const TOKEN = 'Bearer 97d389d2-f85c-4da9-9513-a2ed6d859562'
const baseUrl = 'https://estel.kaiten.ru/api/latest/'

const headers = {
    Authorization: TOKEN,
    'Content-type': 'application/json; charset=utf-8',
    // 'Access-Control-Allow-Origin': '*',
}
const $kaitenApi = rateLimit(
    axios.create({
        baseURL: baseUrl,
        timeout: 1000,
        headers: headers,
    }),
    { maxRequests: 1, perMilliseconds: 1000, maxRPS: 2 }
)
// const $kaitenApi = axios.create({
//     baseURL: baseUrl,
//     timeout: 1000,
//     headers: headers,
// })

export { $kaitenApi }
