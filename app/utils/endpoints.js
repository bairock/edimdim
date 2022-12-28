
const production = process.env.NODE_ENV === 'production' // заменить !== на === перед продакшн билдом 
const port = production ? '' : ':4000'
const dev = 'http://192.168.31.22'
const prod = 'https://edimdim.ru'
export const domain = production ? prod : dev
export const url = `${domain}${port}`
export const imageUrl = `${domain}${port}/uploads/`
export const imageUploadUrl = `${domain}${port}/upload`
