const isProduction = process.env.NODE_ENV === 'production'

const ip = isProduction ? 'localhost' : 'localhost'
const protocol = isProduction ? 'http' : 'http'
const port = 3000

export const STORAGE_KEY = 'Client'

export const config = {
    apiUrl: `${protocol}://${ip}:${port}/api/v1`,
    geoNameApiUrl: 'https://public.opendatasoft.com/api/records/1.0/search/'
}
