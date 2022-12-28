const { processUpload, deleteFile } = require("../../utils/upload")

const Upload = {
    Mutation: {
        uploadFile: async (_parent, { file }, { prisma }) => {
            const { name } = await processUpload(file)
            return name
        },
        deleteFile: async (_parent, { fileName }, { prisma }) => {
            await deleteFile(fileName)
            return fileName
        },
    },
}

module.exports = {
    Upload,
}
