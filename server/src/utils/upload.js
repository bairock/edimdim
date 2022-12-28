const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const { nanoid } = require('nanoid')
const uploadsDir = `${__dirname}/../../../uploads`

const storeUpload = async ({ stream, filename, prefix }) => {
    const randomName = nanoid()
    const extension = filename.split('.').pop()
    const fileName = `${prefix ? prefix : randomName}.${extension}`
    const path = `${uploadsDir}/${fileName}`

    return new Promise((resolve, reject) =>
        stream
            .pipe(fs.createWriteStream(path))
            .on('finish', () => resolve({ name: fileName, type: extension }))
            .on('error', reject)
    )
}

const fileIsBig = (fileName) => {
    const _path = `${uploadsDir}/${fileName}`
    const stats = fs.statSync(_path)
    const fileSizeInBytes = stats['size']
    const fileSizeInKb = Math.floor(fileSizeInBytes / 1024)
    if (fileSizeInKb < 100) {
        return false
    } else {
        return true
    }
}

const compressImage = (fileName) =>
    new Promise((resolve, reject) => {
        if (fileIsBig(fileName)) {
            const extension = path.extname(fileName)
            const _path = `${uploadsDir}/${fileName}`
            if (
                extension === '.jpg' ||
                extension === '.jpeg' ||
                extension === '.JPG' ||
                extension === '.JPEG'
            ) {
                sharp(_path)
                    .rotate()
                    .resize({ width: 450 })
                    .jpeg({ quality: 60 })
                    .toFile(`${uploadsDir}/sharp-${fileName}`)
                    .then(() => {
                        deleteFile(fileName)
                        resolve(`sharp-${fileName}`)
                    })
                    .catch((err) => {
                        reject(err)
                    })
            } else if (extension === '.png' || extension === '.PNG') {
                sharp(_path)
                    .rotate()
                    .resize({ width: 450 })
                    .png({ compressionLevel: 8 })
                    .toFile(`${uploadsDir}/sharp-${fileName}`)
                    .then(() => {
                        deleteFile(fileName)
                        resolve(`sharp-${fileName}`)
                    })
                    .catch((err) => {
                        reject(err)
                    })
            } else {
                resolve(fileName)
            }
        } else {
            resolve(fileName)
        }
    })

const processUpload = async (upload, prefix) => {
    try {
        const { createReadStream, filename } = await upload.file
        const stream = createReadStream()
        const { name, type } = await storeUpload({ stream, filename, prefix })
        const compress = await compressImage(name)
        return {
            name: compress,
            type
        }
    } catch (err) {
        throw new Error(err)
    }
}

const deleteFile = fileName => {
    const _path = `${uploadsDir}/${fileName}`
    fs.unlink(_path, () => { })
}

module.exports = {
    processUpload,
    deleteFile
}
