const isProduction = process.env.NODE_ENV === 'production'

const ip = isProduction ? 'localhost' : 'localhost'
const protocol = isProduction ? 'http' : 'http'
const port = 3000

export const STORAGE_KEY = 'Client'

export const config = {
    apiUrl: `${protocol}://${ip}:${port}`
}
