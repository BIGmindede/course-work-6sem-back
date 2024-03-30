const uuid = require("uuid")
const path = require('path')
const fs = require("fs")
const { error } = require("console")
const ApiError = require("../exceptions/apiError")

class FileService {
    saveFile(file) {
        try {
            const fileName = uuid.v4() + '.' + file.mimetype.split('/')[1]
            const filePath = path.resolve('static', fileName)
            file.mv(filePath)
            return fileName
        } catch(e) {
            console.log(e)
        }
    }

    removeFile(fileName) {
        try {
            const filePath = path.resolve('static', fileName)
            fs.unlink(filePath, (err) => {
                if (err) {
                    throw ApiError.fileRemoveError()
                }
                console.log("Файл успешно удален")
            })
        } catch(e) {
            console.log(e)
        }
    }
}

module.exports = new FileService()